import { useState, useEffect, useRef } from "react";
import SEO from "./SEO";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";

const Hero = ({ slides: propsSlides = [], stats: propsStats = [], data }) => {
  const videoRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // PRIORITIZE props data over default data for real-time preview
  const defaultSlides = [
    {
      title: "Strategic Business Transformation",
      subtitle: "Oracle NetSuite Consultancy",
      description:
        "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
      video: "/Videos/implementation/homepage_hero.mp4",
    },
    {
      title: "Digital Optimization Experts",
      subtitle: "Cloud Solutions Specialists",
      description:
        "Enhance productivity with our tailored implementation and consulting services.",
      video:
        "https://assets.mixkit.co/videos/preview/mixkit-team-meeting-in-a-modern-office-space-12346-large.mp4",
    },
    {
      title: "Data-Driven Decision Making",
      subtitle: "Business Intelligence Partners",
      description: "Leverage real-time analytics to transform your operations.",
      video:
        "https://assets.mixkit.co/videos/preview/mixkit-woman-analyzing-data-on-her-laptop-12347-large.mp4",
    },
  ];

  const slides = propsSlides.length > 0 ? propsSlides : (data?.slides || defaultSlides);
  const stats = propsStats.length > 0 ? propsStats : (data?.stats || []);

  // Debug logging for real-time updates
  console.log("🎯 [Hero] Component received data:", {
    hasPropsSlides: propsSlides.length > 0,
    propsSlides: propsSlides,
    hasPropsStats: propsStats.length > 0,
    propsStats: propsStats,
    hasData: !!data,
    data: data,
    finalSlides: slides,
    finalStats: stats,
    timestamp: new Date().toISOString()
  });

  // Handle video play/pause with error handling
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && isPlaying) {
        try {
          await videoRef.current.play();
        } catch (error) {
          // Handle autoplay restrictions
          if (error.name === "AbortError" || error.name === "NotAllowedError") {
            console.log(
              "Video autoplay blocked by browser - this is normal behavior"
            );
            setIsPlaying(false);
          } else {
            console.warn("Video playback error:", error);
          }
        }
      } else if (videoRef.current && !isPlaying) {
        videoRef.current.pause();
      }
    };

    playVideo();
  }, [isPlaying, currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(true);
  };

  // Handle user interaction to enable video playback
  const handleUserInteraction = async () => {
    if (!hasUserInteracted && videoRef.current) {
      setHasUserInteracted(true);
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Video playback still blocked after user interaction");
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <SEO
        title="Strategic Business Transformation | Bellatrix Oracle NetSuite Solutions"
        description="Drive business growth with Bellatrix's strategic Oracle NetSuite transformation services. Expert implementation, optimization, and data-driven solutions."
        keywords="business transformation, Oracle NetSuite implementation, digital optimization, cloud solutions, business intelligence, ERP consulting"
        ogTitle="Strategic Business Transformation | Bellatrix NetSuite Solutions"
        ogDescription="Transform your business operations with our comprehensive Oracle NetSuite solutions and expert consulting services."
        ogImage="/images/business-transformation-hero.jpg"
        twitterCard="summary_large_image"
      />

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => {
          // Attempt to play when video is loaded
          if (videoRef.current && isPlaying) {
            videoRef.current.play().catch(() => {
              // Silently handle autoplay restrictions - this is expected behavior
              console.log(
                "Hero video autoplay blocked by browser (normal behavior)"
              );
            });
          }
        }}
        onError={(e) => {
          console.log("Video loading error:", e.target.error);
        }}
      >
        <source src={slides[currentSlide].video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Content */}
      <section
        className="relative z-10 min-h-screen flex items-center justify-center cursor-pointer"
        onClick={handleUserInteraction}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleUserInteraction()}
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <article key={currentSlide} className="">
              {/* Subtitle */}
              <header className="text-center mb-4">
                <span className="inline-block text-[var(--color-white)]/90 text-sm md:text-base font-semibold letter-spacing-wider mb-2 px-4 py-2 bg-[var(--color-white)]/10 rounded-full backdrop-blur-sm border border-[var(--color-white)]/20">
                  {slides[currentSlide].subtitle}
                </span>
              </header>

              {/* Main Heading */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-[var(--color-white)]">
                  {slides[currentSlide].title}
                </h1>
              </div>

              {/* Description */}
              <div className="text-center mb-12">
                <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-text-light)] leading-relaxed max-w-4xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </div>
            </article>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Hero;
