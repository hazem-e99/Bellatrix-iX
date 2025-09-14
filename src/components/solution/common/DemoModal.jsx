import React from 'react';

export default function DemoModal({ isOpen, onClose, images, currentIndex, onChange, fade }) {
  if (!isOpen) return null;

  const nextDemo = () => onChange((currentIndex + 1) % images.length);
  const prevDemo = () => onChange((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 hover:bg-red-100 shadow-md text-4xl text-gray-700 hover:text-red-600 font-bold transition-all duration-200 focus:outline-none border border-gray-200"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#191970]">
            <circle cx="12" cy="12" r="11" fill="none" />
            <line x1="8" y1="8" x2="16" y2="16" />
            <line x1="16" y1="8" x2="8" y2="16" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <img
            src={images[currentIndex]}
            alt={`Demo ${currentIndex + 1}`}
            className={`rounded-xl shadow-lg w-full h-96 object-cover mb-4 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxWidth: '100%', maxHeight: '420px' }}
          />
          <div className="flex gap-6 items-center justify-center mt-2">
            <button
              onClick={prevDemo}
              className="bg-blue-100 hover:bg-blue-300 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
              disabled={images.length <= 1}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.5 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-gray-700 font-semibold">{currentIndex + 1} / {images.length}</span>
            <button
              onClick={nextDemo}
              className="bg-blue-100 hover:bg-blue-300 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
              disabled={images.length <= 1}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onChange(idx)}
                className={`w-3 h-3 rounded-full border-2 ${currentIndex === idx ? 'bg-blue-700 border-blue-700' : 'bg-blue-100 border-blue-300'} transition-all`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}