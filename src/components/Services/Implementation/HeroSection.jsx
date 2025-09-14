// components/Implementation/HeroSection.jsx
import React from 'react';

const HeroSection = ({ data, openModal }) => {
    return (
        <div className="min-h-screen relative overflow-hidden pt-20">
            {/* Background Video */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={data.backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Creative Overlay with Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/5 to-white/8 animate-gradient-shift"></div>
            
            {/* Floating Geometric Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-xl animate-float-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-white/65 to-white/45 rounded-full blur-lg animate-float-reverse"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-white/70 to-white/50 rounded-full blur-md animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-r from-white/60 to-white/40 rounded-full blur-lg animate-bounce-gentle"></div>
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-grid-pattern animate-grid-flow"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-6xl mx-auto px-6">
                    {/* Main Heading with Text Animation */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-slide-up">
                            <span className="inline-block animate-text-glow">{data.titleParts[0]}</span>{' '}
                            <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text">
                                {data.titleParts[1]}
                            </span>{' '}
                            <span className="inline-block animate-text-glow delay-300">{data.titleParts[2]}</span>
                            <br />
                            <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text-reverse">
                                {data.titleParts[3]}
                            </span>
                        </h1>
                    </div>
                    
                    {/* Creative Description with Typewriter Effect */}
                    <div className="text-center mb-12">
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                            {data.description.split('digital experiences')[0]}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent font-semibold">
                                    digital experiences
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white animate-underline-expand"></span>
                            </span>
                            {data.description.split('digital experiences')[1]}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <button 
                            onClick={openModal}
                            className="group relative px-10 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up-delay border-2 border-white"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={data.ctaButton.icon} />
                                </svg>
                                {data.ctaButton.text}
                            </span>
                            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;