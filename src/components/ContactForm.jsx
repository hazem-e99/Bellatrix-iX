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
  onSuccess,
  onError,
}) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    industry: "Select Industry",
    country: "Select Country",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
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
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim() || null,
      companyName: form.companyName.trim() || null,
      industry: industryToEnum(form.industry),
      country: countryToEnum(form.country),
      message: form.message.trim(),
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
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
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
                  className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                  placeholder={field.placeholder}
                  required={field.required}
                  value={index === 0 ? form.fullName : index === 1 ? form.email : form.phoneNumber}
                  onChange={index === 0 ? handleChange("fullName") : index === 1 ? handleChange("email") : handleChange("phoneNumber")}
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
                  <select className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)]"
                          value={index === 0 ? form.companyName : index === 1 ? form.industry : form.country}
                          onChange={index === 0 ? handleChange("companyName") : index === 1 ? handleChange("industry") : handleChange("country")}>
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
                    className="w-full px-3 py-2 mt-1 bg-[var(--color-white)] border border-[var(--color-border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-focus)] focus:border-transparent outline-none transition-all duration-300 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                    placeholder={field.placeholder}
                    value={form.companyName}
                    onChange={handleChange("companyName")}
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
            value={form.message}
            onChange={handleChange("message")}
          ></textarea>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="mt-2 text-sm text-green-600">Message sent successfully.</p>
          )}
        </div>
        {/* Submit Section */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-primary)]">
          <p className="text-xs text-[var(--color-text-muted)]">{submitNote}</p>
          <button
            type="submit"
            className="bg-[var(--button-bg-primary)] hover:bg-[var(--button-bg-primary-hover)] text-[var(--button-text-primary)] px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-sm"
            disabled={submitting}
          >
            {submitting ? "Sending..." : submitText}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
