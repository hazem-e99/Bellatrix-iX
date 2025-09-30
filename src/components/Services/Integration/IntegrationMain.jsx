import React from 'react';
import HeroSection from './HeroSection';
import IntegrationTypes from './IntegrationTypes';
import BenefitsSection from './BenefitsSection';
import PopularIntegrations from './PopularIntegrations';
import CtaSection from './CtaSection';
import { integrationData } from '../../../data/integrationData';

const IntegrationMain = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
      <section data-theme="dark">
        <HeroSection title={integrationData.hero.title} subtitle={integrationData.hero.subtitle} />
      </section>

      <section data-theme="light" className="py-20 bg-white">
        <IntegrationTypes title={integrationData.integrationTypes.title} items={integrationData.integrationTypes.items} />
      </section>

      <section data-theme="light" className="py-20 bg-gray-50">
        <BenefitsSection title={integrationData.benefits.title} items={integrationData.benefits.items} />
      </section>

      <section data-theme="light" className="py-20 bg-white">
        <PopularIntegrations title={integrationData.popularIntegrations.title} platforms={integrationData.popularIntegrations.platforms} />
      </section>

      <section data-theme="dark" className="py-16 bg-blue-800 text-white text-center">
        <CtaSection 
          title={integrationData.cta.title} 
          subtitle={integrationData.cta.subtitle} 
          buttonText={integrationData.cta.buttonText} 
        />
      </section>
    </main>
  );
};

export default IntegrationMain;