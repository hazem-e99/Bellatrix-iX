import { useState, useCallback, useEffect } from "react";
import {
  buildFullUrl,
  updatePreviewForInput,
  validateFileType,
} from "../utils/mediaUtils";

/**
 * Custom hook for managing media input functionality
 * Automatically attaches MediaPicker behavior to inputs with media-input class or data-media attribute
 *
 * @param {Object} options - Configuration options
 * @param {string} options.accept - Accepted media types ("all", "image", "video")
 * @param {number} options.maxSelection - Maximum number of items to select (default: 1)
 * @param {Function} options.onSelect - Callback when media is selected
 * @param {Function} options.onError - Callback for errors
 * @returns {Object} Hook state and methods
 */
export const useMediaInput = (options = {}) => {
  const { accept = "all", maxSelection = 1, onSelect, onError } = options;

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState(null);
  const [currentOptions, setCurrentOptions] = useState({});

  // Open media picker for specific input
  const openMediaPicker = useCallback(
    (input, pickerOptions = {}) => {
      setCurrentInput(input);
      setCurrentOptions({
        accept: pickerOptions.accept || accept,
        maxSelection: pickerOptions.maxSelection || maxSelection,
        title: pickerOptions.title || "Choose Media",
      });
      setIsMediaPickerOpen(true);
    },
    [accept, maxSelection]
  );

  // Close media picker
  const closeMediaPicker = useCallback(() => {
    setIsMediaPickerOpen(false);
    setCurrentInput(null);
    setCurrentOptions({});
  }, []);

  // Handle media selection
  const handleMediaSelect = useCallback(
    (urlOrUrls, mediaItemOrItems) => {
      if (!currentInput) return;

      try {
        if (maxSelection === 1) {
          // Single selection
          const fullUrl = urlOrUrls;
          const mediaItem = mediaItemOrItems;

          // Set input value
          currentInput.value = fullUrl;

          // Store raw file URL and media ID
          currentInput.dataset.fileUrl = mediaItem.fileUrl;
          currentInput.dataset.mediaId = mediaItem.id;

          // Update preview
          updatePreviewForInput(
            currentInput,
            fullUrl,
            mediaItem.contentType,
            mediaItem
          );

          // Fire input change event
          const event = new Event("change", { bubbles: true });
          currentInput.dispatchEvent(event);

          // Call custom callback
          if (onSelect) {
            onSelect(fullUrl, mediaItem, currentInput);
          }
        } else {
          // Multiple selection
          const urls = urlOrUrls.map((item) => item.url);
          const items = urlOrUrls.map((item) => item.item);

          // For multiple selection, you might want to handle differently
          // This example sets the first URL as input value
          if (urls.length > 0) {
            currentInput.value = urls[0];
            currentInput.dataset.fileUrl = items[0].fileUrl;
            currentInput.dataset.mediaId = items[0].id;
            updatePreviewForInput(
              currentInput,
              urls[0],
              items[0].contentType,
              items[0]
            );
          }

          // Fire input change event
          const event = new Event("change", { bubbles: true });
          currentInput.dispatchEvent(event);

          // Call custom callback with all selected items
          if (onSelect) {
            onSelect(urls, items, currentInput);
          }
        }
      } catch (error) {
        console.error("Error handling media selection:", error);
        if (onError) {
          onError(error, currentInput);
        }
      }
    },
    [currentInput, maxSelection, onSelect, onError]
  );

  // Initialize media inputs on mount and when DOM changes
  useEffect(() => {
    const initializeMediaInputs = () => {
      // Find all inputs with media-input class or data-media attribute
      const mediaInputs = document.querySelectorAll(
        'input.media-input, input[data-media="true"], [data-media-input]'
      );

      mediaInputs.forEach((input) => {
        // Skip if already initialized
        if (input.dataset.mediaInitialized) return;

        // Mark as initialized
        input.dataset.mediaInitialized = "true";

        // Get input-specific options
        const inputAccept = input.dataset.mediaAccept || input.accept || accept;
        const inputMaxSelection =
          parseInt(input.dataset.mediaMaxSelection) || maxSelection;
        const inputTitle = input.dataset.mediaTitle || "Choose Media";

        // Create wrapper if not exists
        let wrapper = input.parentElement;
        if (!wrapper.classList.contains("media-input-wrapper")) {
          wrapper = document.createElement("div");
          wrapper.className = "media-input-wrapper relative";
          input.parentElement.insertBefore(wrapper, input);
          wrapper.appendChild(input);
        }

        // Add browse button if not exists
        let browseButton = wrapper.querySelector(".media-browse-button");
        if (!browseButton) {
          browseButton = document.createElement("button");
          browseButton.type = "button";
          browseButton.className =
            "media-browse-button absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
          browseButton.textContent = "Browse";
          wrapper.appendChild(browseButton);

          // Adjust input padding to accommodate button
          input.style.paddingRight = "80px";
        }

        // Handle input click
        const handleInputClick = (e) => {
          e.preventDefault();
          openMediaPicker(input, {
            accept: inputAccept,
            maxSelection: inputMaxSelection,
            title: inputTitle,
          });
        };

        // Handle browse button click
        const handleBrowseClick = (e) => {
          e.preventDefault();
          openMediaPicker(input, {
            accept: inputAccept,
            maxSelection: inputMaxSelection,
            title: inputTitle,
          });
        };

        // Handle input focus
        const handleInputFocus = (e) => {
          // Optional: auto-open on focus
          if (input.dataset.mediaOpenOnFocus === "true") {
            openMediaPicker(input, {
              accept: inputAccept,
              maxSelection: inputMaxSelection,
              title: inputTitle,
            });
          }
        };

        // Handle drag and drop
        const handleDragOver = (e) => {
          e.preventDefault();
          wrapper.classList.add("drag-over");
        };

        const handleDragLeave = (e) => {
          e.preventDefault();
          wrapper.classList.remove("drag-over");
        };

        const handleDrop = (e) => {
          e.preventDefault();
          wrapper.classList.remove("drag-over");

          const files = Array.from(e.dataTransfer.files);
          if (files.length > 0) {
            // Validate file types
            const validFiles = files.filter((file) =>
              validateFileType(file, inputAccept)
            );

            if (validFiles.length === 0) {
              if (onError) {
                onError(
                  new Error(`Invalid file type. Accepted: ${inputAccept}`),
                  input
                );
              }
              return;
            }

            // For drag and drop, you might want to upload directly
            // or open the picker with these files pre-selected
            // This is a simplified implementation
            if (validFiles.length === 1 && URL.createObjectURL) {
              const file = validFiles[0];
              const tempUrl = URL.createObjectURL(file);
              input.value = tempUrl;
              updatePreviewForInput(input, tempUrl, file.type, {
                fileName: file.name,
              });

              // You would typically upload the file here
              console.log("File dropped:", file);
            }
          }
        };

        // Add event listeners
        input.addEventListener("click", handleInputClick);
        input.addEventListener("focus", handleInputFocus);
        browseButton.addEventListener("click", handleBrowseClick);

        // Add drag and drop if enabled
        if (input.dataset.mediaDragDrop !== "false") {
          wrapper.addEventListener("dragover", handleDragOver);
          wrapper.addEventListener("dragleave", handleDragLeave);
          wrapper.addEventListener("drop", handleDrop);
        }

        // Store cleanup function
        input._mediaInputCleanup = () => {
          input.removeEventListener("click", handleInputClick);
          input.removeEventListener("focus", handleInputFocus);
          browseButton.removeEventListener("click", handleBrowseClick);
          wrapper.removeEventListener("dragover", handleDragOver);
          wrapper.removeEventListener("dragleave", handleDragLeave);
          wrapper.removeEventListener("drop", handleDrop);
        };

        // Initialize preview if input has value
        if (input.value && input.dataset.fileUrl) {
          updatePreviewForInput(input, input.value, input.dataset.contentType);
        }
      });
    };

    // Initialize on mount
    initializeMediaInputs();

    // Re-initialize when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      initializeMediaInputs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();

      // Cleanup all media inputs
      const mediaInputs = document.querySelectorAll(
        'input[data-media-initialized="true"]'
      );
      mediaInputs.forEach((input) => {
        if (input._mediaInputCleanup) {
          input._mediaInputCleanup();
          delete input._mediaInputCleanup;
          delete input.dataset.mediaInitialized;
        }
      });
    };
  }, [accept, maxSelection, openMediaPicker, onError]);

  return {
    isMediaPickerOpen,
    openMediaPicker,
    closeMediaPicker,
    handleMediaSelect,
    currentOptions,
  };
};

/**
 * Programmatically attach media picker to an input element
 * @param {HTMLInputElement} input - The input element
 * @param {Object} options - Configuration options
 */
export const attachMediaPicker = (input, options = {}) => {
  if (!input || input.dataset.mediaInitialized) return;

  // Set data attributes to trigger initialization
  input.classList.add("media-input");
  if (options.accept) input.dataset.mediaAccept = options.accept;
  if (options.maxSelection)
    input.dataset.mediaMaxSelection = options.maxSelection;
  if (options.title) input.dataset.mediaTitle = options.title;
  if (options.openOnFocus) input.dataset.mediaOpenOnFocus = "true";
  if (options.dragDrop === false) input.dataset.mediaDragDrop = "false";

  // Trigger initialization
  const event = new CustomEvent("media-input-attach", { detail: options });
  input.dispatchEvent(event);
};

/**
 * Remove media picker from an input element
 * @param {HTMLInputElement} input - The input element
 */
export const detachMediaPicker = (input) => {
  if (!input || !input.dataset.mediaInitialized) return;

  if (input._mediaInputCleanup) {
    input._mediaInputCleanup();
    delete input._mediaInputCleanup;
  }

  input.classList.remove("media-input");
  delete input.dataset.mediaInitialized;
  delete input.dataset.mediaAccept;
  delete input.dataset.mediaMaxSelection;
  delete input.dataset.mediaTitle;
  delete input.dataset.mediaOpenOnFocus;
  delete input.dataset.mediaDragDrop;

  // Remove wrapper and browse button
  const wrapper = input.closest(".media-input-wrapper");
  if (wrapper && wrapper.parentElement) {
    wrapper.parentElement.insertBefore(input, wrapper);
    wrapper.remove();
  }

  // Remove preview
  const preview = input.parentElement?.querySelector(".media-preview");
  if (preview) {
    preview.remove();
  }
};

export default useMediaInput;
