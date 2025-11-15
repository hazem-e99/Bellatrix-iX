import React from "react";

const TrainingHeroSection = ({ heroContent, renderIcon }) => {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      {/* Background Video with Enhanced Effects */}
      <div
        className="absolute inset-0 w-full h-full"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
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
          <source src="/trainingHeroSectionTwo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Invisible overlay for additional protection */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            zIndex: 1,
          }}
        />
      </div>

      {/* Video Enhancement Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-400/15 z-5 animate-video-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-6 animate-video-glow"></div>

      {/* Animated Video Overlays */}
      <div className="absolute inset-0 z-15">
        {/* Moving Light Rays Across Video */}
        <div
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse transform -skew-y-12"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse transform skew-y-6"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-pulse transform -skew-y-3"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse transform skew-y-9"
          style={{ animationDelay: "6s" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse transform skew-y-6"
          style={{ animationDelay: "8s" }}
        ></div>

        {/* Corner Light Effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full animate-pulse"></div>
        <div
          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/15 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-blue-500/18 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-white/12 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "9s" }}
        ></div>

        {/* Dynamic Light Sweeps */}
        <div className="absolute inset-0 w-full h-8 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent top-1/3 animate-light-sweep"></div>
        <div
          className="absolute inset-0 w-full h-6 bg-gradient-to-r from-transparent via-white/30 to-transparent top-2/3 animate-light-sweep"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Diagonal Sweeping Effects */}
        <div className="absolute inset-0 w-96 h-2 bg-gradient-to-r from-transparent via-blue-500/35 to-transparent animate-diagonal-sweep"></div>
        <div
          className="absolute inset-0 w-80 h-1.5 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-diagonal-sweep"
          style={{ animationDelay: "7s" }}
        ></div>

        {/* Radial Pulsing Centers */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-blue-400/15 to-transparent rounded-full animate-radial-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-radial from-white/10 to-transparent rounded-full animate-radial-pulse"
          style={{ animationDelay: "5s" }}
        ></div>

        {/* Floating Video Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/80 rounded-full animate-float-slow shadow-lg shadow-blue-400/60"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-white/70 rounded-full animate-float-medium shadow-lg shadow-white/50"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-blue-300/90 rounded-full animate-float-fast shadow-lg shadow-blue-300/70"></div>
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-white/60 rounded-full animate-bounce-gentle shadow-lg shadow-white/40"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-blue-500/95 rounded-full animate-pulse-slow shadow-lg shadow-blue-500/80"></div>
        <div className="absolute top-1/3 right-16 w-2 h-2 bg-white/85 rounded-full animate-float-reverse shadow-lg shadow-white/60"></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/35 to-blue-800/45 z-20"></div>

      {/* Blue and White Lighting Effects */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Ambient Blue Lights */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-32 w-80 h-80 bg-blue-400/30 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-blue-300/28 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Floating Light Particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/80 rounded-full animate-float-slow shadow-lg shadow-blue-400/70"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/90 rounded-full animate-float-reverse shadow-lg shadow-white/60"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-blue-500/75 rounded-full animate-pulse-slow shadow-lg shadow-blue-500/60"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300/95 rounded-full animate-bounce-gentle shadow-lg shadow-blue-300/70"></div>

        {/* Enhanced Light Rays */}
        <div className="absolute top-10 left-10 w-1 h-32 bg-gradient-to-b from-blue-400/70 to-transparent transform rotate-45 animate-pulse"></div>
        <div
          className="absolute top-20 right-16 w-1 h-28 bg-gradient-to-b from-white/60 to-transparent transform -rotate-45 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-16 w-1 h-24 bg-gradient-to-t from-blue-500/65 to-transparent transform rotate-12 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-16 right-10 w-1 h-20 bg-gradient-to-t from-white/55 to-transparent transform -rotate-12 animate-pulse"
          style={{ animationDelay: "0.8s" }}
        ></div>

        {/* Enhanced Blue Glow Effects */}
        <div
          className="absolute top-1/2 left-10 w-40 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/2 right-10 w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"
          style={{ animationDelay: "1.8s" }}
        ></div>

        {/* Floating Orbs with Different Animations */}
        <div className="absolute top-16 right-1/3 w-6 h-6 bg-blue-400/80 rounded-full animate-float-medium shadow-2xl shadow-blue-400/80"></div>
        <div className="absolute bottom-24 left-1/4 w-8 h-8 bg-white/70 rounded-full animate-float-fast shadow-2xl shadow-white/60"></div>
        <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-blue-300/90 rounded-full animate-float-slow shadow-xl shadow-blue-300/80"></div>

        {/* Pulsing Light Rings */}
        <div className="absolute top-1/3 left-1/2 w-24 h-24 border border-blue-400/50 rounded-full animate-ping"></div>
        <div
          className="absolute bottom-1/3 right-1/2 w-32 h-32 border border-white/35 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Diagonal Light Streaks */}
        <div
          className="absolute top-32 left-1/3 w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform rotate-45 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-36 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -rotate-45 animate-pulse"
          style={{ animationDelay: "2.2s" }}
        ></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-white/65 to-white/45 rounded-full blur-lg animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-white/70 to-white/50 rounded-full blur-md animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-lg animate-bounce-gentle"></div>
      </div>

      {/* Enhanced Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-25 z-16">
        <div className="w-full h-full bg-grid-pattern animate-grid-flow"></div>
        {/* Additional Moving Grid Layers */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
                                linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
                            `,
            backgroundSize: "30px 30px",
            animation: "grid-flow 25s linear infinite reverse",
          }}
        ></div>

        {/* Hexagonal Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
                                radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                            `,
            backgroundSize: "40px 40px",
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          {/* Main Heading with Text Animation */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-slide-up">
              <span className="inline-block animate-text-glow">
                {heroContent.title.split(" ")[0]}
              </span>{" "}
              <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
                {heroContent.title.split(" ")[1]}
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text-reverse">
                {heroContent.title.split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </div>

          {/* Creative Description with Typewriter Effect */}
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto animate-fade-in">
              {heroContent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default TrainingHeroSection;

