// TrainingModals.jsx
import React from 'react';
import Modal from '../../Modal';
import ContactForm from '../../ContactForm';

const TrainingModals = ({
    isProgramModalOpen,
    selectedProgram,
    closeProgramModal,
    openContactModal,
    isFeatureModalOpen,
    selectedFeature,
    closeFeatureModal,
    isContactModalOpen,
    closeContactModal,
    renderIcon,
    onClose
}) => {
    return (
        <>
            {/* Program Details Modal */}
            <Modal
                isOpen={isProgramModalOpen && selectedProgram}
                onClose={closeProgramModal}
                icon={renderIcon(selectedProgram?.icon)}
                title={selectedProgram?.title}
                subtitle={selectedProgram?.shortDescription}
            >
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Program Overview</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {selectedProgram?.longDescription}
                    </p>
                </div>
                
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">What You'll Learn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProgram?.features && selectedProgram.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
                    <h4 className="text-base font-bold text-gray-800 mb-3">Training Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* ... (keep training details content) ... */}
                    </div>
                </div>
                
                <div className="text-center">
                    <button 
                        onClick={openContactModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        Contact Us for This Program
                    </button>
                </div>
            </Modal>

            {/* Feature Details Modal */}
            <Modal
                isOpen={isFeatureModalOpen && selectedFeature}
                onClose={closeFeatureModal}
                icon={renderIcon(selectedFeature?.icon)}
                title={selectedFeature?.title}
                subtitle={selectedFeature?.shortDescription}
            >
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Detailed Overview</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {selectedFeature?.detailedDescription}
                    </p>
                </div>
                
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">Key Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedFeature?.benefits && selectedFeature.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 leading-relaxed text-sm">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
                    <h4 className="text-base font-bold text-gray-800 mb-3">Key Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* ... (keep statistics content) ... */}
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        onClick={openContactModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        Get More Information
                    </button>
                    <button 
                        onClick={closeFeatureModal}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Contact Modal */}
            <Modal
                isOpen={isContactModalOpen}
                onClose={closeContactModal}
                title="Contact Us"
                subtitle="Let's discuss your project needs"
            >
                <div className="p-2">
                    <ContactForm onSuccess={onClose} />
                </div>
            </Modal>
        </>
    );
};

export default TrainingModals;