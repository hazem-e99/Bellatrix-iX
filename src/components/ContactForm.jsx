import React, { useState } from "react";
import SEO from "./SEO";
import { postJson } from "../lib/api";

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
  onSuccess,
  onError,
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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const messageMaxLength = 500;
  const messageCharCount = formData.message.length;
  const isSubmitting = submitting;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleFieldBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    validateField(name, formData[name]);
  };
  
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'industry':
        if (!value || value === 'Select Industry') error = 'Please select an industry';
        break;
      case 'country':
        if (!value || value === 'Select Country') error = 'Please select a country';
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.industry && formData.industry !== 'Select Industry' &&
      formData.country && formData.country !== 'Select Country' &&
      formData.message.trim() && formData.message.trim().length >= 10
    );
  };

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const industryToEnum = (label) => {
    switch (label) {
      case "Manufacturing": return 1;
      case "Retail & E-commerce": return 2;
      case "Healthcare": return 3;
      case "Finance & Banking": return 4;
      case "Technology": return 5;
      case "Professional Services": return 6;
      case "Non-Profit": return 7;
      case "Other": return 8;
      default: return 0; // SelectIndustry
    }
  };

  const countryToEnum = (label) => {
    // Minimal subset mapping; backend accepts many values per swagger. Extend as needed.
    const map = {
      "Select Country": 0,
      "United States": 3898,
      "Canada": 3386,
      "United Kingdom": 3895,
      "Australia": 3194,
      "Germany": 3413,
      "France": 3406,
      "United Arab Emirates": 3890,
      "Saudi Arabia": 3760,
      "Egypt": 3358,
      "Other": 999,
    };
    return map[label] ?? 999;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (onSubmit) return onSubmit(e);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim() || null,
      companyName: formData.companyName.trim() || null,
      industry: industryToEnum(formData.industry),
      country: countryToEnum(formData.country),
      message: formData.message.trim(),
    };

    if (!payload.fullName || !payload.email || !payload.message || payload.message.length < 10 || payload.industry === 0) {
      setError("Please fill required fields and select industry. Message must be at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);
      await postJson("/ContactMessages/submit", payload);
      setSuccess(true);
      // Show global toast if available
      if (typeof window !== "undefined" && typeof window.showUpdateNotification === "function") {
        window.showUpdateNotification("Message sent successfully.", "success");
      }
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        industry: "Select Industry",
        country: "Select Country",
        message: "",
      });
    } catch (err) {
      setError(err?.message || "Failed to submit. Please try again.");
      if (typeof window !== "undefined" && typeof window.showUpdateNotification === "function") {
        window.showUpdateNotification("Failed to send message.", "error");
      }
      if (typeof onError === "function") {
        onError(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

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
                  value={index === 0 ? formData.fullName : index === 1 ? formData.email : formData.phone}
                  onChange={index === 0 ? handleChange("fullName") : index === 1 ? handleChange("email") : handleChange("phoneNumber")}
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
                    value={formData.companyName}
                    onChange={handleChange("companyName")}
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
