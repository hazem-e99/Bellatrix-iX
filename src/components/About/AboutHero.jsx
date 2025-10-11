import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutHero = ({ data }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.hero);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "About Bellatrix",
          subtitle: "Your trusted partner in digital transformation",
          description:
            "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
          backgroundVideo: "/Videos/about-hero.mp4",
          stats: [
            { value: "500+", label: "Projects Completed" },
            { value: "15+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "200+", label: "Happy Clients" },
          ],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const heroData = data || defaultData || {
    title: "About Bellatrix",
    subtitle: "Your trusted partner in digital transformation",
    description:
      "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
    backgroundVideo: "/Videos/about-hero.mp4",
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "15+", label: "Years Experience" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "200+", label: "Happy Clients" },
    ],
  };

  // Debug logging for real-time updates
  console.log("🎯 [AboutHero] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: heroData,
    timestamp: new Date().toISOString()
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={heroData.backgroundVideo || "/Videos/about-hero.mp4"}
          type="video/mp4"
        />
      </video>
      {/* Overlay - theme-aware */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-dark)/0.8 0%, var(--color-gray-900)/0.6 50%, var(--color-cyan-900)/0.8 100%)",
          transition: "background 0.6s ease",
        }}
      ></div>
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary)/0.2, var(--color-cyan-400)/0.2)",
            transition: "background 0.6s ease",
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full blur-lg"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary-dark)/0.2, var(--color-cyan-500)/0.2)",
            transition: "background 0.6s ease",
          }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            {heroData.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 leading-relaxed max-w-4xl mx-auto font-medium">
            {heroData.subtitle}
          </p>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {heroData.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="theme-cta-button text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-cyan-600))",
              transition: "background 0.6s ease, transform 0.3s ease",
            }}
          >
            Discover Our Story
          </motion.button>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default AboutHero;
