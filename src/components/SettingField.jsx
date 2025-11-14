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
  getSettingByKey,
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
}) => {
  const [value, setValue] = useState(existingValue || "");
  const [isSaving, setIsSaving] = useState(false);
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
          console.log(
            `✅ [SettingField] Update success for "${key}":`,
            response.data
          );
          toast.success(`${label} updated successfully`);
          setIsDirty(false);
          if (onSaveSuccess && response.data) {
            onSaveSuccess(response.data);
          }
        } else {
          console.error(
            `❌ [SettingField] Update failed for "${key}":`,
            response.message
          );
          toast.error(response.message || "Failed to update setting");
        }
      } else {
        // CREATE new setting OR UPDATE if exists
        // First check if key exists in database
        console.log(`🔍 [SettingField] Checking if key "${key}" exists...`);
        const existingSettingResponse = await getSettingByKey(key);

        if (existingSettingResponse.success && existingSettingResponse.data) {
          // Key exists in database - UPDATE instead of CREATE
          console.warn(
            `⚠️ [SettingField] Key "${key}" already exists in database. Performing UPDATE instead of CREATE.`
          );

          const existingSetting = existingSettingResponse.data;
          const payload = {
            id: existingSetting.id,
            key,
            value: value || "",
            description: description || existingSetting.description || "",
            category: category || existingSetting.category || "footer",
            isPublic:
              isPublicDefault !== undefined
                ? isPublicDefault
                : existingSetting.isPublic !== undefined
                ? existingSetting.isPublic
                : true,
            dataType: dataType || existingSetting.dataType || "string",
          };

          console.log(
            `🔄 [SettingField] UPDATE request for existing key "${key}":`,
            payload
          );
          const response = await updateSetting(payload);

          if (response.success) {
            console.log(
              `✅ [SettingField] Update success for "${key}":`,
              response.data
            );
            toast.success(`${label} updated successfully`);
            setIsDirty(false);
            if (onSaveSuccess && response.data) {
              onSaveSuccess(response.data);
            }
          } else {
            console.error(
              `❌ [SettingField] Update failed for "${key}":`,
              response.message
            );
            toast.error(response.message || "Failed to update setting");
          }
        } else {
          // Key doesn't exist - CREATE new setting
          const payload = {
            key,
            value: value || "",
            description: description || "",
            category: category || "footer",
            isPublic: isPublicDefault !== undefined ? isPublicDefault : true,
            dataType: dataType || "string",
          };

          console.log(
            `➕ [SettingField] POST request for new key "${key}":`,
            payload
          );
          const response = await createSetting(payload);

          if (response.success) {
            console.log(
              `✅ [SettingField] Create success for "${key}":`,
              response.data
            );
            toast.success(`${label} created successfully`);
            setIsDirty(false);
            if (onSaveSuccess && response.data) {
              onSaveSuccess(response.data);
            }
          } else {
            console.error(
              `❌ [SettingField] Create failed for "${key}":`,
              response.message
            );
            toast.error(response.message || "Failed to create setting");
          }
        }
      }
    } catch (error) {
      console.error(`❌ [SettingField] Exception for "${key}":`, error);
      toast.error(error.message || "An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  // Determine if field is a textarea
  const isTextarea = dataType === "text";

  // Check if this is a dynamic field (not in FOOTER_SETTINGS_MAP)
  const isDynamicField = fieldDef.description?.startsWith("Dynamic setting:");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all hover:shadow-md">
      {/* Label and Description */}
      <div className="mb-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
          {label}
          {fieldDef.validation?.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
          {isDynamicField && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
              Dynamic
            </span>
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
              disabled={isSaving}
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
              disabled={isSaving}
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
            disabled={!isDirty || isSaving}
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
        </div>
      </div>
    </div>
  );
};

export default SettingField;
