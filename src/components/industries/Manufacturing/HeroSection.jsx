import React from 'react';
import Button from '../../UI/Button';
import { motion } from 'framer-motion'; // Add this import

const HeroSection = (props) => {
  console.log('🏭 [ManufacturingHero] All Props:', props);
  
  // Handle multiple data structure formats
  const ctaButton = props.ctaButton || props.data?.ctaButton;
  const title = props.title || props.data?.title;
  const subtitle = props.subtitle || props.data?.subtitle;
  const description = props.description || props.data?.description;
  const backgroundImage = props.backgroundImage || props.data?.backgroundImage;
  const backgroundVideo = props.backgroundVideo || props.data?.backgroundVideo;
  
  console.log('🏭 [ManufacturingHero] Resolved CTA:', ctaButton);
  console.log('🏭 [ManufacturingHero] CTA Variant:', ctaButton?.variant);
  console.log('🏭 [ManufacturingHero] Data structure analysis:', {
    hasDataProp: !!props.data,
    hasFlatProps: !!(props.title || props.subtitle),
    hasCtaButton: !!ctaButton,
    ctaButtonVariant: ctaButton?.variant,
    ctaButtonType: typeof ctaButton?.variant
  });

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
      variant: "primary"
    }
  };

  console.log('🏭 [ManufacturingHero] Final data:', finalData);
  console.log('🔴 [ManufacturingHero] CTA Button:', finalData.ctaButton);
  console.log('🔴 [ManufacturingHero] CTA Variant:', finalData.ctaButton?.variant);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${finalData.backgroundImage})`
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
                    if (finalData.ctaButton.link.startsWith('http')) {
                      window.open(finalData.ctaButton.link, '_blank');
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
    </div>
  );
};

export default HeroSection;