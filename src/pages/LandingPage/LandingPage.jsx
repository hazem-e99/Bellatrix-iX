import Hero from '../../components/Hero';
import Services from '../../components/Services';
import Testimonials from '../../components/Testimonials';
import Industries from '../../components/Industries';
import { usePageData } from '../../hooks/useJsonServerData.jsx';
import './LandingPage.css';

function LandingPage() {
  const { data, isLoading: loading, error } = usePageData('home');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <div className="text-2xl font-bold">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      {data?.hero && (
        <Hero 
          slides={data.hero.slides} 
          stats={data.hero.stats} 
        />
      )}
      
      {/* Services Section */}
      {data?.services && (
        <Services 
          services={data.services.services}
          sectionHeader={data.services.sectionHeader}
          viewAllButton={data.services.viewAllButton}
        />
      )}
      
      {/* Testimonials Section */}
      {data?.testimonials && (
        <Testimonials 
          testimonials={data.testimonials.testimonials}
          sectionHeader={data.testimonials.sectionHeader}
          ctaButton={data.testimonials.ctaButton}
        />
      )}
      
      {/* Industries Section */}
      {data?.industries && (
        <Industries 
          industries={data.industries.industries}
          sectionHeader={data.industries.sectionHeader}
          styles={data.industries.styles}
        />
      )}
    </div>
  );
}

export default LandingPage;