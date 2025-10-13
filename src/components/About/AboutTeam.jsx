import React, { useState, useEffect } from "react";

const AboutTeam = ({
  teamMembers = [],
  data = {},
  cardsPerScreen = 3,
  slideOffset = 0,
  isHovering = false,
  setIsHovering = () => {},
}) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.team);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "Meet Our Team",
          description:
            "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
          members: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = data ||
    defaultData || {
      title: "Meet Our Team",
      description:
        "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
      members: [],
    };

  // Debug logging for real-time updates
  console.log("🎯 [AboutTeam] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    teamMembersFromProps: teamMembers,
    timestamp: new Date().toISOString(),
  });

  // Default team members if none provided
  const defaultTeamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio:
        "15+ years of experience in enterprise software and business transformation.",
      image: "/images/team/sarah-johnson.jpg",
      expertise: ["Leadership", "Strategy", "Enterprise Solutions"],
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Expert in cloud architecture and scalable software solutions.",
      image: "/images/team/michael-chen.jpg",
      expertise: ["Cloud Architecture", "Software Engineering", "DevOps"],
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Customer Success",
      bio:
        "Passionate about helping businesses achieve their digital transformation goals.",
      image: "/images/team/emily-rodriguez.jpg",
      expertise: [
        "Customer Success",
        "Business Consulting",
        "Project Management",
      ],
    },
  ];

  // Use provided team members or default ones
  const displayTeamMembers =
    Array.isArray(teamMembers) && teamMembers.length > 0
      ? teamMembers
      : Array.isArray(displayData.members) && displayData.members.length > 0
      ? displayData.members
      : defaultTeamMembers;

  // Check if carousel navigation is needed
  const needsCarousel = displayTeamMembers.length > cardsPerScreen;

  return (
    <section className="bg-gray-50 py-20 light-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              color: "var(--color-text-primary)",
              transition: "color 0.6s ease",
            }}
          >
            {displayData.title}
          </h2>
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              transition: "color 0.6s ease",
            }}
          >
            {displayData.description}
          </p>
        </div>
        <div className="relative overflow-hidden">
          {/* Team Cards Container */}
          <div className="max-w-7xl mx-auto">
            <div
              className="flex gap-8 transition-transform duration-1000 ease-linear"
              style={{
                transform: `translateX(${slideOffset}%)`,
                width: `${
                  Math.ceil(displayTeamMembers.length / cardsPerScreen) * 100
                }%`,
              }}
            >
              {/* Duplicate team members for seamless loop */}
              {[...displayTeamMembers, ...displayTeamMembers].map(
                (member, index) => (
                  <div
                    key={`member-${index}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex-shrink-0 min-w-[300px] max-w-[350px]"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image || "/images/team/default-avatar.jpg"}
                        alt={member.name || "Team Member"}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{
                          color: "var(--color-text-primary)",
                          transition: "color 0.6s ease",
                        }}
                      >
                        {member.name || "Team Member"}
                      </h3>
                      <p
                        className="font-medium mb-3"
                        style={{
                          color: "var(--color-primary)",
                          transition: "color 0.6s ease",
                        }}
                      >
                        {member.role || "Team Member"}
                      </p>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{
                          color: "var(--color-text-secondary)",
                          transition: "color 0.6s ease",
                        }}
                      >
                        {member.bio ||
                          "Experienced professional with expertise in their field."}
                      </p>
                      <div className="space-y-1">
                        {(member.expertise || []).map((skill, i) => (
                          <span
                            key={i}
                            className="inline-block text-xs px-2 py-1 rounded-full mr-1"
                            style={{
                              backgroundColor: "var(--color-primary-bg)",
                              color: "var(--color-primary)",
                              transition: "all 0.6s ease",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
