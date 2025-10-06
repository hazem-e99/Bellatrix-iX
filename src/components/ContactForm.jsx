import React from "react";
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
    },
    {
      label: "Email Address *",
      type: "email",
      placeholder: "john@company.com",
      required: true,
    },
    { label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567" },
  ],
  companyFields = [
    { label: "Company Name", type: "text", placeholder: "Your Company Inc." },
    {
      label: "Industry",
      type: "select",
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
      label: "Country",
      type: "select",
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

      <form className="space-y-4" onSubmit={onSubmit}>
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
                  className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                  placeholder={field.placeholder}
                  required={field.required}
                />
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
                  <select className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)]">
                    {field.options.map((option, i) => (
                      <option
                        key={i}
                        value={option.toLowerCase().replace(/\s+/g, "-")}
                        className="bg-[var(--color-white)] text-[var(--color-text-primary)]"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </fieldset>
        </div>
        {/* Message Section - Full Width */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-primary)]">
            {messageLabel}
          </label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 resize-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
            placeholder={messagePlaceholder}
          ></textarea>
        </div>
        {/* Submit Section */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-primary)]">
          <p className="text-xs text-[var(--color-text-muted)]">{submitNote}</p>
          <button
            type="submit"
            className="bg-[var(--button-bg-primary)] hover:bg-[var(--button-bg-primary-hover)] text-[var(--button-text-primary)] px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-sm"
          >
            {submitText}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
