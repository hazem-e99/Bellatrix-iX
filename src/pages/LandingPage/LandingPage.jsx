import SEO from "../../components/SEO";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import Industries from "../../components/Industries";
import { usePageData } from "../../hooks/useJsonServerData.jsx";
import "./LandingPage.css";

function LandingPage() {
  const { data, isLoading: loading, error } = usePageData("home");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-background-dark)] text-[var(--color-white)]">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-background-dark)] text-[var(--color-error)]">
        <div className="text-2xl font-bold">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background-dark)] text-[var(--color-white)]">
      <SEO
        title="Bellatrix - Oracle NetSuite Consulting & Implementation Services"
        description="Transform your business with Bellatrix's expert Oracle NetSuite consulting, implementation, and training services. Streamline operations and drive growth."
        keywords="Oracle NetSuite, NetSuite consulting, ERP implementation, business transformation, cloud solutions, NetSuite training, enterprise software"
        ogTitle="Bellatrix - Oracle NetSuite Consulting & Implementation Services"
        ogDescription="Expert Oracle NetSuite consulting and implementation services. Streamline your business operations with our comprehensive cloud solutions and training programs."
        ogImage="/images/bellatrix-netsuite-consulting.jpg"
        twitterCard="summary_large_image"
        canonicalUrl="https://bellatrix.com"
      />

      {/* Hero Section */}
      {data?.hero && <Hero slides={data.hero.slides} stats={data.hero.stats} />}

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
