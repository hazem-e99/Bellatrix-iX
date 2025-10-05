import React from "react";
import SEO from "../../SEO";

const CtaSection = ({ 
  title, 
  description, 
  features, 
  buttonText, 
  openContactModal 
}) => {
  return (
    <>
      <SEO 
        title="Start Oracle NetSuite Consulting | Expert ERP Implementation & Support"
        description="Ready to transform your business with Oracle NetSuite? Contact our expert consultants for comprehensive ERP implementation, customization, and ongoing support services."
        keywords="start NetSuite consulting, Oracle ERP consultation, NetSuite implementation contact, ERP consulting services, Oracle NetSuite experts, business transformation"
        ogTitle="Start NetSuite Consulting - Oracle ERP Expert Implementation"
        ogDescription="Begin your Oracle NetSuite transformation journey with expert consulting services. Professional ERP implementation and customization for business success."
        ogImage="/images/netsuite-consulting-contact.jpg"
      />
      <section className="container mx-auto px-6">
      <article className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xl">
        <header className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-xl mb-8 leading-relaxed text-gray-600">
            {description}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div className="text-center" key={index}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label={`${feature.title} icon`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={openContactModal}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
          aria-label="Start Oracle NetSuite Consulting Process"
        >
          {buttonText}
        </button>
      </article>
    </section>
    </>
  );
};

export default CtaSection;