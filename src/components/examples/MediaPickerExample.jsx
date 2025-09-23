import React, { useState } from "react";
import MediaPicker from "../ui/MediaPicker";
import { useMediaInput, attachMediaPicker } from "../hooks/useMediaInput";
import { buildFullUrl } from "../utils/mediaUtils";

/**
 * Example integration component showing how to use MediaPicker with Enhanced Page Builder
 */
const MediaPickerExample = () => {
  const [selectedMedia, setSelectedMedia] = useState("");
  const [previewType, setPreviewType] = useState("");

  // Initialize media input hook
  const {
    isMediaPickerOpen,
    closeMediaPicker,
    handleMediaSelect,
    currentOptions,
  } = useMediaInput({
    accept: "all",
    maxSelection: 1,
    onSelect: (fullUrl, mediaItem, input) => {
      console.log("Media selected:", { fullUrl, mediaItem, input });
      setSelectedMedia(fullUrl);
      setPreviewType(mediaItem.contentType);
    },
    onError: (error, input) => {
      console.error("Media input error:", error);
      alert(`Error: ${error.message}`);
    },
  });

  // Example of programmatically attaching media picker
  const attachToInput = () => {
    const input = document.getElementById("programmatic-input");
    if (input) {
      attachMediaPicker(input, {
        accept: "image",
        title: "Choose Image",
        openOnFocus: true,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          MediaPicker Integration Examples
        </h1>

        {/* Example 1: Basic media input with class */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            1. Basic Media Input (using class)
          </h2>
          <p className="text-gray-600">
            Add{" "}
            <code className="bg-gray-100 px-1 rounded">
              class="media-input"
            </code>{" "}
            to any input
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select any media file:
            </label>
            <input
              type="text"
              className="media-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Click to choose media..."
              readOnly
            />
          </div>
        </div>

        {/* Example 2: Image-only input with data attribute */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            2. Image-Only Input (using data attribute)
          </h2>
          <p className="text-gray-600">
            Add{" "}
            <code className="bg-gray-100 px-1 rounded">data-media="true"</code>{" "}
            and configure with data attributes
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select image only:
            </label>
            <input
              type="text"
              data-media="true"
              data-media-accept="image"
              data-media-title="Choose Image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Click to choose image..."
              readOnly
            />
          </div>
        </div>

        {/* Example 3: Video-only input */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            3. Video-Only Input
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select video only:
            </label>
            <input
              type="text"
              data-media="true"
              data-media-accept="video"
              data-media-title="Choose Video"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Click to choose video..."
              readOnly
            />
          </div>
        </div>

        {/* Example 4: Input with drag and drop */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            4. Input with Drag & Drop
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drag files here or click to browse:
            </label>
            <input
              type="text"
              className="media-input w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              data-media-drag-drop="true"
              placeholder="Drag & drop files here or click to browse..."
              readOnly
            />
          </div>
        </div>

        {/* Example 5: Programmatic attachment */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            5. Programmatic Attachment
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular input (click button to attach media picker):
            </label>
            <div className="flex space-x-2">
              <input
                id="programmatic-input"
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Regular input..."
              />
              <button
                onClick={attachToInput}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Attach MediaPicker
              </button>
            </div>
          </div>
        </div>

        {/* Example 6: Enhanced Page Builder integration */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            6. Enhanced Page Builder Integration
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">
              Hero Section Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image:
                </label>
                <input
                  type="text"
                  className="media-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-media-accept="image"
                  data-media-title="Choose Background Image"
                  placeholder="Select background image..."
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Video:
                </label>
                <input
                  type="text"
                  className="media-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-media-accept="video"
                  data-media-title="Choose Hero Video"
                  placeholder="Select hero video..."
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo:
                </label>
                <input
                  type="text"
                  className="media-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-media-accept="image"
                  data-media-title="Choose Logo"
                  placeholder="Select logo..."
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images:
                </label>
                <input
                  type="text"
                  className="media-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-media-accept="image"
                  data-media-max-selection="5"
                  data-media-title="Choose Gallery Images"
                  placeholder="Select gallery images..."
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Current selection display */}
        {selectedMedia && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              Last Selected Media:
            </h3>
            <p className="text-blue-600 text-sm break-all mb-2">
              {selectedMedia}
            </p>
            {previewType?.startsWith("image/") && (
              <img
                src={selectedMedia}
                alt="Selected media"
                className="max-w-xs max-h-32 rounded border"
              />
            )}
            {previewType?.startsWith("video/") && (
              <video
                src={selectedMedia}
                controls
                className="max-w-xs max-h-32 rounded border"
              />
            )}
          </div>
        )}
      </div>

      {/* Code examples */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Code Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              1. HTML with CSS class:
            </h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`<input 
  type="text" 
  class="media-input"
  placeholder="Click to choose media..." 
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              2. HTML with data attributes:
            </h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`<input 
  type="text" 
  data-media="true"
  data-media-accept="image"
  data-media-title="Choose Image"
  data-media-open-on-focus="true"
  placeholder="Click to choose image..." 
/>`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              3. Programmatic JavaScript:
            </h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`import { attachMediaPicker } from './hooks/useMediaInput';

const input = document.getElementById('my-input');
attachMediaPicker(input, {
  accept: 'image',
  title: 'Choose Image',
  openOnFocus: true,
  onSelect: (url, mediaItem) => {
    console.log('Selected:', url);
  }
});`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">4. React Hook:</h3>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
              {`import { useMediaInput } from './hooks/useMediaInput';
import MediaPicker from './components/ui/MediaPicker';

function MyComponent() {
  const {
    isMediaPickerOpen,
    closeMediaPicker,
    handleMediaSelect,
    currentOptions
  } = useMediaInput({
    accept: "all",
    onSelect: (url, mediaItem) => {
      console.log('Selected:', url);
    }
  });

  return (
    <>
      <input className="media-input" />
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={closeMediaPicker}
        onSelect={handleMediaSelect}
        {...currentOptions}
      />
    </>
  );
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* MediaPicker Modal */}
      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={closeMediaPicker}
        onSelect={handleMediaSelect}
        {...currentOptions}
      />
    </div>
  );
};

export default MediaPickerExample;
