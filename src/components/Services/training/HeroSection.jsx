// HeroSection.jsx
import React from 'react';

const HeroSection = ({ heroContent, renderIcon }) => {
    return (
        <div className="min-h-screen relative overflow-hidden pt-20">
            {/* Background Video and Effects */}
            <div 
                className="absolute inset-0 w-full h-full"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
                onSelectStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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
                        filter: 'brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg)',
                        animation: 'video-enhance 20s ease-in-out infinite',
                        userSelect: 'none',
                        WebkitUserSelect: 'none'
                    }}
                >
                    <source src="/trainingHeroSectionTwo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* All the video overlay effects */}
                {/* ... (keep all the existing video effects) ... */}
            </div>
            
            {/* Content */}
            <div className="relative z-30 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-6xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-slide-up">
                            <span className="inline-block animate-text-glow">{heroContent.title.split(' ')[0]}</span>{' '}
                            <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
                                {heroContent.title.split(' ')[1]}
                            </span>
                            <br />
                            <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text-reverse">
                                {heroContent.title.split(' ').slice(2).join(' ')}
                            </span>
                        </h1>
                    </div>
                    
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

export default HeroSection;