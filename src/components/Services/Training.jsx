import React, { useState, useEffect } from "react";
import ContactForm from "../ContactForm";
import Modal from "../../components/Modal";
import CTAButton from "../CTAButton";
import { usePageData } from "../../hooks/useJsonServerData.jsx";
import TrainingHeroSection from "../Training/TrainingHeroSection";
import TrainingProgramsSection from "../Training/TrainingProgramsSection";
import ProgramDetailsModal from "../Training/ProgramDetailsModal";
import FeatureDetailsModal from "../Training/FeatureDetailsModal";

const Training = () => {
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Fetch data from JSON Server
  const { data, isLoading: loading } = usePageData("training");

  // Video Protection - Apply only to video elements
  useEffect(() => {
    const handleVideoContextMenu = (e) => {
      // Only prevent context menu on video elements
      if (e.target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    const handleVideoDragStart = (e) => {
      // Only prevent drag on video elements
      if (e.target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    const handleVideoSelectStart = (e) => {
      // Only prevent selection on video elements
      if (e.target.tagName === "VIDEO") {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      // Keep keyboard shortcuts disabled globally for dev tools protection
      if (e.keyCode === 123) {
        // F12
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        // Ctrl+Shift+I
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.keyCode === 85) {
        // Ctrl+U
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.keyCode === 83) {
        // Ctrl+S
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleVideoContextMenu);
    document.addEventListener("dragstart", handleVideoDragStart);
    document.addEventListener("selectstart", handleVideoSelectStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleVideoContextMenu);
      document.removeEventListener("dragstart", handleVideoDragStart);
      document.removeEventListener("selectstart", handleVideoSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openProgramModal = (program) => {
    setSelectedProgram(program);
    setIsProgramModalOpen(true);
  };

  const closeProgramModal = () => {
    setIsProgramModalOpen(false);
    setSelectedProgram(null);
  };


  const openFeatureModal = (feature) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  };

  const closeFeatureModal = () => {
    setIsFeatureModalOpen(false);
    setSelectedFeature(null);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Error loading training data. Please try again later.
      </div>
    );
  }

  // Helper function to render SVG icons
  const renderIcon = (iconPath, className = "w-7 h-7 text-white") => {
    if (!iconPath || typeof iconPath !== "string") return null;

    // Remove any leading "M" if the path already starts with "M"
    const normalizedPath = iconPath.startsWith("M")
      ? iconPath.substring(1)
      : iconPath;
    const paths = normalizedPath.split(" M").filter(Boolean);

    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {paths.map((path, i) => (
          <path
            key={i}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={`M${path}`}
          />
        ))}
      </svg>
    );
  };
  // Services data for navbar
  const services = [
    {
      title: "Strategic Consultation",
      link: "#",
    },
    {
      title: "Implementation",
      link: "/Implementation",
    },
    {
      title: "Training",
      link: "/Training",
    },
    {
      title: "Tailored Customization",
      link: "#",
    },
    {
      title: "Seamless Integration",
      link: "#",
    },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes bounceSubtle {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-3px);
                        }
                    }
                    
                    .animate-fade-in-up {
                        animation: fadeInUp 0.6s ease-out forwards;
                        opacity: 0;
                    }
                    
                    .animate-bounce-subtle {
                        animation: bounceSubtle 3s ease-in-out infinite;
                    }
                    
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-10px) rotate(2deg);
                        }
                    }
                    
                    @keyframes swing {
                        0%, 100% {
                            transform: rotate(0deg) scale(1);
                        }
                        25% {
                            transform: rotate(3deg) scale(1.02);
                        }
                        75% {
                            transform: rotate(-3deg) scale(1.02);
                        }
                    }
                    
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }
                    
                    .animate-swing {
                        animation: swing 6s ease-in-out infinite;
                    }

                    /* ... (keep all other existing animations) ... */

                    /* Custom Scrollbar Styles */
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: linear-gradient(135deg, #2563eb, #06b6d4);
                        border-radius: 10px;
                        border: 2px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(135deg, #1d4ed8, #0891b2);
                        box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-corner {
                        background: rgba(255, 255, 255, 0.1);
                    }
                    
                    /* Firefox scrollbar */
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #2563eb rgba(255, 255, 255, 0.1);
                    }
                `,
        }}
      />

      <div className="custom-scrollbar" style={{ backgroundColor: "#001038" }}>
        {/* Hero Section with Video */}
        <TrainingHeroSection
          heroContent={data.heroContent}
          renderIcon={renderIcon}
        />

        {/* Our Training Programs Section */}
        <TrainingProgramsSection
          programsSection={data.programsSection}
          trainingPrograms={data.trainingPrograms}
          renderIcon={renderIcon}
          onProgramClick={openProgramModal}
        />

        {/* Key Training Modules Section */}
        <div
          className="py-12 relative overflow-hidden animate-background-glow"
          style={{
            backgroundColor: "#001038",
          }}
        >
          {/* Creative Advanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Holographic Knowledge Web */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 animate-knowledge-flow">
              <svg viewBox="0 0 1200 800" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="holoKnowledge"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="33%"
                      style={{ stopColor: "#191970", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="66%"
                      style={{ stopColor: "#25274d", stopOpacity: 0.6 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#ffffff", stopOpacity: 0.4 }}
                    />
                  </linearGradient>
                  <filter id="holoGlow">
                    <feGaussianBlur stdDeviation="30" result="coloredBlur" />
                    <feGaussianBlur stdDeviation="20" result="coloredBlur2" />
                    <feGaussianBlur stdDeviation="10" result="coloredBlur3" />
                    <feGaussianBlur stdDeviation="5" result="coloredBlur4" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur2" />
                      <feMergeNode in="coloredBlur3" />
                      <feMergeNode in="coloredBlur4" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#holoGlow)">
                  {/* Knowledge Nodes - Brain-like Network */}
                  <circle
                    cx="150"
                    cy="200"
                    r="8"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse"
                  />
                  <circle
                    cx="300"
                    cy="150"
                    r="12"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse-delay-1"
                  />
                  <circle
                    cx="450"
                    cy="250"
                    r="6"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse-delay-2"
                  />
                  <circle
                    cx="600"
                    cy="180"
                    r="10"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse"
                  />
                  <circle
                    cx="750"
                    cy="300"
                    r="7"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse-delay-1"
                  />
                  <circle
                    cx="900"
                    cy="200"
                    r="9"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse-delay-2"
                  />
                  <circle
                    cx="1050"
                    cy="250"
                    r="5"
                    fill="url(#holoKnowledge)"
                    className="animate-brain-pulse"
                  />

                  {/* Synaptic Connections with Learning Signals */}
                  <path
                    d="M150,200 Q225,120 300,150"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal"
                  />
                  <path
                    d="M300,150 Q375,200 450,250"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal-delay-1"
                  />
                  <path
                    d="M450,250 Q525,215 600,180"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal-delay-2"
                  />
                  <path
                    d="M600,180 Q675,240 750,300"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal"
                  />
                  <path
                    d="M750,300 Q825,250 900,200"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal-delay-1"
                  />
                  <path
                    d="M900,200 Q975,225 1050,250"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="2"
                    opacity="0.8"
                    strokeDasharray="8,4"
                    className="animate-learning-signal-delay-2"
                  />

                  {/* Cross-connections for neural complexity */}
                  <path
                    d="M150,200 Q400,100 600,180"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="1"
                    opacity="0.4"
                    strokeDasharray="4,8"
                    className="animate-neural-cross"
                  />
                  <path
                    d="M300,150 Q600,350 900,200"
                    stroke="url(#holoKnowledge)"
                    strokeWidth="1"
                    opacity="0.4"
                    strokeDasharray="4,8"
                    className="animate-neural-cross-delay"
                  />
                </g>
              </svg>
            </div>

            {/* Digital Learning Constellation */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-25 animate-constellation-rotate">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#191970", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#25274d", stopOpacity: 0 }}
                    />
                  </radialGradient>
                  <filter id="starGlow">
                    <feGaussianBlur stdDeviation="15" result="coloredBlur" />
                    <feGaussianBlur stdDeviation="8" result="coloredBlur2" />
                    <feGaussianBlur stdDeviation="3" result="coloredBlur3" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur2" />
                      <feMergeNode in="coloredBlur3" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#starGlow)">
                  {/* Learning Stars */}
                  <polygon
                    points="200,50 210,80 240,80 218,98 228,128 200,110 172,128 182,98 160,80 190,80"
                    fill="url(#starGrad)"
                    className="animate-twinkle"
                  />
                  <polygon
                    points="100,150 107,170 127,170 111,182 118,202 100,190 82,202 89,182 73,170 93,170"
                    fill="url(#starGrad)"
                    className="animate-twinkle-delay-1"
                  />
                  <polygon
                    points="300,200 307,220 327,220 311,232 318,252 300,240 282,252 289,232 273,220 293,220"
                    fill="url(#starGrad)"
                    className="animate-twinkle-delay-2"
                  />
                  <polygon
                    points="150,300 157,320 177,320 161,332 168,352 150,340 132,352 139,332 123,320 143,320"
                    fill="url(#starGrad)"
                    className="animate-twinkle"
                  />
                  <polygon
                    points="320,120 325,135 340,135 328,145 333,160 320,152 307,160 312,145 300,135 315,135"
                    fill="url(#starGrad)"
                    className="animate-twinkle-delay-1"
                  />

                  {/* Constellation Lines */}
                  <line
                    x1="200"
                    y1="80"
                    x2="300"
                    y2="220"
                    stroke="url(#starGrad)"
                    strokeWidth="1.5"
                    opacity="0.6"
                    strokeDasharray="6,3"
                    className="animate-constellation-line"
                  />
                  <line
                    x1="100"
                    y1="170"
                    x2="150"
                    y2="320"
                    stroke="url(#starGrad)"
                    strokeWidth="1.5"
                    opacity="0.6"
                    strokeDasharray="6,3"
                    className="animate-constellation-line-delay"
                  />
                  <line
                    x1="300"
                    y1="220"
                    x2="320"
                    y2="135"
                    stroke="url(#starGrad)"
                    strokeWidth="1.5"
                    opacity="0.6"
                    strokeDasharray="6,3"
                    className="animate-constellation-line"
                  />
                </g>
              </svg>
            </div>

            {/* Floating Code Particles */}
            <div className="absolute bottom-1/4 left-1/6 w-80 h-80 opacity-30 animate-code-drift">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="codeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#191970", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#25274d", stopOpacity: 0.6 }}
                    />
                  </linearGradient>
                  <filter id="codeGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feGaussianBlur stdDeviation="4" result="coloredBlur2" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#codeGlow)" fill="url(#codeGrad)">
                  {/* Code Symbols */}
                  <text
                    x="50"
                    y="80"
                    fontSize="16"
                    className="animate-code-float"
                  >
                    {"{ }"}
                  </text>
                  <text
                    x="150"
                    y="120"
                    fontSize="14"
                    className="animate-code-float-delay-1"
                  >
                    {"< />"}
                  </text>
                  <text
                    x="250"
                    y="100"
                    fontSize="18"
                    className="animate-code-float-delay-2"
                  >
                    {"( )"}
                  </text>
                  <text
                    x="80"
                    y="180"
                    fontSize="12"
                    className="animate-code-float"
                  >
                    {"[ ]"}
                  </text>
                  <text
                    x="200"
                    y="220"
                    fontSize="15"
                    className="animate-code-float-delay-1"
                  >
                    {"<>"}
                  </text>
                  <text
                    x="120"
                    y="250"
                    fontSize="13"
                    className="animate-code-float-delay-2"
                  >
                    {"=/="}
                  </text>
                  <text
                    x="280"
                    y="200"
                    fontSize="16"
                    className="animate-code-float"
                  >
                    {"+"}
                  </text>
                  <text
                    x="40"
                    y="240"
                    fontSize="14"
                    className="animate-code-float-delay-1"
                  >
                    {"*"}
                  </text>
                  <text
                    x="180"
                    y="60"
                    fontSize="12"
                    className="animate-code-float-delay-2"
                  >
                    {"#"}
                  </text>
                  <text
                    x="260"
                    y="280"
                    fontSize="15"
                    className="animate-code-float"
                  >
                    {"@"}
                  </text>
                </g>
              </svg>
            </div>

            {/* Digital Matrix Rain */}
            <div className="absolute top-0 right-1/8 w-40 h-full opacity-20 animate-matrix-rain">
              <svg viewBox="0 0 120 800" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="matrixGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#191970", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#25274d", stopOpacity: 0.4 }}
                    />
                  </linearGradient>
                  <filter id="matrixGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#matrixGlow)" fill="url(#matrixGrad)">
                  <text
                    x="10"
                    y="50"
                    fontSize="12"
                    className="animate-matrix-fall"
                  >
                    1
                  </text>
                  <text
                    x="30"
                    y="100"
                    fontSize="10"
                    className="animate-matrix-fall-delay-1"
                  >
                    0
                  </text>
                  <text
                    x="50"
                    y="80"
                    fontSize="14"
                    className="animate-matrix-fall-delay-2"
                  >
                    1
                  </text>
                  <text
                    x="70"
                    y="130"
                    fontSize="11"
                    className="animate-matrix-fall"
                  >
                    0
                  </text>
                  <text
                    x="90"
                    y="90"
                    fontSize="13"
                    className="animate-matrix-fall-delay-1"
                  >
                    1
                  </text>
                  <text
                    x="15"
                    y="200"
                    fontSize="9"
                    className="animate-matrix-fall-delay-2"
                  >
                    0
                  </text>
                  <text
                    x="35"
                    y="250"
                    fontSize="12"
                    className="animate-matrix-fall"
                  >
                    1
                  </text>
                  <text
                    x="55"
                    y="220"
                    fontSize="10"
                    className="animate-matrix-fall-delay-1"
                  >
                    0
                  </text>
                  <text
                    x="75"
                    y="280"
                    fontSize="11"
                    className="animate-matrix-fall-delay-2"
                  >
                    1
                  </text>
                  <text
                    x="95"
                    y="240"
                    fontSize="13"
                    className="animate-matrix-fall"
                  >
                    0
                  </text>
                </g>
              </svg>
            </div>

            {/* Geometric Learning Patterns */}
            <div className="absolute top-1/2 left-1/8 w-64 h-64 opacity-25 animate-geometric-pulse">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="geoGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ffffff", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#191970", stopOpacity: 0.6 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#25274d", stopOpacity: 0.4 }}
                    />
                  </linearGradient>
                </defs>
                <g stroke="url(#geoGrad)" strokeWidth="2" fill="none">
                  <polygon
                    points="100,20 130,60 100,100 70,60"
                    className="animate-geo-rotate"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="40"
                    strokeDasharray="8,4"
                    className="animate-geo-rotate-reverse"
                  />
                  <rect
                    x="60"
                    y="60"
                    width="80"
                    height="80"
                    strokeDasharray="6,3"
                    className="animate-geo-scale"
                  />
                  <polygon
                    points="100,40 120,80 100,120 80,80"
                    strokeDasharray="4,6"
                    className="animate-geo-morph"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {data.keyModulesSection.title.split(" ")[0]}{" "}
                <span className="text-blue-400">
                  {data.keyModulesSection.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {data.keyModulesSection.description}
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.keyModules.map((module, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-gray-800 rounded-3xl p-6 border border-gray-600/50 shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
                >
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${
                      index % 4 === 0
                        ? "from-blue-500/30 to-cyan-500/30"
                        : index % 4 === 1
                        ? "from-blue-400/30 to-purple-500/30"
                        : index % 4 === 2
                        ? "from-blue-600/30 to-cyan-400/30"
                        : "from-blue-700/30 to-purple-600/30"
                    } rounded-full opacity-20 transform translate-x-12 -translate-y-12 group-hover:opacity-40 transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        index % 4 === 0
                          ? "from-blue-500 to-blue-600"
                          : index % 4 === 1
                          ? "from-blue-400 to-blue-500"
                          : index % 4 === 2
                          ? "from-blue-600 to-blue-700"
                          : "from-blue-700 to-blue-800"
                      } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      {renderIcon(module.icon, "w-6 h-6 text-white")}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {module.description}
                    </p>
                    <div className="text-xs text-blue-400 font-medium">
                      Duration: {module.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Our Training Section */}
        <div className="bg-gray-50 py-12 light-section">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                {data.whyChooseSection.title.split(" ")[0]}{" "}
                <span className="text-blue-600">
                  {data.whyChooseSection.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {data.whyChooseSection.description}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Features Grid - Left Side */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.trainingFeatures.map((feature, index) => (
                    <div
                      key={feature.id}
                      className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 p-8 animate-fade-in-up"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-bounce-subtle shadow-lg">
                          {renderIcon(feature.icon)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {feature.shortDescription}
                        </p>
                        <button
                          onClick={() => openFeatureModal(feature)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-300 group-hover:translate-x-1 transform cursor-pointer hover:cursor-pointer"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image - Right Side */}
              <div className="flex-1 flex justify-center">
                <div className="relative group max-w-2xl">
                  {/* Advanced Background Effects */}
                  <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                    {/* Multiple layered glows */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                    <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
                  </div>

                  {/* Professional Container with Multi-layer Design */}
                  <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                    {/* Inner glow container */}
                    <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                      <img
                        src="/images/chooese.png"
                        alt="Why Choose Our Training - Professional Development Excellence"
                        className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                      />

                      {/* Professional overlay effects */}
                      <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent via-transparent to-cyan-400/5 pointer-events-none"></div>
                      <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Advanced Floating Tech Elements */}
                    <div className="absolute top-3 right-3">
                      <div className="relative">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6">
                      <div className="relative">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                        <div className="absolute -inset-1 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-6">
                      <div className="relative">
                        <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse shadow-sm"></div>
                        <div className="absolute -inset-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                      </div>
                    </div>

                    <div className="absolute top-1/4 left-8">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-70"></div>
                    </div>

                    <div className="absolute bottom-1/3 right-12">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-white to-blue-200 rounded-full animate-pulse opacity-80"></div>
                    </div>

                    {/* Professional corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>

                    {/* Data visualization lines */}
                    <div className="absolute top-4 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                    <div className="absolute bottom-8 right-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
                    <div className="absolute top-1/3 right-2 w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
                  </div>

                  {/* Professional Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2">
                      {renderIcon(
                        "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                        "w-4 h-4"
                      )}
                      <span>Excellence Training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Details Modal */}
        <ProgramDetailsModal
          isOpen={isProgramModalOpen && selectedProgram}
          onClose={closeProgramModal}
          program={selectedProgram}
          renderIcon={renderIcon}
          onContactClick={openContactModal}
        />
        {/* Feature Details Modal */}
        <FeatureDetailsModal
          isOpen={isFeatureModalOpen && selectedFeature}
          onClose={closeFeatureModal}
          feature={selectedFeature}
          renderIcon={renderIcon}
          onContactClick={openContactModal}
        />
        {/* Contact Modal */}
        <Modal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
          title="Contact Us"
          subtitle="Let's discuss your project needs"
        >
          <div className="p-2">
            <ContactForm onSuccess={closeContactModal} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Training;
