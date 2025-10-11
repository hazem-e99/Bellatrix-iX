import React, { useState, useEffect } from "react";
import SEO from "./SEO";

const ContactForm = ({
  title = "Contact Us",
  subtitle = "Let's discuss your project",
  contactInfoTitle = "Contact Information",
  companyInfoTitle = "Company Details",
  messageLabel = "Message",
  messagePlaceholder = "Tell us about your project requirements...",
  submitNote = "✓ 24hr response",
  submitText = "Send Message",
  contactFields = [
    {
      label: "Full Name *",
      type: "text",
      placeholder: "John Doe",
      required: true,
      name: "fullName",
    },
    {
      label: "Email Address *",
      type: "email",
      placeholder: "john@company.com",
      required: true,
      name: "email",
    },
    { 
      label: "Phone Number", 
      type: "tel", 
      placeholder: "+1 (555) 123-4567",
      name: "phone",
    },
  ],
  companyFields = [
    { 
      label: "Company Name", 
      type: "text", 
      placeholder: "Your Company Inc.",
      name: "companyName",
    },
    {
      label: "Industry *",
      type: "select",
      name: "industry",
      required: true,
      options: [
        "Select Industry",
        "Manufacturing",
        "Retail & E-commerce",
        "Healthcare",
        "Finance & Banking",
        "Technology",
        "Professional Services",
        "Non-Profit",
        "Other",
      ],
    },
    {
      label: "Country *",
      type: "select",
      name: "country",
      required: true,
      options: [
        "Select Country",
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "United Arab Emirates",
        "Saudi Arabia",
        "Egypt",
        "Other",
      ],
    },
  ],
  onSubmit,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    industry: "Select Industry",
    country: "Select Country",
    message: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Full name is required";
        } else if (!/^[a-zA-Z\s]{2,}$/.test(value.trim()) || value.trim().split(" ").length < 2) {
          newErrors.fullName = "Please enter your full name (at least two words, letters only)";
        } else {
          delete newErrors.fullName;
        }
        break;
        
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email address is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
        
      case "phone":
        if (value.trim()) {
          // International phone number validation (supports various formats)
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
          if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
            newErrors.phone = "Please enter a valid phone number";
          } else {
            delete newErrors.phone;
          }
        } else {
          delete newErrors.phone;
        }
        break;
        
      case "companyName":
        if (value.trim() && value.length > 100) {
          newErrors.companyName = "Company name must be 100 characters or less";
        } else {
          delete newErrors.companyName;
        }
        break;
        
      case "industry":
        if (!value || value === "Select Industry") {
          newErrors.industry = "Please select an industry";
        } else {
          delete newErrors.industry;
        }
        break;
        
      case "country":
        if (!value || value === "Select Country") {
          newErrors.country = "Please select a country";
        } else {
          delete newErrors.country;
        }
        break;
        
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 20) {
          newErrors.message = "Message must be at least 20 characters long";
        } else if (value.length > 500) {
          newErrors.message = "Message must be 500 characters or less";
        } else {
          delete newErrors.message;
        }
        break;
        
      default:
        break;
    }
    
    return newErrors;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    const newErrors = validateField(name, value);
    setErrors(newErrors);
  };

  // Handle field blur (mark as touched)
  const handleFieldBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const requiredFields = ["fullName", "email", "industry", "country", "message"];
    const hasErrors = Object.keys(errors).length > 0;
    const hasRequiredValues = requiredFields.every(field => {
      const value = formData[field];
      return value && value.trim() && value !== "Select Industry" && value !== "Select Country";
    });
    const messageValid = formData.message.trim().length >= 20 && formData.message.length <= 500;
    
    return !hasErrors && hasRequiredValues && messageValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldErrors = validateField(key, formData[key]);
      Object.assign(allErrors, fieldErrors);
    });
    setErrors(allErrors);
    
    // If there are errors, focus on the first error field
    if (Object.keys(allErrors).length > 0) {
      const firstErrorField = Object.keys(allErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    
    // If form is valid, submit
    if (isFormValid()) {
      setIsSubmitting(true);
      try {
        if (onSubmit) {
          await onSubmit(formData);
        } else {
          // Default submission behavior
          console.log("Form submitted:", formData);
          alert("Thank you for your message! We'll get back to you within 24 hours.");
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            companyName: "",
            industry: "Select Industry",
            country: "Select Country",
            message: "",
          });
          setTouched({});
          setErrors({});
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("There was an error submitting your message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Character count for message
  const messageCharCount = formData.message.length;
  const messageMaxLength = 500;
  return (
    <>
      <SEO
        title="Contact Bellatrix | Oracle NetSuite Consultation Request Form"
        description="Contact Bellatrix for Oracle NetSuite consulting services. Fill out our form to request consultation, implementation, or training services."
        keywords="contact form, NetSuite consultation request, Oracle implementation quote, business consultation form, get in touch, request services"
        ogTitle="Request NetSuite Consultation | Contact Bellatrix Form"
        ogDescription="Start your Oracle NetSuite transformation journey. Contact Bellatrix for expert consultation and implementation services."
        ogImage="/images/contact-consultation-form.jpg"
        twitterCard="summary_large_image"
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Main Fields in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Contact Info */}
          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-[var(--color-primary-dark)] mb-2 border-b border-[var(--color-border-primary)] pb-1">
              {contactInfoTitle}
            </legend>
            {contactFields.map((field, index) => (
              <div key={index}>
                <label className="text-sm font-medium text-[var(--color-text-primary)]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  className={`w-full px-3 py-2 mt-1 bg-[var(--color-white)] border rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] ${
                    errors[field.name] && touched[field.name]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[var(--color-border-primary)]"
                  }`}
                  placeholder={field.placeholder}
                  required={field.required}
                />
                {errors[field.name] && touched[field.name] && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </fieldset>
          {/* Right Column - Company Info */}
          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-[var(--color-primary-dark)] mb-2 border-b border-[var(--color-border-primary)] pb-1">
              {companyInfoTitle}
            </legend>
            {companyFields.map((field, index) => (
              <div key={index}>
                <label className="text-sm font-medium text-[var(--color-text-primary)]">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select 
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={`w-full px-3 py-2 mt-1 bg-[var(--color-white)] border rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] ${
                      errors[field.name] && touched[field.name]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[var(--color-border-primary)]"
                    }`}
                  >
                    {field.options.map((option, i) => (
                      <option
                        key={i}
                        value={option}
                        className="bg-[var(--color-white)] text-[var(--color-text-primary)]"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={`w-full px-3 py-2 mt-1 bg-[var(--color-white)] border rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] ${
                      errors[field.name] && touched[field.name]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[var(--color-border-primary)]"
                    }`}
                    placeholder={field.placeholder}
                    maxLength={field.name === "companyName" ? 100 : undefined}
                  />
                )}
                {errors[field.name] && touched[field.name] && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </fieldset>
        </div>
        {/* Message Section - Full Width */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-primary)]">
            {messageLabel} *
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            className={`w-full px-3 py-2 mt-1 bg-[var(--color-white)] border rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 resize-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] ${
              errors.message && touched.message
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--color-border-primary)]"
            }`}
            placeholder={messagePlaceholder}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && touched.message && (
              <p className="text-red-500 text-xs flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.message}
              </p>
            )}
            <p className={`text-xs ml-auto ${
              messageCharCount > messageMaxLength * 0.9 
                ? "text-orange-500" 
                : messageCharCount > messageMaxLength 
                ? "text-red-500" 
                : "text-[var(--color-text-muted)]"
            }`}>
              {messageCharCount}/{messageMaxLength} characters
              {formData.message.trim().length < 20 && formData.message.trim() && (
                <span className="ml-2 text-orange-500">
                  (minimum 20 required)
                </span>
              )}
            </p>
          </div>
        </div>
        {/* Submit Section */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-primary)]">
          <p className="text-xs text-[var(--color-text-muted)]">{submitNote}</p>
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${
              !isFormValid() || isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[var(--button-bg-primary)] hover:bg-[var(--button-bg-primary-hover)] text-[var(--button-text-primary)] hover:shadow-md transform hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
