/**
 * Variant System for CTA Buttons and Components
 * Provides validation and styling for different button variants
 */

/**
 * Validates if a variant is supported
 * @param {string} variant - The variant to validate
 * @returns {string} - Valid variant or 'primary' as fallback
 */
export const validateVariant = (variant) => {
  const validVariants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  
  if (!variant || typeof variant !== 'string') {
    console.warn('🎨 [VARIANT] Invalid variant type:', typeof variant, variant);
    return 'primary';
  }
  
  const normalizedVariant = variant.toLowerCase().trim();
  
  if (!validVariants.includes(normalizedVariant)) {
    console.warn(`🎨 [VARIANT] Invalid variant "${variant}" found, defaulting to "primary"`);
    return 'primary';
  }
  
  return normalizedVariant;
};

/**
 * Gets CSS classes for a specific variant
 * @param {string} variant - The variant to get classes for
 * @returns {string} - CSS classes for the variant
 */
export const getVariantClasses = (variant) => {
  const validatedVariant = validateVariant(variant);
  
  const classes = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
    success: 'bg-green-600 hover:bg-green-700 text-white border-green-600',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
    info: 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600'
  };
  
  return classes[validatedVariant] || classes.primary;
};

/**
 * Gets variant display name for UI
 * @param {string} variant - The variant to get display name for
 * @returns {string} - Human-readable variant name
 */
export const getVariantDisplayName = (variant) => {
  const validatedVariant = validateVariant(variant);
  
  const displayNames = {
    primary: 'Primary (Blue)',
    secondary: 'Secondary (Gray)',
    success: 'Success (Green)',
    warning: 'Warning (Yellow)',
    danger: 'Danger (Red)',
    info: 'Info (Cyan)'
  };
  
  return displayNames[validatedVariant] || displayNames.primary;
};

/**
 * Gets all available variants with their display names
 * @returns {Array} - Array of variant objects with value and label
 */
export const getAvailableVariants = () => {
  return [
    { value: 'primary', label: 'Primary (Blue)' },
    { value: 'secondary', label: 'Secondary (Gray)' },
    { value: 'success', label: 'Success (Green)' },
    { value: 'warning', label: 'Warning (Yellow)' },
    { value: 'danger', label: 'Danger (Red)' },
    { value: 'info', label: 'Info (Cyan)' }
  ];
};

/**
 * Variant options for form dropdowns with CSS classes
 * @returns {Array} - Array of variant objects with value, label, and classes
 */
export const variantOptions = [
  { 
    value: 'primary', 
    label: 'Primary (Blue)', 
    classes: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
  },
  { 
    value: 'secondary', 
    label: 'Secondary (Gray)', 
    classes: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600' 
  },
  { 
    value: 'success', 
    label: 'Success (Green)', 
    classes: 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
  },
  { 
    value: 'warning', 
    label: 'Warning (Yellow)', 
    classes: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600' 
  },
  { 
    value: 'danger', 
    label: 'Danger (Red)', 
    classes: 'bg-red-600 hover:bg-red-700 text-white border-red-600' 
  },
  { 
    value: 'info', 
    label: 'Info (Cyan)', 
    classes: 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600' 
  }
];

/**
 * Fixes CTA button data by validating and normalizing variant
 * @param {Object} ctaData - CTA button data object
 * @returns {Object} - Fixed CTA button data
 */
export const fixCTAVariant = (ctaData) => {
  if (!ctaData || typeof ctaData !== 'object') {
    console.warn('🎨 [VARIANT FIX] Invalid CTA data:', ctaData);
    return { variant: 'primary' };
  }
  
  const fixedData = { ...ctaData };
  
  // Fix variant
  if (fixedData.variant) {
    const originalVariant = fixedData.variant;
    fixedData.variant = validateVariant(fixedData.variant);
    
    if (originalVariant !== fixedData.variant) {
      console.warn(`🎨 [VARIANT FIX] Fixed variant "${originalVariant}" → "${fixedData.variant}"`);
    }
  } else {
    fixedData.variant = 'primary';
    console.log('🎨 [VARIANT FIX] Added missing variant, defaulting to "primary"');
  }
  
  return fixedData;
};

/**
 * Fixes nested CTA button structures
 * @param {Object} data - Data object that may contain CTA buttons
 * @returns {Object} - Data with fixed CTA variants
 */
export const fixAllCTAVariants = (data) => {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  const fixedData = { ...data };
  
  // Fix top-level ctaButton
  if (fixedData.ctaButton) {
    fixedData.ctaButton = fixCTAVariant(fixedData.ctaButton);
  }
  
  // Fix nested cta objects
  if (fixedData.cta && typeof fixedData.cta === 'object') {
    if (fixedData.cta.ctaButton) {
      fixedData.cta.ctaButton = fixCTAVariant(fixedData.cta.ctaButton);
    }
    if (fixedData.cta.variant) {
      fixedData.cta.variant = validateVariant(fixedData.cta.variant);
    }
  }
  
  // Fix hero section CTA buttons
  if (fixedData.hero && typeof fixedData.hero === 'object') {
    if (fixedData.hero.ctaButton) {
      fixedData.hero.ctaButton = fixCTAVariant(fixedData.hero.ctaButton);
    }
  }
  
  // Fix data.hero CTA buttons
  if (fixedData.data && fixedData.data.hero && fixedData.data.hero.ctaButton) {
    fixedData.data.hero.ctaButton = fixCTAVariant(fixedData.data.hero.ctaButton);
  }
  
  return fixedData;
};

/**
 * Gets routes organized by category for form dropdowns
 * @returns {Object} - Routes organized by category
 */
export const getRoutesByCategory = () => {
  return {
    main: [
      { value: '/', label: 'Home' },
      { value: '/about', label: 'About' },
      { value: null, label: 'Contact (Modal)' },
      { value: '/services', label: 'Services' },
      { value: '/industries', label: 'Industries' }
    ],
    solutions: [
      { value: '/payroll', label: 'Payroll Solutions' },
      { value: '/hr', label: 'HR Solutions' },
      { value: '/accounting', label: 'Accounting Solutions' }
    ],
    services: [
      { value: '/services/implementation', label: 'Implementation' },
      { value: '/services/integration', label: 'Integration' },
      { value: '/services/customization', label: 'Customization' },
      { value: '/services/training', label: 'Training' }
    ],
    industries: [
      { value: '/industries/manufacturing', label: 'Manufacturing' },
      { value: '/industries/retail', label: 'Retail' },
      { value: '/industries/healthcare', label: 'Healthcare' }
    ],
    business: [
      { value: '/pricing', label: 'Pricing' },
      { value: '/demo', label: 'Request Demo' },
      { value: '/quote', label: 'Get Quote' }
    ],
    content: [
      { value: '/blog', label: 'Blog' },
      { value: '/resources', label: 'Resources' },
      { value: '/support', label: 'Support' }
    ]
  };
};

/**
 * Validates URL format and type
 * @param {string} url - URL to validate
 * @returns {Object} - Validation result with type and info
 */
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      type: 'invalid',
      info: 'Invalid URL format'
    };
  }

  const trimmedUrl = url.trim();
  
  if (trimmedUrl.startsWith('/')) {
    return {
      isValid: true,
      type: 'internal',
      info: 'Internal route'
    };
  }
  
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    return {
      isValid: true,
      type: 'external',
      info: 'External URL'
    };
  }
  
  if (trimmedUrl.startsWith('mailto:')) {
    return {
      isValid: true,
      type: 'email',
      info: 'Email link'
    };
  }
  
  if (trimmedUrl.startsWith('tel:')) {
    return {
      isValid: true,
      type: 'tel',
      info: 'Phone link'
    };
  }
  
  return {
    isValid: false,
    type: 'relative',
    info: 'Invalid URL format'
  };
};

export default {
  validateVariant,
  getVariantClasses,
  getVariantDisplayName,
  getAvailableVariants,
  variantOptions,
  fixCTAVariant,
  fixAllCTAVariants,
  getRoutesByCategory,
  validateUrl
};