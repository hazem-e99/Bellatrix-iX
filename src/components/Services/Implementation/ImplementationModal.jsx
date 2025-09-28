// components/Implementation/ImplementationModal.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from '../../ContactForm';

const ImplementationModal = ({ isOpen, onClose, data }) => {
    const [defaultData, setDefaultData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/Implementation.json');
                const jsonData = await response.json();
                setDefaultData(jsonData.modalContent);
            } catch (error) {
                console.error('Failed to load Implementation data:', error);
                // Fallback data
                setDefaultData({
                    title: "Contact Us",
                    subtitle: "Let's discuss your project"
                });
            }
        };
        fetchData();
    }, []);

    // Use props if provided, otherwise fall back to default data
    const displayData = data && Object.keys(data).length > 0 ? data : (defaultData || {
        title: "Contact Us",
        subtitle: "Let's discuss your project"
    });
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full h-auto relative transform transition-all duration-300 scale-100 shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="rounded-t-2xl p-4 text-gray-800 relative border-b border-gray-200 bg-white">
                    <button 
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-1 text-blue-900">{displayData.title}</h3>
                        <p className="text-gray-500 text-sm">{displayData.subtitle}</p>
                    </div>
                </div>
                {/* Form Content */}
                <div className="p-6 bg-[#f7fafc]">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ImplementationModal;