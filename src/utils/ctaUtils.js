/**
 * Utility functions for CTA button detection and conversion
 */

// Common CTA button text patterns
export const CTA_PATTERNS = {
  getStarted: /^(get started|start now|begin|launch|start)/i,
  contact: /^(contact|reach out|get in touch|connect)/i,
  request: /^(request|ask for|inquire|schedule)/i,
  demo: /^(demo|show me|see how|trial)/i,
  quote: /^(quote|estimate|pricing|cost)/i,
  learn: /^(learn more|find out|discover|explore)/i,
  book: /^(book|schedule|reserve|appoint)/i,
  download: /^(download|get|obtain|acquire)/i,
  subscribe: /^(subscribe|join|sign up|register)/i,
  buy: /^(buy|purchase|order|shop)/i
};

// Default modal configurations for different CTA types
export const DEFAULT_MODAL_CONFIGS = {
  getStarted: {
    title: "Get Started Today",
    subtitle: "Let's discuss your project requirements and get you started",
    icon: "🚀"
  },
  contact: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible",
    icon: "📧"
  },
  request: {
    title: "Request Information",
    subtitle: "Tell us what you need and we'll provide you with the information",
    icon: "ℹ️"
  },
  demo: {
    title: "Request a Demo",
    subtitle: "See our solutions in action with a personalized demonstration",
    icon: "🎬"
  },
  quote: {
    title: "Get a Quote",
    subtitle: "Get a customized quote for your specific requirements",
    icon: "💰"
  },
  learn: {
    title: "Learn More",
    subtitle: "Get detailed information about our services and solutions",
    icon: "📚"
  },
  book: {
    title: "Book a Meeting",
    subtitle: "Schedule a time to discuss your needs with our experts",
    icon: "📅"
  },
  download: {
    title: "Download Resources",
    subtitle: "Get access to our resources and documentation",
    icon: "⬇️"
  },
  subscribe: {
    title: "Subscribe",
    subtitle: "Join our community and stay updated with the latest news",
    icon: "📢"
  },
  buy: {
    title: "Purchase",
    subtitle: "Complete your purchase and start using our solutions",
    icon: "🛒"
  },
  default: {
    title: "Contact Us",
    subtitle: "Let's discuss your requirements",
    icon: "📧"
  }
};

/**
 * Detects the type of CTA based on button text
 * @param {string} text - The button text
 * @returns {string} - The detected CTA type
 */
export const detectCTAType = (text) => {
  if (!text) return 'default';
  
  for (const [type, pattern] of Object.entries(CTA_PATTERNS)) {
    if (pattern.test(text)) {
      return type;
    }
  }
  
  return 'default';
};

/**
 * Gets the appropriate modal configuration for a CTA type
 * @param {string} ctaType - The CTA type
 * @param {object} customConfig - Custom configuration to override defaults
 * @returns {object} - The modal configuration
 */
export const getModalConfig = (ctaType, customConfig = {}) => {
  const defaultConfig = DEFAULT_MODAL_CONFIGS[ctaType] || DEFAULT_MODAL_CONFIGS.default;
  return {
    ...defaultConfig,
    ...customConfig
  };
};

/**
 * Automatically generates modal configuration based on button text
 * @param {string} buttonText - The button text
 * @param {object} customConfig - Custom configuration to override defaults
 * @returns {object} - The modal configuration
 */
export const autoGenerateModalConfig = (buttonText, customConfig = {}) => {
  const ctaType = detectCTAType(buttonText);
  return getModalConfig(ctaType, customConfig);
};

/**
 * Checks if a button should be treated as a CTA
 * @param {object} props - Button props
 * @returns {boolean} - Whether the button should be a CTA
 */
export const isCTAButton = (props) => {
  const { children, className, onClick, href } = props;
  
  // If it has an href, it's likely a navigation link, not a CTA
  if (href) return false;
  
  // If it has a custom onClick that doesn't prevent default, it might be a CTA
  if (onClick && typeof onClick === 'function') {
    // Check if the onClick is just opening a modal (common pattern)
    const onClickString = onClick.toString();
    if (onClickString.includes('modal') || onClickString.includes('open')) {
      return true;
    }
  }
  
  // Check button text for CTA patterns
  if (children) {
    const text = typeof children === 'string' ? children : children.toString();
    return Object.values(CTA_PATTERNS).some(pattern => pattern.test(text));
  }
  
  // Check className for CTA indicators
  if (className) {
    const ctaClassPatterns = [
      /cta/i,
      /contact.*modal/i,
      /button.*primary/i,
      /get.*started/i,
      /request.*demo/i
    ];
    return ctaClassPatterns.some(pattern => pattern.test(className));
  }
  
  return false;
};
