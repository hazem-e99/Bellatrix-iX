// TrainingProgramCard.jsx
import React from "react";
import SEO from "../../SEO";

const TrainingProgramCard = ({ program, index, renderIcon, onClick }) => {
  return (
    <>
      <SEO
        title={`Oracle NetSuite Training Program | ${
          program.title || "ERP Training Course"
        }`}
        description={`${
          program.title || "Oracle NetSuite training program"
        }: ${(
          program.shortDescription || "Professional ERP training course"
        ).substring(0, 120)}... Expert-led Oracle NetSuite education.`}
        keywords={`NetSuite training program, ${
          program.title || "ERP training"
        }, Oracle training course, NetSuite education, ERP certification program`}
        ogTitle={`NetSuite Training Program - ${
          program.title || "Oracle ERP Education"
        }`}
        ogDescription={`Enroll in ${
          program.title || "Oracle NetSuite training program"
        }. ${(program.shortDescription || "").substring(
          0,
          100
        )}... Professional ERP education.`}
        ogImage="/images/netsuite-training-program.jpg"
      />
      <article
        onClick={onClick}
        className="text-center p-5 bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group transform hover:scale-105"
      >
        <div
          className={`w-14 h-14 bg-gradient-to-br ${
            index === 0
              ? "from-blue-400 to-blue-600"
              : index === 1
              ? "from-blue-500 to-blue-700"
              : index === 2
              ? "from-blue-600 to-blue-800"
              : "from-blue-800 to-blue-900"
          } rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          role="img"
          aria-label={`${program.title || "Training program"} icon`}
        >
          {renderIcon(program.icon)}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {program.title || "Oracle NetSuite Training Program"}
        </h3>
        <p className="text-sm text-gray-600">
          {program.shortDescription ||
            "Professional Oracle NetSuite training course"}
        </p>
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-blue-600 font-medium">
            Click to learn more
          </span>
        </div>
      </article>
    </>
  );
};

export default TrainingProgramCard;
