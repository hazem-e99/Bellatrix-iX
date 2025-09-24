import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import api from "../../lib/api";

// Media Picker Modal Component
const MediaPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef();

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching media from API...");
      const response = await api.get("/Media?page=1&pageSize=20");
      console.log("📥 Media API response:", response);
      
      // Handle different response structures
      let mediaItems = [];
      if (response.data?.data?.items) {
        mediaItems = response.data.data.items;
      } else if (response.data?.items) {
        mediaItems = response.data.items;
      } else if (Array.isArray(response.data)) {
        mediaItems = response.data;
      } else if (response.data) {
        mediaItems = [response.data];
      }
      
      console.log("🖼️ Processed media items:", mediaItems);
      
      // Log individual items for debugging
      mediaItems.forEach((item, index) => {
        console.log(`📄 Media item ${index}:`, {
          id: item.id,
          fileName: item.fileName,
          fileUrl: item.fileUrl,
          filePath: item.filePath, 
          mediaType: item.mediaType,
          fullUrl: (item.fileUrl || item.filePath)?.startsWith('http') 
            ? (item.fileUrl || item.filePath) 
            : `http://bellatrix.runasp.net${item.fileUrl || item.filePath}`
        });
      });
      
      setMedia(mediaItems);
    } catch (error) {
      console.error("❌ Error fetching media:", error);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

    // Handle file upload
    const handleUploadClick = () => {
      if (fileInputRef.current) fileInputRef.current.value = null;
      fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
      const selectedFile = e.target.files[0];
      if (!selectedFile) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("File", selectedFile);
        formData.append(
          "Role",
          selectedFile.type.startsWith("video") ? "Video" : "Image"
        );
        formData.append("AlternateText", "Uploaded media");
        formData.append("Caption", "Default caption");
        formData.append("SortOrder", 1);

        await api.post("/Media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Refresh media list after upload
        await fetchMedia();
      } catch (err) {
        console.error("❌ Error uploading media:", err);
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    };

  const handleSelect = () => {
    if (selectedMedia) {
      console.log("✅ Selected media:", selectedMedia);
      // Add base URL if the path is relative
      const mediaUrl = selectedMedia.fileUrl || selectedMedia.filePath || selectedMedia.url;
      const fullUrl = mediaUrl?.startsWith('http') ? mediaUrl : `http://bellatrix.runasp.net${mediaUrl}`;
      console.log("🔗 Full media URL:", fullUrl);
      onSelect(fullUrl);
      onClose();
      setSelectedMedia(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl h-3/4 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Media
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUploadClick}
                disabled={uploading}
                className="ml-2"
              >
                {uploading ? "Uploading..." : "Upload Media"}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
                    selectedMedia?.id === item.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {(() => {
                      // More flexible image detection
                      const isImage = item.mediaType === 0 || 
                                    item.mediaType?.startsWith('image/') ||
                                    item.fileName?.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i);
                      
                      const isVideo = item.mediaType === 1 || 
                                    item.mediaType?.startsWith('video/') ||
                                    item.fileName?.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i);
                      
                      console.log(`🔍 Media type check for ${item.fileName}:`, {
                        mediaType: item.mediaType,
                        isImage,
                        isVideo,
                        fileName: item.fileName
                      });
                      
                      if (isImage) {
                        return (
                          <img
                            src={(() => {
                              const mediaUrl = item.fileUrl || item.filePath;
                              const fullUrl = mediaUrl?.startsWith('http') ? mediaUrl : `http://bellatrix.runasp.net${mediaUrl}`;
                              console.log('🖼️ Loading image:', fullUrl, 'from original:', mediaUrl);
                              return fullUrl;
                            })()}
                            alt={item.fileName || "Media"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('❌ Image failed to load:', e.target.src);
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        );
                      } else if (isVideo) {
                        return (
                          <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                            <video 
                              className="w-full h-full object-cover"
                              muted
                              preload="metadata"
                              onError={(e) => {
                                console.error('❌ Video failed to load:', e.target.src);
                              }}
                            >
                              <source 
                                src={(() => {
                                  const mediaUrl = item.fileUrl || item.filePath;
                                  const fullUrl = mediaUrl?.startsWith('http') ? mediaUrl : `http://bellatrix.runasp.net${mediaUrl}`;
                                  console.log('🎥 Loading video:', fullUrl, 'from original:', mediaUrl);
                                  return fullUrl;
                                })()} 
                                type={item.mediaType}
                              />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <VideoCameraIcon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex flex-col items-center text-gray-500">
                            <PhotoIcon className="h-8 w-8 mb-2" />
                            <span className="text-xs text-center">
                              {item.fileName}
                            </span>
                          </div>
                        );
                      }
                    })()}
                    {/* Fallback for broken images */}
                    <div className="hidden flex-col items-center text-gray-500">
                      <PhotoIcon className="h-8 w-8 mb-2" />
                      <span className="text-xs text-center">Broken Image</span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {item.fileName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedMedia}
            className="bg-blue-600 text-white"
          >
            Select Media
          </Button>
        </div>
      </div>
    </div>
  );
};

// Dynamic Content Form Component
const DynamicContentForm = ({ contentJson, onChange, className = "" }) => {
  const [parsedContent, setParsedContent] = useState({});
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [currentMediaField, setCurrentMediaField] = useState(null);

  // Parse contentJson on mount and when it changes
  useEffect(() => {
    try {
      const content =
        typeof contentJson === "string"
          ? JSON.parse(contentJson || "{}")
          : contentJson || {};
      console.log("📋 Parsed contentJson:", content);
      setParsedContent(content);
    } catch (error) {
      console.error("Error parsing contentJson:", error);
      setParsedContent({});
    }
  }, [contentJson]);

  // Fields that should use media picker instead of text input
  const mediaFields = [
    "backgroundimage",
    "backgroundvideo", 
    "image",
    "video",
    "icon",
    "logo",
    "thumbnail",
    "avatar",
    "picture",
    "photo",
    "banner",
    "heroimage",
    "herovideo",
    "img",
    "pic", 
    "media",
    "file",
    "asset",
    "poster"
  ];

  // Check if a field name suggests it's a media field
  const isMediaField = (fieldName) => {
    const lowerFieldName = fieldName.toLowerCase();
    return mediaFields.some(
      (mediaField) =>
        lowerFieldName.includes(mediaField) ||
        lowerFieldName.endsWith("image") ||
        lowerFieldName.endsWith("video") ||
        lowerFieldName.endsWith("img") ||
        lowerFieldName.endsWith("pic") ||
        lowerFieldName.endsWith("photo") ||
        lowerFieldName.endsWith("asset") ||
        lowerFieldName.endsWith("media")
    );
  };

  // Update a field value in the parsed content
  const updateField = (path, value) => {
    const newContent = { ...parsedContent };

    // Handle nested paths like "ctaButton.text"
    const keys = path.split(".");
    let current = newContent;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Set the final value
    current[keys[keys.length - 1]] = value;

    setParsedContent(newContent);

    // Convert back to JSON string and call onChange
    const jsonString = JSON.stringify(newContent, null, 2);
    console.log("💾 Updated contentJson:", newContent);
    onChange(jsonString);
  };

  // Open media picker for a specific field
  const openMediaPicker = (fieldPath) => {
    console.log("🎯 Opening media picker for field:", fieldPath);
    setCurrentMediaField(fieldPath);
    setMediaPickerOpen(true);
  };

  // Handle media selection
  const handleMediaSelect = (mediaUrl) => {
    if (currentMediaField) {
      console.log("📎 Setting media URL:", mediaUrl, "for field:", currentMediaField);
      updateField(currentMediaField, mediaUrl);
    }
    setCurrentMediaField(null);
  };

  // Recursively render form fields for an object
  const renderFields = (obj, parentPath = "") => {
    const fields = [];

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const fieldPath = parentPath ? `${parentPath}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        // Nested object - render as a group
        fields.push(
          <div
            key={fieldPath}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h4>
            <div className="space-y-3">{renderFields(value, fieldPath)}</div>
          </div>
        );
      } else {
        // Simple field
        const isMedia = isMediaField(key);

        fields.push(
          <div key={fieldPath} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
              {isMedia && (
                <span className="text-xs text-blue-600 ml-1">(Media)</span>
              )}
            </label>

            {isMedia ? (
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={value || ""}
                    onChange={(e) => updateField(fieldPath, e.target.value)}
                    placeholder={`Enter ${key} URL or select from library`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openMediaPicker(fieldPath)}
                    className="px-3 shrink-0"
                    title="Select from media library"
                  >
                    <PhotoIcon className="h-4 w-4" />
                  </Button>
                </div>
                {/* Media Preview */}
                {value && (
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                    {(() => {
                      const fullUrl = value?.startsWith('http') ? value : `http://bellatrix.runasp.net${value}`;
                      const fileName = value.split('/').pop() || value;
                      const isVideo = fileName.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i);
                      
                      if (isVideo) {
                        return (
                          <div className="w-8 h-8 bg-gray-800 rounded border flex items-center justify-center">
                            <VideoCameraIcon className="h-4 w-4 text-white" />
                          </div>
                        );
                      } else {
                        return (
                          <>
                            <img
                              src={fullUrl}
                              alt="Preview"
                              className="w-8 h-8 object-cover rounded border"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                              <PhotoIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          </>
                        );
                      }
                    })()}
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      Selected: {value.split('/').pop() || value}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <Input
                value={value || ""}
                onChange={(e) => updateField(fieldPath, e.target.value)}
                placeholder={`Enter ${key}`}
              />
            )}
          </div>
        );
      }
    });

    return fields;
  };

  // Add new field functionality
  const addNewField = () => {
    const fieldName = prompt("Enter field name:");
    if (fieldName && fieldName.trim()) {
      updateField(fieldName.trim(), "");
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Dynamic Content Fields
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNewField}
          className="text-xs"
        >
          + Add Field
        </Button>
      </div>

      {Object.keys(parsedContent).length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No content fields found. Add some fields to get started.</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewField}
            className="mt-2"
          >
            Add First Field
          </Button>
        </div>
      ) : (
        <div className="space-y-4">{renderFields(parsedContent)}</div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => {
          setMediaPickerOpen(false);
          setCurrentMediaField(null);
        }}
        onSelect={handleMediaSelect}
      />
    </div>
  );
};

export default DynamicContentForm;
