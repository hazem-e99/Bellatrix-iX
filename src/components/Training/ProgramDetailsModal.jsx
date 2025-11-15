import React from "react";
import Modal from "../Modal";

const ProgramDetailsModal = ({
  isOpen,
  onClose,
  program,
  renderIcon,
  onContactClick,
}) => {
  if (!program) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={renderIcon(program.icon)}
      title={program.title}
      subtitle={program.shortDescription}
    >
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">
          Program Overview
        </h4>
        <p className="text-gray-700 leading-relaxed">
          {program.longDescription}
        </p>
      </div>
      {/* Program Features */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">
          What You'll Learn
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {program.features &&
            program.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed text-sm">
                  {feature}
                </span>
              </div>
            ))}
        </div>
      </div>
      {/* Training Details */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
        <h4 className="text-base font-bold text-gray-800 mb-3">
          Training Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h5 className="font-semibold text-gray-800 mb-1 text-xs">
              Duration
            </h5>
            <p className="text-xs text-blue-400 font-bold">2-5 Days Intensive</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h5 className="font-semibold text-gray-800 mb-1 text-xs">Format</h5>
            <p className="text-xs text-blue-400 font-bold">
              In-Person / Virtual
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h5 className="font-semibold text-gray-800 mb-1 text-xs">
              Certificate
            </h5>
            <p className="text-xs text-blue-400 font-bold">
              Completion Certificate
            </p>
          </div>
        </div>
      </div>
      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={onContactClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Contact Us for This Program
        </button>
      </div>
    </Modal>
  );
};

export default ProgramDetailsModal;

