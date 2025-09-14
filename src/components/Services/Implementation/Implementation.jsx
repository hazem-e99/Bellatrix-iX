// components/Implementation/index.js
import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ProcessSection from './ProcessSection';
import WhyChooseSection from './WhyChooseSection';
import PricingSection from './PricingSection';
import CtaSection from './CtaSection';
import ImplementationModal from './ImplementationModal';
import { usePageData } from '../../../hooks/useJsonServerData.jsx';

const Implementation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Fetch data from JSON Server
    const { data, isLoading: loading } = usePageData('Implementation');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
    }

    return (
        <>
            {/* Hero Section - Special case (dark with video background) */}
            <HeroSection data={data.heroSection} openModal={openModal} />

            {/* Process Section - Light Theme */}
            <section data-theme="light">
                <ProcessSection data={data.processSection} />
            </section>

            {/* Why Choose Section - Dark Theme */}
            <section data-theme="dark">
                <WhyChooseSection data={data.whyChooseSection} />
            </section>

            {/* Pricing Section - Light Theme */}
            <section data-theme="light">
                <PricingSection data={data.pricingSection} />
            </section>

            {/* CTA Section - Dark Theme */}
            <section data-theme="dark">
                <CtaSection data={data.ctaSection} openModal={openModal} />
            </section>

            {/* Modal */}
            <ImplementationModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                data={data.modalContent} 
            />
        </>
    );
};

export default Implementation;