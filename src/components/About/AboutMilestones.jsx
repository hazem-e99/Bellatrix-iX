import React from 'react';
import { motion } from 'framer-motion';

const AboutMilestones = ({ milestones }) => (
  <section className="py-20 relative overflow-hidden" style={{backgroundColor: '#001038'}}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
          <pattern id="milestonesGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#milestonesGrid)" />
        </svg>
      </div>
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Our <span className="text-cyan-400">Milestones</span>
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Key achievements and milestones that mark our journey of growth, 
          innovation, and commitment to excellence.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">{milestone.year}</div>
                <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutMilestones; 