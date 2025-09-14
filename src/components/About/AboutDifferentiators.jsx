import React from 'react';
import { motion } from 'framer-motion';

const AboutDifferentiators = ({ differentiators }) => (
  <section className="bg-gray-50 py-20 light-section">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          What Sets Us <span className="text-blue-600">Apart</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Our unique combination of expertise, methodology, and commitment to excellence 
          makes us the preferred choice for Oracle NetSuite implementations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {differentiators.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
            <div className="bg-blue-50 text-blue-600 font-bold py-2 px-4 rounded-full text-sm">
              {item.stats}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutDifferentiators; 