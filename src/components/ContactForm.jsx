import React, { useState } from "react";
import { submitContactMessage, INDUSTRY_OPTIONS, COUNTRY_OPTIONS } from "../services/contactApi";
import { toast } from "react-hot-toast";

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
    { label: "Full Name *", type: "text", placeholder: "أحمد محمد", required: true, name: "fullName" },
    { label: "Email Address *", type: "email", placeholder: "ahmed@example.com", required: true, name: "email" },
    { label: "Phone Number", type: "tel", placeholder: "+201234567890", name: "phoneNumber" },
  ],
  companyFields = [
    { label: "Company Name", type: "text", placeholder: "شركتي للتكنولوجيا", name: "companyName" },
    { label: "Industry", type: "select", options: INDUSTRY_OPTIONS, name: "industry" },
    { label: "Country", type: "select", options: COUNTRY_OPTIONS, name: "country" },
  ],
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    industry: 0,
    country: 0,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'industry' || name === 'country' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.industry === 0) {
      toast.error('يرجى اختيار المجال الصناعي');
      return;
    }

    if (formData.country === 0) {
      toast.error('يرجى اختيار البلد');
      return;
    }

    if (formData.message.length < 10) {
      toast.error('يجب أن تكون الرسالة 10 أحرف على الأقل');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactMessage(formData);
      
      if (result?.success !== false) {
        toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          companyName: '',
          industry: 0,
          country: 0,
          message: ''
        });
        
        // Call custom onSubmit if provided
        if (onSubmit) {
          onSubmit(result);
        }
      } else {
        toast.error(result?.message || 'فشل في إرسال الرسالة');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error(error.message || 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
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
                <select 
                  name={field.name}
                  value={formData[field.name] || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 text-blue-900"
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value} className="bg-white text-blue-900">{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
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
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 mt-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition-all duration-300 resize-none text-blue-900 placeholder-gray-400"
          placeholder={messagePlaceholder}
          required
        ></textarea>
      </div>
      {/* Submit Section */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">{submitNote}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'جاري الإرسال...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default ContactForm; 