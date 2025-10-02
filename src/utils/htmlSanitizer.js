/**
 * HTML Sanitization Utility
 * Provides safe HTML rendering for React components
 */

/**
 * Sanitizes HTML content by escaping dangerous characters
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  // Basic sanitization - escape HTML characters
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Prepares HTML content for React's dangerouslySetInnerHTML
 * @param {string} html - The HTML string to prepare
 * @returns {object} - Object with __html property for dangerouslySetInnerHTML
 */
export const renderHTML = (html) => {
  if (!html) return { __html: '' };
  
  // For now, we'll use basic sanitization
  // In production, consider using DOMPurify for more robust sanitization
  const sanitized = sanitizeHTML(html);
  
  return { __html: sanitized };
};

/**
 * Safely renders HTML content with basic sanitization
 * This is a simpler version that allows basic HTML tags like <span>, <strong>, <em>
 * @param {string} html - The HTML string to render
 * @returns {object} - Object with __html property for dangerouslySetInnerHTML
 */
export const renderSafeHTML = (html) => {
  if (!html) return { __html: '' };
  
  // Allow basic safe HTML tags
  const allowedTags = ['span', 'strong', 'em', 'b', 'i', 'u', 'br'];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g;
  
  let sanitized = html;
  
  // Remove any tags that aren't in our allowed list
  sanitized = sanitized.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      return match; // Keep allowed tags
    }
    return ''; // Remove disallowed tags
  });
  
  return { __html: sanitized };
};

/**
 * Checks if a string contains HTML tags
 * @param {string} text - The text to check
 * @returns {boolean} - True if HTML tags are present
 */
export const containsHTML = (text) => {
  if (!text) return false;
  return /<[^>]*>/g.test(text);
};

/**
 * Renders text content, using HTML rendering if HTML tags are detected
 * @param {string} content - The content to render
 * @returns {object} - Object with __html property for dangerouslySetInnerHTML, or null for plain text
 */
export const smartRender = (content) => {
  if (!content) return null;
  
  if (containsHTML(content)) {
    return renderSafeHTML(content);
  }
  
  return null; // Return null to indicate plain text should be used
};
