import React from "react";

const CustomerSupport = () => {
  return (
    <div className="py-20 relative overflow-hidden" style={{backgroundColor: '#001038'}}>
      {/* Background Pattern */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            Bellatrix <span className="text-cyan-400">Customer Support</span>: When and How You Need It
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Our dedicated support team is here to ensure your success with comprehensive assistance and expert guidance.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                <img
                  alt="Bellatrix Customer Support"
                  src="https://i.pinimg.com/1200x/c4/3b/47/c43b47b28329114afa50028b00c829b8.jpg"
                  className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              For Bellatrix technical support concerning unexpected ERP
              implementation issues or keeping an eye on customizations and
              configurations, our team of Bellatrix consultants are available for
              as much or as little support as you need.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4"></div>
                <span className="leading-relaxed">
                  Always be in the loop with weekly status update calls with your
                  designated project manager.
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4"></div>
                <span className="leading-relaxed">
                  Get a peek into what is being done with access to JIRA, giving you
                  a real-time view into progress.
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4"></div>
                <span className="leading-relaxed">
                  Remain in direct communication throughout the day with your
                  designated team through Slack.
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4"></div>
                <span className="leading-relaxed">
                  Whether you prefer tickets, calls, or emails, communicating with
                  us is a breeze.
                </span>
              </li>
            </ul>

            {/* Additional Support Info */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-400/30 backdrop-blur-sm">
              <h4 className="font-bold text-cyan-300 mb-2">24/7 Support Available</h4>
              <p className="text-gray-300">
                Our support team is available around the clock to ensure your business operations run smoothly without interruption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
