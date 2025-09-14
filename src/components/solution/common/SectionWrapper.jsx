import React from 'react';

export default function SectionWrapper({ children, className = '', bgColor = 'bg-white' }) {
  return (
    <section className={`py-20 ${bgColor} ${className}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        {children}
      </div>
    </section>
  );
}