import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const HeroSection = ({ data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.hero);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData({
          title: "Modern HR, Payroll & People Management",
          subtitle:
            "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
          bgVideo: "/Videos/hrVideo.mp4",
          bgColor: "bg-gradient-to-br from-[#191970] via-black to-blue-700",
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const heroData = data.hero || defaultData || {
    title: "Modern HR, Payroll & People Management",
    subtitle:
      "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
    bgVideo: "/Videos/hrVideo.mp4",
    bgColor: "bg-gradient-to-br from-[#191970] via-black to-blue-700",
  };

  // Debug logging for real-time updates
  console.log("🎯 [HRHeroSection] Component received data:", {
    hasPropsData: !!(data && data.hero),
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: heroData,
    timestamp: new Date().toISOString()
  });

  return (
    <>
      <SEO
        title={`Oracle NetSuite HR Solutions | ${
          heroData.title || "Modern HR Platform"
        }`}
        description={`${
          heroData.subtitle ||
          "Transform your HR operations with Oracle NetSuite comprehensive HR platform"
        } - Employee management, payroll automation, and compliance in one solution.`}
        keywords="Oracle NetSuite HR platform, modern HR management, employee management system, HR automation, ERP human resources, payroll management"
        ogTitle={`NetSuite HR Platform - ${
          heroData.title || "Modern HR Management"
        }`}
        ogDescription={`${(
          heroData.subtitle ||
          "Oracle NetSuite HR platform for modern workforce management"
        ).substring(0, 120)}... Professional ERP HR solutions.`}
        ogImage="/images/netsuite-hr-hero.jpg"
      />
      <header className="w-full min-h-screen bg-gradient-to-br from-[var(--color-brand-midnight)] via-black to-[var(--color-primary)] py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[8s] ease-in-out pointer-events-none"
            style={{
              filter:
                "brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg)",
              animation: "video-enhance 20s ease-in-out infinite",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <source src={heroData.bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10 animate-fade-in-up">
          <div className="accent-bar mx-auto mb-4" aria-hidden="true"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-text-inverse)] mb-4 tracking-tight drop-shadow-2xl">
            {heroData.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-inverse)] mb-8 drop-shadow-lg">
            {heroData.subtitle}
          </p>
        </div>
      </header>
    </>
  );
};

export default HeroSection;
