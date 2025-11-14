import React, { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { validateField } from "../constants/settingsMap";
import {
  updateSetting,
  createSetting,
  deleteSetting,
  checkKeyExists,
} from "../services/settingsApi";

/**
 * SettingField Component
 * Renders a single setting field with save/delete actions
 */
const SettingField = ({
  fieldDef,
  existingValue,
  existingId,
  onSaveSuccess,
  onDeleteSuccess,
}) => {
  const [value, setValue] = useState(existingValue || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Update value when existingValue changes (when data loads from API)
  useEffect(() => {
    setValue(existingValue || "");
    setIsDirty(false);
  }, [existingValue]);

  const {
    key,
    label,
    placeholder,
    dataType,
    category,
    isPublicDefault,
    description,
  } = fieldDef;

  /**
   * Handle value change
   */
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsDirty(newValue !== (existingValue || ""));

    // Clear validation error on change
    if (validationError) {
      setValidationError(null);
    }
  };

  /**
   * Validate current value
   */
  const validate = () => {
    const validation = validateField(key, value);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return false;
    }
    setValidationError(null);
    return true;
  };

  /**
   * Handle single field save
   */
  const handleSave = async () => {
    // Validate
    if (!validate()) {
      toast.error(`Validation failed: ${validationError}`);
      return;
    }

    console.log(`💾 [SettingField] Saving field "${key}":`, {
      existingId,
      existingValue,
      newValue: value,
      willUpdate: !!existingId,
      willCreate: !existingId,
    });

    setIsSaving(true);

    try {
      if (existingId) {
        // UPDATE existing setting
        const payload = {
          id: existingId,
          key,
          value: value || "",
          description: description || "",
          category: category || "footer",
          isPublic: isPublicDefault !== undefined ? isPublicDefault : true,
          dataType: dataType || "string",
        };

        console.log(`🔄 [SettingField] PUT request for "${key}":`, payload);
        const response = await updateSetting(payload);

        if (response.success) {
          console.log(`✅ [SettingField] Update success for "${key}":`, response.data);
          toast.success(`${label} updated successfully`);
          setIsDirty(false);
          if (onSaveSuccess && response.data) {
            onSaveSuccess(response.data);
          }
        } else {
          console.error(`❌ [SettingField] Update failed for "${key}":`, response.message);
          toast.error(response.message || "Failed to update setting");
        }
      } else {
        // CREATE new setting
        // First check if key exists
        const existsResponse = await checkKeyExists(key);

        if (existsResponse.success && existsResponse.data === true) {
          console.warn(`⚠️ [SettingField] Key "${key}" already exists`);
          toast.error(
            `Setting with key "${key}" already exists. Please refresh the page.`
          );
          return;
        }

        const payload = {
          key,
          value: value || "",
          description: description || "",
          category: category || "footer",
          isPublic: isPublicDefault !== undefined ? isPublicDefault : true,
          dataType: dataType || "string",
        };

        console.log(`➕ [SettingField] POST request for "${key}":`, payload);
        const response = await createSetting(payload);

        if (response.success) {
          console.log(`✅ [SettingField] Create success for "${key}":`, response.data);
          toast.success(`${label} created successfully`);
          setIsDirty(false);
          if (onSaveSuccess && response.data) {
            onSaveSuccess(response.data);
          }
        } else {
          console.error(`❌ [SettingField] Create failed for "${key}":`, response.message);
          toast.error(response.message || "Failed to create setting");
        }
      }
    } catch (error) {
      console.error(`❌ [SettingField] Exception for "${key}":`, error);
      toast.error(error.message || "An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle delete confirmation
   */
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  /**
   * Handle delete execution
   */
  const handleDeleteConfirm = async () => {
    if (!existingId) {
      console.warn(`⚠️ [SettingField] Cannot delete "${key}" - no existingId`);
      toast.error("Cannot delete - setting has no ID");
      return;
    }

    console.log(`🗑️ [SettingField] Deleting setting "${key}" with ID:`, existingId);
    setIsDeleting(true);

    try {
      const response = await deleteSetting(existingId);

      if (response.success) {
        console.log(`✅ [SettingField] Delete success for "${key}"`);
        toast.success(`${label} deleted successfully`);
        setValue("");
        setIsDirty(false);
        setShowDeleteConfirm(false);
        if (onDeleteSuccess) {
          onDeleteSuccess(key);
        }
      } else {
        console.error(`❌ [SettingField] Delete failed for "${key}":`, response.message);
        toast.error(response.message || "Failed to delete setting");
      }
    } catch (error) {
      console.error(`❌ [SettingField] Delete exception for "${key}":`, error);
      toast.error(error.message || "An error occurred while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handle delete cancel
   */
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // Determine if field is a textarea
  const isTextarea = dataType === "text";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all hover:shadow-md">
      {/* Label and Description */}
      <div className="mb-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          {label}
          {fieldDef.validation?.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {description}
          </p>
        )}
      </div>

      {/* Input Field */}
      <div className="flex items-start gap-2">
        <div className="flex-1">
          {isTextarea ? (
            <textarea
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={3}
              disabled={isSaving || isDeleting}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-colors
                ${
                  validationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                }
                ${
                  isDirty
                    ? "bg-yellow-50 dark:bg-yellow-900/10"
                    : "bg-white dark:bg-gray-700"
                }
                dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2`}
            />
          ) : (
            <input
              type={
                dataType === "email"
                  ? "email"
                  : dataType === "url"
                  ? "url"
                  : "text"
              }
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={isSaving || isDeleting}
              className={`w-full px-3 py-2 border rounded-md text-sm transition-colors
                ${
                  validationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                }
                ${
                  isDirty
                    ? "bg-yellow-50 dark:bg-yellow-900/10"
                    : "bg-white dark:bg-gray-700"
                }
                dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2`}
            />
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="flex items-center gap-1 mt-1 text-xs text-red-600 dark:text-red-400">
              <XCircleIcon className="w-3 h-3" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Dirty Indicator */}
          {isDirty && !validationError && (
            <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600 dark:text-yellow-400">
              <span>Unsaved changes</span>
            </div>
          )}

          {/* Success Indicator */}
          {!isDirty && existingId && (
            <div className="flex items-center gap-1 mt-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircleSolid className="w-3 h-3" />
              <span>Saved</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving || isDeleting}
            className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Save"
          >
            {isSaving ? (
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            )}
          </button>

          {/* Delete Button */}
          {existingId && (
            <button
              onClick={handleDeleteClick}
              disabled={isSaving || isDeleting}
              className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Delete"
            >
              {isDeleting ? (
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete "{label}"? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingField;
