/**
 * Settings Map - Fixed Footer Field Definitions
 * Each field maps to a setting key in the database
 */

export const FOOTER_SETTINGS_MAP = [
  {
    key: "siteTitle",
    label: "Site Title",
    placeholder: "Enter your site title",
    dataType: "string",
    category: "footer",
    isPublicDefault: true,
    description: "Main website title displayed in footer",
    validation: { required: true, minLength: 2, maxLength: 100 },
  },
  {
    key: "footerText",
    label: "Footer Text",
    placeholder: "Enter footer description or tagline",
    dataType: "text",
    category: "footer",
    isPublicDefault: true,
    description: "Footer description or company tagline",
    validation: { maxLength: 500 },
  },
  {
    key: "companyName",
    label: "Company Name",
    placeholder: "Your Company Name",
    dataType: "string",
    category: "footer",
    isPublicDefault: true,
    description: "Legal company name",
    validation: { required: true, minLength: 2, maxLength: 100 },
  },
  {
    key: "email",
    label: "Contact Email",
    placeholder: "contact@example.com",
    dataType: "email",
    category: "footer",
    isPublicDefault: true,
    description: "Primary contact email address",
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Please enter a valid email address",
    },
  },
  {
    key: "phone",
    label: "Contact Phone",
    placeholder: "+1 (555) 123-4567",
    dataType: "string",
    category: "footer",
    isPublicDefault: true,
    description: "Primary contact phone number",
    validation: {
      pattern: /^[\d\s\-\+\(\)]+$/,
      errorMessage: "Please enter a valid phone number",
      minLength: 7,
      maxLength: 20,
    },
  },
  {
    key: "address",
    label: "Business Address",
    placeholder: "123 Main Street, City, State, ZIP",
    dataType: "text",
    category: "footer",
    isPublicDefault: true,
    description: "Physical business address",
    validation: { maxLength: 200 },
  },
  {
    key: "facebook",
    label: "Facebook URL",
    placeholder: "https://facebook.com/yourpage",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "Facebook profile or page URL",
    validation: {
      pattern: /^https?:\/\/.+/,
      errorMessage:
        "Please enter a valid URL starting with http:// or https://",
      maxLength: 200,
    },
  },
  {
    key: "twitter",
    label: "Twitter URL",
    placeholder: "https://twitter.com/yourhandle",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "Twitter profile URL",
    validation: {
      pattern: /^https?:\/\/.+/,
      errorMessage:
        "Please enter a valid URL starting with http:// or https://",
      maxLength: 200,
    },
  },
  {
    key: "linkedin",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/company/yourcompany",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "LinkedIn company page URL",
    validation: {
      pattern: /^https?:\/\/.+/,
      errorMessage:
        "Please enter a valid URL starting with http:// or https://",
      maxLength: 200,
    },
  },
  {
    key: "instagram",
    label: "Instagram URL",
    placeholder: "https://instagram.com/youraccount",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "Instagram profile URL",
    validation: {
      pattern: /^https?:\/\/.+/,
      errorMessage:
        "Please enter a valid URL starting with http:// or https://",
      maxLength: 200,
    },
  },
  {
    key: "youtube",
    label: "YouTube URL",
    placeholder: "https://youtube.com/c/yourchannel",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "YouTube channel URL",
    validation: {
      pattern: /^https?:\/\/.+/,
      errorMessage:
        "Please enter a valid URL starting with http:// or https://",
      maxLength: 200,
    },
  },
  {
    key: "copyrightText",
    label: "Copyright Text",
    placeholder: "© 2025 Company Name. All rights reserved.",
    dataType: "string",
    category: "footer",
    isPublicDefault: true,
    description: "Copyright notice text",
    validation: { maxLength: 200 },
  },
  {
    key: "privacyPolicyUrl",
    label: "Privacy Policy URL",
    placeholder: "/privacy-policy",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "Link to privacy policy page",
    validation: { maxLength: 200 },
  },
  {
    key: "termsOfServiceUrl",
    label: "Terms of Service URL",
    placeholder: "/terms-of-service",
    dataType: "url",
    category: "footer",
    isPublicDefault: true,
    description: "Link to terms of service page",
    validation: { maxLength: 200 },
  },
];

/**
 * Get field definition by key
 * @param {string} key - Field key
 * @returns {Object|undefined} Field definition
 */
export const getFieldDefinition = (key) => {
  return FOOTER_SETTINGS_MAP.find((field) => field.key === key);
};

/**
 * Validate field value against its definition
 * @param {string} key - Field key
 * @param {string} value - Field value
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export const validateField = (key, value) => {
  const field = getFieldDefinition(key);
  if (!field) {
    return { isValid: true, error: null };
  }

  const { validation } = field;
  if (!validation) {
    return { isValid: true, error: null };
  }

  // Required validation
  if (validation.required && (!value || value.trim() === "")) {
    return { isValid: false, error: `${field.label} is required` };
  }

  // Skip other validations if value is empty and not required
  if (!value || value.trim() === "") {
    return { isValid: true, error: null };
  }

  // Min length validation
  if (validation.minLength && value.length < validation.minLength) {
    return {
      isValid: false,
      error: `${field.label} must be at least ${validation.minLength} characters`,
    };
  }

  // Max length validation
  if (validation.maxLength && value.length > validation.maxLength) {
    return {
      isValid: false,
      error: `${field.label} must not exceed ${validation.maxLength} characters`,
    };
  }

  // Pattern validation
  if (validation.pattern && !validation.pattern.test(value)) {
    return {
      isValid: false,
      error: validation.errorMessage || `${field.label} format is invalid`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Get all field keys
 * @returns {Array<string>} Array of field keys
 */
export const getAllFieldKeys = () => {
  return FOOTER_SETTINGS_MAP.map((field) => field.key);
};
