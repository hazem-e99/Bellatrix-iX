import React from "react";

const HeroSection = ({ title, subtitle }) => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#191970] via-black to-blue-700 py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;