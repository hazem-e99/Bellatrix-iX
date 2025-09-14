import React, { useState, useEffect } from 'react';
import ContactForm from "../ContactForm";

const Implementation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data/Implementation.json');
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
    }

    // Services data for navbar
    const services = [
      {
        title: "Strategic Consultation",
        link: "#"
      },
      {
        title: "Implementation",
        link: "/Implementation"
      },
      {
        title: "Training",
        link: "/Training"
      },
      {
        title: "Tailored Customization",
        link: "#"
      },
      {
        title: "Seamless Integration",
        link: "#"
      }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="min-h-screen relative overflow-hidden pt-20">
                {/* Background Video */}
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={data.heroSection.backgroundVideo} type="video/mp4" />
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
                                <span className="inline-block animate-text-glow">{data.heroSection.titleParts[0]}</span>{' '}
                                <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text">
                                    {data.heroSection.titleParts[1]}
                                </span>{' '}
                                <span className="inline-block animate-text-glow delay-300">{data.heroSection.titleParts[2]}</span>
                                <br />
                                <span className="inline-block bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent animate-gradient-text-reverse">
                                    {data.heroSection.titleParts[3]}
                                </span>
                            </h1>
                        </div>
                        
                        {/* Creative Description with Typewriter Effect */}
                        <div className="text-center mb-12">
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                                {data.heroSection.description.split('digital experiences')[0]}
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent font-semibold">
                                        digital experiences
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white animate-underline-expand"></span>
                                </span>
                                {data.heroSection.description.split('digital experiences')[1]}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={data.heroSection.ctaButton.icon} />
                                    </svg>
                                    {data.heroSection.ctaButton.text}
                                </span>
                                <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator"></div>
                    </div>
                </div> */}
            </div>

            {/* Our Implementation Process Section */}
            <div className="bg-gray-50 py-12 light-section">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            {data.processSection.title} <span className="text-blue-600">Process</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            {data.processSection.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Process Animation - Left Side */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative group max-w-lg">
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
                                            src={data.processSection.image} 
                                            alt="Implementation Process - Strategic NetSuite Solutions" 
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
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Proven Process</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Process Content - Right Side */}
                        <div className="flex-1">
                            {/* Process Steps - Timeline Layout */}
                            <div className="relative">
                                {/* Central Timeline Line */}
                                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-300 via-blue-500 via-blue-700 to-blue-900"></div>
                                
                                <div className="space-y-6">
                                    {data.processSection.steps.map((step, index) => {
                                        const bgColors = ['bg-blue-300', 'bg-blue-500', 'bg-blue-700', 'bg-blue-900'];
                                        return (
                                            <div key={index} className="relative flex items-start group">
                                                <div className={`flex-shrink-0 w-12 h-12 ${bgColors[index]} rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-all duration-300`}>
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                                                    </svg>
                                                </div>
                                                <div className="ml-6 flex-1">
                                                    <div className="bg-white p-4 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg">
                                                        <div className="flex items-center mb-2">
                                                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mr-3">Step {step.number}</span>
                                                            <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{step.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-6">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                                    {data.processSection.ctaButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Bellatrix Section */}
            <div className="py-12 relative overflow-hidden animate-background-glow" style={{
                backgroundColor: '#001038',
                animation: 'background-glow 12s ease-in-out infinite'
            }}>
                {/* Ultra Creative Decorative Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* ... (keep all the existing background SVG elements) ... */}
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {data.whyChooseSection.title}
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            {data.whyChooseSection.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Features Content - Left Side */}
                        <div className="flex-1">
                            <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 rounded-3xl p-8 border border-gray-600/50 shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group backdrop-blur-sm">
                                {/* Creative Background Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-10 translate-y-10 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-15 transform -translate-x-8 -translate-y-8 group-hover:opacity-30 transition-opacity duration-500"></div>
                                
                                <div className="relative z-10 space-y-4">
                                    {data.whyChooseSection.features.map((feature, index) => {
                                        const bgGradients = [
                                            'from-blue-700 to-blue-900',
                                            'from-blue-800 to-blue-950',
                                            'from-blue-900 to-slate-900',
                                            'from-blue-600 to-blue-800'
                                        ];
                                        return (
                                            <div key={index} className="group/item hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-transparent rounded-xl p-3 transition-all duration-300 hover:transform hover:translate-x-2">
                                                <div className="flex items-center">
                                                    <div className="relative mr-3">
                                                        <div className={`w-7 h-7 bg-gradient-to-br ${bgGradients[index]} rounded-lg flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-all duration-300`}>
                                                            <span className="text-white font-bold text-xs">{feature.number}</span>
                                                        </div>
                                                        <div className={`absolute -inset-1 bg-gradient-to-r ${bgGradients[index]} rounded-lg blur opacity-30 group-hover/item:opacity-60 transition-opacity duration-300`}></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-white mb-1 group-hover/item:text-blue-300 transition-all duration-300">{feature.title}</h3>
                                                        <p className="text-sm text-gray-300">{feature.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Image - Right Side */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative group">
                                {/* Glowing background effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-blue-300/30 to-white/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                
                                {/* Image container with enhanced styling */}
                                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                                    <img 
                                        src={data.whyChooseSection.image} 
                                        alt="Why Choose Bellatrix - Digital Innovation & Technology" 
                                        className="w-full h-auto lg:max-w-md rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                                    />
                                    
                                    {/* Overlay gradient for better contrast */}
                                    <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
                                    
                                    {/* Floating elements for tech feel */}
                                    <div className="absolute top-2 right-2 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-300/80 rounded-full animate-ping"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 py-12 light-section">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            Implementation <span className="text-blue-600">Pricing</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            {data.pricingSection.subtitle}
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {data.pricingSection.plans.map((plan, index) => (
                            <div key={index} className={`bg-white rounded-2xl p-8 border-2 ${plan.isPopular ? 'border-blue-500 hover:border-blue-600 transform scale-105' : 'border-gray-200 hover:border-blue-300'} transition-all duration-300 relative`}>
                                {plan.isPopular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                                    </div>
                                )}
                                
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>
                                    <div className="mb-6">
                                        <span className={`text-4xl font-bold ${plan.isPopular ? 'text-blue-600' : 'text-gray-800'}`}>{plan.price}</span>
                                        <span className="text-gray-600 ml-2">{plan.priceNote}</span>
                                    </div>
                                </div>
                                
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <button className={`w-full ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white py-3 rounded-lg font-semibold transition-all duration-300`}>
                                    {plan.ctaText}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">{data.pricingSection.additionalInfo.note}</p>
                        <p className="text-sm text-gray-500">{data.pricingSection.additionalInfo.contactText.split('Contact our team')[0]}<span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact our team</span>{data.pricingSection.additionalInfo.contactText.split('Contact our team')[1]}</p>
                    </div>
                </div>
            </div>

            {/* Ready for Implementation CTA Section */}
            <div className="relative py-16 overflow-hidden" style={{backgroundColor: '#001038'}}>
                {/* Simple Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
                            <pattern id="simpleGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#simpleGrid)" />
                        </svg>
                    </div>
                </div>

                {/* Subtle Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            {data.ctaSection.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                            {data.ctaSection.subtitle}
                        </p>
                        
                        {/* CTA Button */}
                        <div className="mb-16">
                            <button 
                                onClick={openModal}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                                {data.ctaSection.ctaButton}
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.ctaSection.features.map((feature, index) => {
                                const bgColors = ['bg-blue-600', 'bg-blue-700', 'bg-blue-800'];
                                return (
                                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                        <div className={`w-12 h-12 ${bgColors[index]} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                        <p className="text-gray-300 text-sm">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full h-auto relative transform transition-all duration-300 scale-100 shadow-2xl border border-gray-200">
                        {/* Header */}
                        <div className="rounded-t-2xl p-4 text-gray-800 relative border-b border-gray-200 bg-white">
                            <button 
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-1 text-blue-900">{data.modalContent.title}</h3>
                                <p className="text-gray-500 text-sm">{data.modalContent.subtitle}</p>
                            </div>
                        </div>
                        {/* Form Content */}
                        <div className="p-6 bg-[#f7fafc]">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            )}

            {/* Custom CSS for Creative Animations */}
            <style jsx>{`
                /* ... (keep all the existing CSS animations) ... */
            `}</style>
        </>
    );
}

export default Implementation;