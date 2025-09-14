import React from "react";

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
    { label: "Full Name *", type: "text", placeholder: "John Doe", required: true },
    { label: "Email Address *", type: "email", placeholder: "john@company.com", required: true },
    { label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567" },
  ],
  companyFields = [
    { label: "Company Name", type: "text", placeholder: "Your Company Inc." },
    { label: "Industry", type: "select", options: [
      "Select Industry", "Manufacturing", "Retail & E-commerce", "Healthcare", "Finance & Banking", "Technology", "Professional Services", "Non-Profit", "Other"
    ] },
    { label: "Country", type: "select", options: [
      "Select Country", "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "United Arab Emirates", "Saudi Arabia", "Egypt", "Other"
    ] },
  ],
  onSubmit,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {/* Main Fields in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column - Contact Info */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-blue-800 mb-2 border-b border-gray-200 pb-1">{contactInfoTitle}</h4>
          {contactFields.map((field, index) => (
            <div key={index}>
              <label className="text-sm font-medium text-blue-900">{field.label}</label>
              <input
                type={field.type}
                className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 text-blue-900 placeholder-gray-400"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>
        {/* Right Column - Company Info */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-blue-800 mb-2 border-b border-gray-200 pb-1">{companyInfoTitle}</h4>
          {companyFields.map((field, index) => (
            <div key={index}>
              <label className="text-sm font-medium text-blue-900">{field.label}</label>
              {field.type === "select" ? (
                <select className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 text-blue-900">
                  {field.options.map((option, i) => (
                    <option key={i} value={option.toLowerCase().replace(/\s+/g, "-")} className="bg-white text-blue-900">{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 text-blue-900 placeholder-gray-400"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Message Section - Full Width */}
      <div>
        <label className="text-sm font-medium text-blue-900">{messageLabel}</label>
        <textarea
          rows="3"
          className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 resize-none text-blue-900 placeholder-gray-400"
          placeholder={messagePlaceholder}
        ></textarea>
      </div>
      {/* Submit Section */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">{submitNote}</p>
        <button
          type="submit"
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-sm"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default ContactForm; 