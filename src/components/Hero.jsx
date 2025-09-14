import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      title: "Strategic Business Transformation",
      subtitle: "Oracle NetSuite Consultancy",
      description: "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
      video: "/Videos/implementation/homepage_hero.mp4"
    },
    {
      title: "Digital Optimization Experts",
      subtitle: "Cloud Solutions Specialists",
      description: "Enhance productivity with our tailored implementation and consulting services.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-team-meeting-in-a-modern-office-space-12346-large.mp4"
    },
    {
      title: "Data-Driven Decision Making",
      subtitle: "Business Intelligence Partners",
      description: "Leverage real-time analytics to transform your operations.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-analyzing-data-on-her-laptop-12347-large.mp4"
    }
  ];

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay 
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={slides[currentSlide].video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-6">
        <AnimatePresence mode='wait'>
            <div
            key={currentSlide}
              className=""
            >
              {/* Subtitle */}
              <div className="text-center mb-4">
                <span className="inline-block text-white/90 text-sm md:text-base font-semibold letter-spacing-wider mb-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              {slides[currentSlide].subtitle}
                </span>
              </div>

              {/* Main Heading */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                  <span className="inline-block">
              {slides[currentSlide].title}
                  </span>
                </h1>
              </div>
              
              {/* Description */}
              <div className="text-center mb-12">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              {slides[currentSlide].description}
                </p>
              </div>
            </div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero;