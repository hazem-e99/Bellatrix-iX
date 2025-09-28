import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutCTA = ({ onOpenContactModal }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/about.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.cta);
      } catch (error) {
        console.error('Failed to load About data:', error);
        // Fallback data
        setDefaultData({
          title: "Ready to Build Something Great?",
          subtitle: "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
          description: "Contact us today to discuss how we can help you optimize your operations and drive growth.",
          buttonText: "Start Consultation"
        });
      }
    };
    fetchData();
  }, []);

  // Use default data from JSON
  const displayData = defaultData || {
    title: "Ready to Build Something Great?",
    subtitle: "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
    description: "Contact us today to discuss how we can help you optimize your operations and drive growth.",
    buttonText: "Start Consultation"
  };
  return (
  <section className="bg-gray-50 py-20 light-section">
    <div className="container mx-auto px-6">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {displayData.title}
          </h2>
          <p className="text-xl mb-8 text-gray-600 leading-relaxed">
            {displayData.subtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2">Quick Start</h4>
              <p className="text-gray-600">Get started our consultation</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2">Tailored Solutions</h4>
              <p className="text-gray-600">Custom solutions for your business</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2">Proven Results</h4>
              <p className="text-gray-600">98% client satisfaction rate</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenContactModal}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {displayData.buttonText}
          </motion.button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default AboutCTA; 