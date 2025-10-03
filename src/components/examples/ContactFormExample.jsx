import React from 'react';
import ContactForm from '../ContactForm';
import { toast } from 'react-hot-toast';

const ContactFormExample = () => {
  const handleContactSubmit = (result) => {
    console.log('Contact form submitted successfully:', result);
    
    // You can add additional logic here
    // For example, redirect to a thank you page
    // navigate('/thank-you');
    
    // Or show additional notifications
    toast.success('شكراً لك! سنتواصل معك خلال 24 ساعة.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          تواصل معنا
        </h1>
        <p className="text-gray-600">
          نحن هنا لمساعدتك في تحقيق أهدافك التقنية
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <ContactForm
          title="تواصل معنا"
          subtitle="نحن هنا لمساعدتك"
          contactInfoTitle="معلومات الاتصال"
          companyInfoTitle="تفاصيل الشركة"
          messageLabel="رسالتك"
          messagePlaceholder="أخبرنا عن متطلبات مشروعك أو استفساراتك..."
          submitNote="✓ استجابة خلال 24 ساعة"
          submitText="إرسال الرسالة"
          onSubmit={handleContactSubmit}
        />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          جميع البيانات محمية ومشفرة. لن نشارك معلوماتك مع أي طرف ثالث.
        </p>
      </div>
    </div>
  );
};

export default ContactFormExample;
