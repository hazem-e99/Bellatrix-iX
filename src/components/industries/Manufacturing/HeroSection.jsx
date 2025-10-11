import React from "react";
import SEO from "../../SEO";
import Button from "../../UI/Button";
import { motion } from "framer-motion";

const HeroSection = (props) => {
  // PRIORITIZE props data over default data for real-time preview
  const ctaButton = props.ctaButton || props.data?.ctaButton;
  const title = props.title || props.data?.title;
  const subtitle = props.subtitle || props.data?.subtitle;
  const description = props.description || props.data?.description;
  const backgroundImage = props.backgroundImage || props.data?.backgroundImage;
  const backgroundVideo = props.backgroundVideo || props.data?.backgroundVideo;

  // Use form data directly with fallbacks
  const finalData = {
    title: title || "Manufacturing Solutions",
    subtitle: subtitle || "Streamline your manufacturing operations",
    description: description || "Comprehensive NetSuite solutions for manufacturing businesses",
    backgroundImage: backgroundImage || "/images/manufacturing-hero.jpg",
    backgroundVideo: backgroundVideo || "",
    ctaButton: ctaButton || {
      text: "Learn More",
      link: "/manufacturing",
      variant: "primary",
    },
  };

  // Debug logging for real-time updates
  console.log("🎯 [ManufacturingHeroSection] Component received data:", {
    hasPropsData: !!(props.title || props.subtitle || props.data),
    props: props,
    finalData: finalData,
    timestamp: new Date().toISOString()
  });

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <SEO
        title="Oracle NetSuite Manufacturing ERP Solutions | Transform Your Production"
        description="Streamline manufacturing operations with Oracle NetSuite ERP. Expert manufacturing consulting for production planning, inventory control, and operational efficiency."
        keywords="Oracle NetSuite manufacturing, manufacturing ERP, production management, NetSuite manufacturing solutions, manufacturing software, ERP consulting"
        ogTitle="Oracle NetSuite Manufacturing ERP Solutions | Professional Manufacturing Platform"
        ogDescription="Professional Oracle NetSuite manufacturing platform for comprehensive production management and operational excellence."
        ogImage="/images/manufacturing-hero.jpg"
      />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${finalData.backgroundImage})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/80 to-cyan-900/90"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            {finalData.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-6 font-semibold">
            {finalData.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
            {finalData.description}
          </p>

          {/* CTA Button with proper variant passing */}
          {finalData.ctaButton && (
            <div className="flex justify-center">
              <Button
                variant={finalData.ctaButton.variant || "primary"}
                size="lg"
                className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl"
                onClick={() => {
                  if (finalData.ctaButton.link) {
                    if (finalData.ctaButton.link.startsWith("http")) {
                      window.open(finalData.ctaButton.link, "_blank");
                    } else {
                      window.location.href = finalData.ctaButton.link;
                    }
                  }
                }}
              >
                {finalData.ctaButton.text}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
