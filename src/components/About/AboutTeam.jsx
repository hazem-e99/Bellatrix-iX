import React from 'react';

const AboutTeam = ({ teamMembers, cardsPerScreen, slideOffset, isHovering, setIsHovering }) => {
  // Check if carousel navigation is needed
  const needsCarousel = teamMembers.length > cardsPerScreen;

  return (
    <section className="bg-gray-50 py-20 light-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our diverse team of experts brings together decades of experience in enterprise 
            software, business consulting, and digital transformation.
          </p>
        </div>
        <div className="relative overflow-hidden">
          {/* Team Cards Container */}
          <div className="max-w-7xl mx-auto">
            <div 
              className="flex gap-8 transition-transform duration-1000 ease-linear"
              style={{ 
                transform: `translateX(${slideOffset}%)`,
                width: `${Math.ceil(teamMembers.length / cardsPerScreen) * 100}%`
              }}
            >
              {/* Duplicate team members for seamless loop */}
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div
                  key={`member-${index}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex-shrink-0 min-w-[300px] max-w-[350px]"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="space-y-1">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mr-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam; 