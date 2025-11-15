import React from "react";
import Modal from "../Modal";

const FeatureDetailsModal = ({
  isOpen,
  onClose,
  feature,
  renderIcon,
  onContactClick,
}) => {
  if (!feature) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={renderIcon(feature.icon)}
      title={feature.title}
      subtitle={feature.shortDescription}
    >
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">
          Detailed Overview
        </h4>
        <p className="text-gray-700 leading-relaxed">
          {feature.detailedDescription}
        </p>
      </div>
      {/* Benefits & Features */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">Key Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {feature.benefits &&
            feature.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed text-sm">
                  {benefit}
                </span>
              </div>
            ))}
        </div>
      </div>
      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={onContactClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Contact Us to Learn More
        </button>
      </div>
    </Modal>
  );
};

export default FeatureDetailsModal;

