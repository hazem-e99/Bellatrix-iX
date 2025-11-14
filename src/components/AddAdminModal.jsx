import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import api from "../lib/api";

/**
 * User Role Enum (from swagger)
 * 1 → SuperAdmin
 * 2 → Admin
 * 3 → User
 */
const USER_ROLES = [
  { value: 1, label: "Super Admin" },
  { value: 2, label: "Admin" },
  { value: 3, label: "User" },
];

/**
 * AddAdminModal Component
 * Modal for creating new admin users via POST /api/Authentication/Registration
 */
const AddAdminModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: 2, // Default to Admin
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Reset form
   */
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      role: 2,
    });
    setErrors({});
  };

  /**
   * Handle input change
   */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  /**
   * Validate form
   */
  const validate = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Role
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix validation errors");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📤 [AddAdminModal] Creating admin:", formData);

      // Call POST /api/Authentication/Registration
      // Note: The api interceptor unwraps {success, data, message} → response.data
      // So we need to catch the full response before unwrapping
      const response = await api.post("/Authentication/Registration", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        role: formData.role,
      });

      console.log("✅ [AddAdminModal] Response:", response);

      // Since interceptor extracts response.data.data, check if response succeeded
      // For BooleanApiResponse, response.data should be the boolean value
      toast.success("Admin created successfully! Verification email sent.");
      resetForm();
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("❌ [AddAdminModal] Error:", error);

      // Handle API error response
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        error.message ||
        "Failed to create admin";

      toast.error(errorMessage);

      // If duplicate username/email, highlight the field
      if (errorMessage.toLowerCase().includes("username")) {
        setErrors((prev) => ({ ...prev, username: errorMessage }));
      } else if (errorMessage.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: errorMessage }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full border border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <UserPlusIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Add New Admin
                </h3>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.firstName ? "border-red-500" : "border-gray-600"
                  }`}
                  autoFocus
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.lastName ? "border-red-500" : "border-gray-600"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="admin@example.com"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="Enter username"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.username ? "border-red-500" : "border-gray-600"
                  }`}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-400">{errors.username}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Minimum 3 characters
                </p>
              </div>

              {/* Role Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    handleChange("role", parseInt(e.target.value))
                  }
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.role ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  {USER_ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1 text-xs text-red-400">{errors.role}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Select the access level for this admin
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                <p className="text-xs text-blue-300 font-medium mb-1">
                  ℹ️ Registration Details:
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• A verification email will be sent to the user</li>
                  <li>• User must verify email before login</li>
                  <li>• Default password will be system-generated</li>
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlusIcon className="w-4 h-4" />
                      Create Admin
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAdminModal;
