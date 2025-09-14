import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import IntegrationTypes from './IntegrationTypes';
import BenefitsSection from './BenefitsSection';
import PopularIntegrations from './PopularIntegrations';
import CtaSection from './CtaSection';

const IntegrationMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
      <section data-theme="dark">
        <HeroSection title={data.hero.title} subtitle={data.hero.subtitle} />
      </section>

      <section data-theme="light" className="py-20 bg-white">
        <IntegrationTypes title={data.integrationTypes.title} items={data.integrationTypes.items} />
      </section>

      <section data-theme="light" className="py-20 bg-gray-50">
        <BenefitsSection title={data.benefits.title} items={data.benefits.items} />
      </section>

      <section data-theme="light" className="py-20 bg-white">
        <PopularIntegrations title={data.popularIntegrations.title} platforms={data.popularIntegrations.platforms} />
      </section>

      <section data-theme="dark" className="py-16 bg-blue-800 text-white text-center">
        <CtaSection 
          title={data.cta.title} 
          subtitle={data.cta.subtitle} 
          buttonText={data.cta.buttonText} 
        />
      </section>
    </main>
  );
};

export default IntegrationMain;