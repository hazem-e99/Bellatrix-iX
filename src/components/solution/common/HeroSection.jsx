import React, { useState, useEffect } from 'react';

const PayrollHero = ({ variant = "hr" }) => {
  // State to handle video loading errors
  const [videoError, setVideoError] = useState(false);
  
  // Reset error state when variant changes
  useEffect(() => {
    setVideoError(false);
  }, [variant]);

  // Common styles and classes
  const commonClasses = {
    section: "w-full min-h-screen py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden",
    overlay: "absolute inset-0 bg-black/40 z-0",
    container: "max-w-7xl mx-auto px-4 relative z-10",
    heading: "text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl",
    paragraph: "text-xl md:text-2xl text-white mb-8 drop-shadow-lg"
  };

  // Render Design A (Image Background)
  if (variant === "hr") {
    return (
      <section className={`${commonClasses.section} bg-blue-900`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/payrollFinal.jpeg" 
            alt="Payroll Dashboard Interface"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Light Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className={commonClasses.container}>
          <div className="text-center">
            <div className="flex flex-col items-center justify-center space-y-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] text-white drop-shadow-lg text-center" 
                  style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)'}}>
                <span className="block mb-2">Transform Your</span>
                <span className="block">Payroll Process</span>
              </h1>
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium drop-shadow-md text-center" 
                   style={{textShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)'}}>
                  Streamline operations with our intelligent, automated payroll system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render Design B (Video Background)
  if (variant === "payroll") {
    return (
      <section className={`${commonClasses.section} bg-gradient-to-br from-[#191970] via-black to-blue-700`}>
        {/* Background Video with fallback */}
        <div className="absolute inset-0 w-full h-full">
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              onError={() => setVideoError(true)}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[8s] ease-in-out pointer-events-none"
              style={{
                filter: 'brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg)',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <source src="/Videos/hrVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#191970] via-black to-blue-700"></div>
          )}
        </div>
        
        {/* Overlay */}
        <div className={commonClasses.overlay}></div>
        
        <div className={commonClasses.container}>
          <div className="accent-bar mx-auto mb-4" aria-hidden="true"></div>
          <h1 className={commonClasses.heading}>Modern HR, Payroll & People Management</h1>
          <p className={commonClasses.paragraph}>Automate HR, empower employees, and stay compliant—on one secure platform.</p>
        </div>
      </section>
    );
  }

  // Fallback if an invalid variant is provided
  return (
    <section className={`${commonClasses.section} bg-blue-900`}>
      <div className={commonClasses.container}>
        <h1 className={commonClasses.heading}>Hero Section</h1>
        <p className={commonClasses.paragraph}>Invalid variant selected</p>
      </div>
    </section>
  );
};

export default PayrollHero;