const BASE_HOST = "http://bellatrix.runasp.net";

/**
 * Build full URL from file URL
 * @param {string} fileUrl - The file URL from the API
 * @returns {string} Full URL
 */
export function buildFullUrl(fileUrl) {
  if (!fileUrl) return "";
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))
    return fileUrl;
  // ensure exactly one slash between base and fileUrl
  const normalizedFileUrl = fileUrl.startsWith("/")
    ? fileUrl.slice(1)
    : fileUrl;
  return `${BASE_HOST}/${normalizedFileUrl}`;
}

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Format date in readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get media type from content type
 * @param {string} contentType - MIME type
 * @returns {string} Media type (image, video, or file)
 */
export function getMediaType(contentType) {
  if (!contentType) return "file";
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  return "file";
}

/**
 * Check if content type is an image
 * @param {string} contentType - MIME type
 * @returns {boolean} True if image
 */
export function isImage(contentType) {
  return contentType && contentType.startsWith("image/");
}

/**
 * Check if content type is a video
 * @param {string} contentType - MIME type
 * @returns {boolean} True if video
 */
export function isVideo(contentType) {
  return contentType && contentType.startsWith("video/");
}

/**
 * Update preview element for media input
 * @param {HTMLElement} input - The input element
 * @param {string} fullUrl - Full URL of the media
 * @param {string} contentType - MIME type
 * @param {Object} mediaItem - Full media item object
 */
export function updatePreviewForInput(
  input,
  fullUrl,
  contentType,
  mediaItem = {}
) {
  // Find or create preview container
  let previewContainer = input.parentElement.querySelector(".media-preview");

  if (!previewContainer) {
    previewContainer = document.createElement("div");
    previewContainer.className = "media-preview mt-3";
    input.parentElement.appendChild(previewContainer);
  }

  // Clear existing preview
  previewContainer.innerHTML = "";

  if (!fullUrl) {
    previewContainer.style.display = "none";
    return;
  }

  previewContainer.style.display = "block";

  // Create preview element based on media type
  if (isImage(contentType)) {
    const img = document.createElement("img");
    img.src = fullUrl;
    img.alt = mediaItem.fileName || "Preview";
    img.className =
      "max-w-xs max-h-32 rounded-lg shadow-sm border border-gray-200 object-cover";
    img.loading = "lazy";

    // Handle image load error
    img.onerror = () => {
      img.style.display = "none";
      showPreviewError(previewContainer, "Image failed to load");
    };

    previewContainer.appendChild(img);
  } else if (isVideo(contentType)) {
    const video = document.createElement("video");
    video.src = fullUrl;
    video.controls = true;
    video.className =
      "max-w-xs max-h-32 rounded-lg shadow-sm border border-gray-200";
    video.preload = "metadata";

    // Handle video load error
    video.onerror = () => {
      video.style.display = "none";
      showPreviewError(previewContainer, "Video failed to load");
    };

    previewContainer.appendChild(video);
  } else {
    // Show file info for other types
    const fileInfo = document.createElement("div");
    fileInfo.className =
      "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 max-w-xs";
    fileInfo.innerHTML = `
      <div class="flex-shrink-0">
        <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          ${mediaItem.fileName || "File"}
        </p>
        <p class="text-sm text-gray-500 truncate">
          ${contentType || "Unknown type"}
        </p>
        ${
          mediaItem.fileSize
            ? `<p class="text-xs text-gray-400">${formatFileSize(
                mediaItem.fileSize
              )}</p>`
            : ""
        }
      </div>
    `;

    previewContainer.appendChild(fileInfo);
  }

  // Add remove button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className =
    "mt-2 text-sm text-red-600 hover:text-red-800 focus:outline-none";
  removeButton.textContent = "Remove";
  removeButton.onclick = () => {
    input.value = "";
    delete input.dataset.fileUrl;
    delete input.dataset.mediaId;
    previewContainer.style.display = "none";
  };

  previewContainer.appendChild(removeButton);
}

/**
 * Show preview error message
 * @param {HTMLElement} container - Preview container
 * @param {string} message - Error message
 */
function showPreviewError(container, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className =
    "flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200 max-w-xs";
  errorDiv.innerHTML = `
    <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="text-sm text-red-600">${message}</span>
  `;
  container.appendChild(errorDiv);
}

/**
 * Validate file type against accepted types
 * @param {File} file - File to validate
 * @param {string} accept - Accepted types ("all", "image", "video", or comma-separated MIME types)
 * @returns {boolean} True if file is accepted
 */
export function validateFileType(file, accept = "all") {
  if (!file || accept === "all") return true;

  const fileType = file.type.toLowerCase();

  if (accept === "image") {
    return fileType.startsWith("image/");
  }

  if (accept === "video") {
    return fileType.startsWith("video/");
  }

  // Handle comma-separated MIME types
  const acceptedTypes = accept
    .toLowerCase()
    .split(",")
    .map((type) => type.trim());
  return acceptedTypes.some((type) => {
    if (type === "image/*") return fileType.startsWith("image/");
    if (type === "video/*") return fileType.startsWith("video/");
    return fileType === type;
  });
}

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export function getFileExtension(filename) {
  if (!filename) return "";
  const lastDot = filename.lastIndexOf(".");
  return lastDot === -1 ? "" : filename.slice(lastDot + 1).toLowerCase();
}

/**
 * Generate thumbnail URL for media
 * @param {string} fileUrl - Original file URL
 * @param {string} size - Thumbnail size (small, medium, large)
 * @returns {string} Thumbnail URL
 */
export function getThumbnailUrl(fileUrl, size = "medium") {
  if (!fileUrl) return "";

  const fullUrl = buildFullUrl(fileUrl);

  // If the backend supports thumbnail generation, modify the URL
  // This is a placeholder - adjust based on your backend implementation
  if (fullUrl.includes("/uploads/")) {
    return fullUrl.replace("/uploads/", `/thumbnails/${size}/`);
  }

  return fullUrl;
}

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
