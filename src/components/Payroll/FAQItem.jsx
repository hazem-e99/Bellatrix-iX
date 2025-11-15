import React, { useState } from "react";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-600/50 shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group backdrop-blur-sm">
      {/* Creative Background Elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:opacity-40 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-6 translate-y-6 group-hover:opacity-40 transition-opacity duration-500"></div>

      <button
        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset relative z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white pr-4 group-hover:text-blue-300 transition-all duration-300">
            {question}
          </h3>
          <div
            className={`flex-shrink-0 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg
              className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 relative z-10">
          <div className="border-t border-gray-600/50 pt-4">
            <p className="text-gray-300 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FAQItem;

