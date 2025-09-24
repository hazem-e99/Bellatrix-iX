import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import MediaPicker from "./MediaPicker";

/**
 * MediaInputDetector - Automatically detects and enhances inputs for media selection
 * Usage: Wrap your form/component with this and it will auto-detect media inputs
 */
const MediaInputDetector = ({ children, containerRef }) => {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [mediaType, setMediaType] = useState("all");

  useEffect(() => {
    const container = containerRef?.current || document;

    const attachMediaPicker = (input) => {
      // Skip if already processed
      if (input.dataset.mediaPickerAttached) return;

      // Mark as processed
      input.dataset.mediaPickerAttached = "true";

      // Get media type from data attribute or default to "all"
      const inputMediaType = input.dataset.mediaType || "all";

      // Create media button if it doesn't exist
      let mediaButton = input.parentElement.querySelector(
        ".media-picker-button"
      );
      if (!mediaButton) {
        mediaButton = document.createElement("button");
        mediaButton.type = "button";
        mediaButton.className =
          "media-picker-button absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-500 transition-colors";
        mediaButton.innerHTML = `
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-4.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Z" />
          </svg>
        `;

        // Make parent relative if not already
        const parent = input.parentElement;
        if (getComputedStyle(parent).position === "static") {
          parent.style.position = "relative";
        }

        parent.appendChild(mediaButton);
      }

      // Handle opening media picker
      const openMediaPicker = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveInput(input);
        setMediaType(inputMediaType);
        setIsMediaPickerOpen(true);
      };

      // Attach event listeners
      mediaButton.addEventListener("click", openMediaPicker);
      input.addEventListener("focus", openMediaPicker);

      // Store cleanup function
      input._mediaPickerCleanup = () => {
        mediaButton?.removeEventListener("click", openMediaPicker);
        input.removeEventListener("focus", openMediaPicker);
        mediaButton?.remove();
        delete input.dataset.mediaPickerAttached;
        delete input._mediaPickerCleanup;
      };
    };

    const detectAndAttachMediaInputs = () => {
      // Find inputs with data-media="true" attribute
      const mediaInputsWithAttribute = container.querySelectorAll(
        'input[data-media="true"], textarea[data-media="true"]'
      );

      // Find inputs with media-related classes or names
      const mediaInputsByClass = container.querySelectorAll(`
        input.media-input,
        input[name*="image"],
        input[name*="video"],
        input[name*="media"],
        input[name*="picture"],
        input[name*="photo"],
        input[placeholder*="image" i],
        input[placeholder*="video" i],
        input[placeholder*="media" i],
        textarea[name*="image"],
        textarea[name*="video"],
        textarea[name*="media"],
        textarea[placeholder*="image" i],
        textarea[placeholder*="video" i],
        textarea[placeholder*="media" i]
      `);

      // Combine both sets
      const allMediaInputs = new Set([
        ...mediaInputsWithAttribute,
        ...mediaInputsByClass,
      ]);

      // Attach media picker to each input
      allMediaInputs.forEach(attachMediaPicker);
    };

    // Initial detection
    detectAndAttachMediaInputs();

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node itself is a media input
              if (
                node.matches &&
                (node.matches('input[data-media="true"]') ||
                  node.matches('textarea[data-media="true"]') ||
                  node.matches("input.media-input") ||
                  node.matches('input[name*="image"]') ||
                  node.matches('input[name*="video"]') ||
                  node.matches('input[name*="media"]'))
              ) {
                attachMediaPicker(node);
              }

              // Check for media inputs within the added node
              const mediaInputs =
                node.querySelectorAll &&
                node.querySelectorAll(`
                input[data-media="true"],
                textarea[data-media="true"],
                input.media-input,
                input[name*="image"],
                input[name*="video"],
                input[name*="media"]
              `);

              if (mediaInputs) {
                mediaInputs.forEach(attachMediaPicker);
              }
            }
          });
        }
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      observer.disconnect();

      // Clean up all attached media pickers
      const allInputs = container.querySelectorAll(
        "input[data-media-picker-attached], textarea[data-media-picker-attached]"
      );
      allInputs.forEach((input) => {
        if (input._mediaPickerCleanup) {
          input._mediaPickerCleanup();
        }
      });
    };
  }, [containerRef]);

  // Handle media selection
  const handleMediaSelect = (mediaUrl, mediaItem) => {
    if (activeInput) {
      // Set the input value to the full URL
      activeInput.value = mediaUrl;

      // Dispatch custom events
      activeInput.dispatchEvent(new Event("input", { bubbles: true }));
      activeInput.dispatchEvent(new Event("change", { bubbles: true }));
      activeInput.dispatchEvent(
        new CustomEvent("media:selected", {
          bubbles: true,
          detail: {
            id: mediaItem.id,
            fileUrl: mediaItem.fileUrl,
            fullUrl: mediaUrl,
            mediaItem,
          },
        })
      );

      // Focus back to input
      activeInput.focus();
    }

    setIsMediaPickerOpen(false);
    setActiveInput(null);
  };

  const handleMediaPickerClose = () => {
    setIsMediaPickerOpen(false);
    setActiveInput(null);
  };

  return (
    <>
      {children}

      {/* Media Picker Modal */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={handleMediaPickerClose}
        onSelect={handleMediaSelect}
        accept={mediaType}
        title="Select Media"
        maxSelection={1}
      />
    </>
  );
};

export default MediaInputDetector;
