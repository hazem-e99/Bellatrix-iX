import React from "react";

const BellatrixSupportHero = () => {
  return (
    <div
      className="py-12 relative overflow-hidden animate-background-glow"
      style={{
        backgroundColor: '#001038',
        padding: "150px 0 50px",
        width: "100%",
        color: "white",
        fontSize: "15px",
        lineHeight: "24px",
        fontFamily: '"Gotham A", "Gotham B"',
        animation: 'background-glow 12s ease-in-out infinite'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-full blur-xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-white/10 via-blue-300/20 to-white/10 rounded-full blur-lg opacity-20"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
              <pattern id="supportGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#supportGrid)" />
            </svg>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1220px",
          margin: "0 auto",
          padding: "0 7.5px",
        }}
        className="relative z-10"
      >
        <div style={{ padding: "40px 15px 20px" }}>
          {/* Title */}
          <h1
            style={{
              fontWeight: "700",
              fontSize: "50px",
              lineHeight: "50px",
              textAlign: "center",
              letterSpacing: "-1px",
              margin: "0 0 13px",
            }}
            className="text-white animate-slide-up"
          >
            Oracle NetSuite Support
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              lineHeight: "30px",
              textAlign: "center",
              margin: 0,
            }}
            className="text-gray-300 animate-fade-in"
          >
            Get access to expert knowledge and ongoing NetSuite support after
            your initial go-live phase.
          </p>

          {/* CTA Button */}
          <div style={{ textAlign: "center" }}>
            <a
              href="#request-info"
              className="group relative inline-block min-w-[180px] min-h-[56px] font-bold text-sm uppercase leading-5 rounded-md px-4 py-4 mt-8 mb-0 no-underline transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-2 border-blue-500 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to an Expert
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes background-glow {
          0%, 100% { 
            background-color: #001038; 
          }
          25% { 
            background-color: #001245; 
          }
          50% { 
            background-color: #001038; 
          }
          75% { 
            background-color: #000e30; 
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-background-glow {
          animation: background-glow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BellatrixSupportHero;
