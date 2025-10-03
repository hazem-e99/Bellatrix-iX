// Training.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from '../../ContactForm';
import Modal from '../../Modal';
import HeroSection from './HeroSection';
import ProgramsSection from './ProgramsSection';
import KeyModulesSection from './KeyModulesSection';
import WhyChooseSection from './WhyChooseSection';
import TrainingModals from './TrainingModals';


const Training = () => {
    const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data/training.json');
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Video protection handlers (same as original)
    useEffect(() => {
        // ... (same video protection code)
    }, []);

    const openProgramModal = (program) => {
        setSelectedProgram(program);
        setIsProgramModalOpen(true);
    };

    const closeProgramModal = () => {
        setIsProgramModalOpen(false);
        setSelectedProgram(null);
    };

    const openContactModal = () => {
        setIsContactModalOpen(true);
        setIsProgramModalOpen(false);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    const openFeatureModal = (feature) => {
        setSelectedFeature(feature);
        setIsFeatureModalOpen(true);
    };

    const closeFeatureModal = () => {
        setIsFeatureModalOpen(false);
        setSelectedFeature(null);
    };

    const renderIcon = (iconPath, className = "w-7 h-7 text-white") => {
        if (!iconPath || typeof iconPath !== 'string') return null;
        const normalizedPath = iconPath.startsWith('M') ? iconPath.substring(1) : iconPath;
        const paths = normalizedPath.split(' M').filter(Boolean);
        
        return (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {paths.map((path, i) => (
                    <path 
                        key={i} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={`M${path}`} 
                    />
                ))}
            </svg>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                Error loading training data. Please try again later.
            </div>
        );
    }

  return (
    <div className="custom-scrollbar" style={{backgroundColor: '#001038'}}>
      {/* Hero Section */}
      <section data-theme="dark">
        <HeroSection 
          heroContent={data.heroContent} 
          backgroundVideo={data.backgroundVideo}
          ctaButton={data.ctaButton}
          renderIcon={renderIcon}
        />
      </section>

      {/* Programs Section */}
      <section data-theme="light">
        <ProgramsSection 
          programsSection={data.programsSection}
          trainingPrograms={data.trainingPrograms}
          renderIcon={renderIcon}
          openProgramModal={openProgramModal}
        />
      </section>

      {/* Key Modules Section */}
      <section data-theme="dark">
        <KeyModulesSection 
          keyModulesSection={data.keyModulesSection}
          keyModules={data.keyModules}
          renderIcon={renderIcon}
        />
      </section>

      {/* Why Choose Section */}
      <section data-theme="light">
        <WhyChooseSection 
          whyChooseSection={data.whyChooseSection}
          trainingFeatures={data.trainingFeatures}
          renderIcon={renderIcon}
          openFeatureModal={openFeatureModal}
        />
      </section>

      {/* Modals */}
      <TrainingModals
        isProgramModalOpen={isProgramModalOpen}
        selectedProgram={selectedProgram}
        closeProgramModal={closeProgramModal}
        openContactModal={openContactModal}
        isFeatureModalOpen={isFeatureModalOpen}
        selectedFeature={selectedFeature}
        closeFeatureModal={closeFeatureModal}
        isContactModalOpen={isContactModalOpen}
        closeContactModal={closeContactModal}
        renderIcon={renderIcon}
      />
    </div>
  );
};

export default Training;