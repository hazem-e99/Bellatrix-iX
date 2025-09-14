import React from 'react';

const Modal = ({ isOpen, onClose, icon, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative shadow-2xl border-0 overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-t-2xl sm:rounded-t-3xl p-3 sm:p-4 md:p-5 text-white relative flex items-center gap-2 sm:gap-3">
          {icon && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center shadow">
              <div className="text-white text-xl sm:text-2xl">{icon}</div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1 leading-tight">{title}</h3>
            {subtitle && <p className="text-gray-200 text-xs sm:text-sm">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-white/80 hover:text-white transition-colors p-1 sm:p-2 hover:bg-white/10 rounded-full"
            aria-label="Close"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white rounded-b-2xl sm:rounded-b-3xl">{children}</div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #1d4ed8);
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #1e40af);
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default Modal; 