/**
 * Enhanced Component Schema Registry for About Components
 * Defines the data structure, field configurations, and form generation metadata for About page components
 */

export const aboutComponentSchemas = {
  AboutHeroSection: {
    componentName: "AboutHero",
    category: "about",
    icon: "🌟",
    displayName: "About Hero",
    description: "Hero section with background video, title, and stats",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Hero Title",
          placeholder: "About Bellatrix",
          required: true,
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Hero Subtitle",
          placeholder: "Your trusted partner in digital transformation",
          required: true,
          formField: "text"
        },
        description: {
          type: "string",
          label: "Hero Description",
          placeholder: "We are a leading consultancy firm...",
          required: true,
          formField: "textarea"
        },
        backgroundVideo: {
          type: "string",
          label: "Background Video URL",
          placeholder: "/Videos/about-hero.mp4",
          formField: "media",
          mediaType: "video"
        },
        stats: {
          type: "array",
          label: "Statistics",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                label: "Statistic Value",
                placeholder: "500+",
                required: true,
                formField: "text"
              },
              label: {
                type: "string",
                label: "Statistic Label",
                placeholder: "Projects Completed",
                required: true,
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 0,
          maxItems: 6,
          hidden: true  // إخفاء حقل stats من Component Configuration
        }
      }
    },
    defaultData: {
      title: "About Bellatrix",
      subtitle: "Your trusted partner in digital transformation",
      description: "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
      backgroundVideo: "/Videos/about-hero.mp4",
      stats: [
        { value: "500+", label: "Projects Completed" },
        { value: "15+", label: "Years Experience" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "200+", label: "Happy Clients" }
      ]
    }
  },

  AboutMissionSection: {
    componentName: "AboutMission",
    category: "about",
    icon: "🎯",
    displayName: "About Mission",
    description: "Mission and vision statement section with statistics and key points",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "About Bellatrix",
          required: true,
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "Leading consultancy specializing in NetSuite implementations...",
          formField: "text"
        },
        description: {
          type: "string",
          label: "Main Description",
          placeholder: "We are a leading consultancy firm specializing in NetSuite implementations...",
          required: true,
          formField: "textarea"
        },
        vision: {
          type: "string",
          label: "Vision Statement",
          placeholder: "To be the global leader in business transformation consulting...",
          formField: "textarea"
        },
        additionalContent: {
          type: "string",
          label: "Additional Content",
          placeholder: "Additional information about the mission and values...",
          formField: "textarea"
        },
        image: {
          type: "string",
          label: "Mission Image",
          placeholder: "/images/ourProServices.png",
          formField: "media",
          mediaType: "image"
        },
        stats: {
          type: "array",
          label: "Key Statistics",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                label: "Statistic Value",
                placeholder: "500+",
                required: true,
                formField: "text"
              },
              label: {
                type: "string",
                label: "Statistic Label", 
                placeholder: "Projects Completed",
                required: true,
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 0,
          maxItems: 6,
          hidden: true  // إخفاء حقل stats من Component Configuration
        },
        missionPoints: {
          type: "array",
          label: "Mission Points",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Point Title",
                placeholder: "Innovation",
                required: true,
                formField: "text"
              },
              description: {
                type: "string",
                label: "Point Description",
                placeholder: "We embrace cutting-edge technologies...",
                required: true,
                formField: "textarea"
              },
              icon: {
                type: "string",
                label: "Point Icon",
                placeholder: "🚀",
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 0,
          maxItems: 8,
          hidden: true  // إخفاء حقل missionPoints من Component Configuration
        }
      }
    },
    defaultData: {
      title: "",
      subtitle: "",
      description: "",
      vision: "",
      additionalContent: "",
      image: "",
      stats: [],
      missionPoints: []
    }
  },

  AboutTeamSection: {
    componentName: "AboutTeam",
    category: "about",
    icon: "👥",
    displayName: "About Team",
    description: "Team members showcase section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Team Section Title",
          placeholder: "Meet Our Team",
          required: true,
          formField: "text"
        },
        description: {
          type: "string",
          label: "Team Section Description",
          placeholder: "Our diverse team of experts...",
          required: true,
          formField: "textarea"
        },
        members: {
          type: "array",
          label: "Team Members",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                label: "Member Name",
                placeholder: "Sarah Johnson",
                required: true,
                formField: "text"
              },
              role: {
                type: "string",
                label: "Member Role",
                placeholder: "Chief Executive Officer",
                required: true,
                formField: "text"
              },
              image: {
                type: "string",
                label: "Member Image",
                placeholder: "/images/ourteam/1.jpg",
                formField: "media",
                mediaType: "image"
              },
              bio: {
                type: "string",
                label: "Member Bio",
                placeholder: "Visionary leader with 20+ years...",
                formField: "textarea"
              },
              expertise: {
                type: "array",
                label: "Areas of Expertise",
                items: {
                  type: "string",
                  formField: "text"
                },
                formField: "tagList",
                placeholder: "Strategic Planning, Business Development"
              }
            }
          },
          formField: "array",
          minItems: 1,
          maxItems: 12
        }
      }
    },
    defaultData: {
      title: "Meet Our Team",
      description: "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
      members: [
        {
          name: "Sarah Johnson",
          role: "Chief Executive Officer",
          image: "/images/ourteam/1.jpg",
          bio: "Visionary leader with 20+ years in enterprise software solutions.",
          expertise: ["Strategic Planning", "Business Development", "Leadership"]
        },
        {
          name: "Michael Chen",
          role: "Chief Technology Officer",
          image: "/images/ourteam/2.jpg",
          bio: "Technology expert specializing in NetSuite implementations and cloud solutions.",
          expertise: ["NetSuite Development", "Cloud Architecture", "System Integration"]
        },
        {
          name: "Emily Rodriguez",
          role: "Head of Operations",
          image: "/images/ourteam/3.jpg",
          bio: "Operations specialist ensuring seamless project delivery and client success.",
          expertise: ["Project Management", "Process Optimization", "Quality Assurance"]
        }
      ]
    }
  },

  AboutValuesSection: {
    componentName: "AboutValues",
    category: "about",
    icon: "⭐",
    displayName: "About Values",
    description: "Company values and principles section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Values Title",
          placeholder: "Our Values",
          required: true,
          formField: "text"
        },
        description: {
          type: "string",
          label: "Values Description",
          placeholder: "These core values guide everything we do...",
          required: true,
          formField: "textarea"
        },
        items: {
          type: "array",
          label: "Company Values",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Value Title",
                placeholder: "Innovation",
                required: true,
                formField: "text"
              },
              description: {
                type: "string",
                label: "Value Description",
                placeholder: "We embrace cutting-edge technologies...",
                required: true,
                formField: "textarea"
              },
              icon: {
                type: "string",
                label: "Value Icon",
                placeholder: "🚀",
                formField: "text"
              },
              color: {
                type: "string",
                label: "Color Gradient",
                placeholder: "from-blue-500 to-cyan-500",
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 2,
          maxItems: 8
        }
      }
    },
    defaultData: {
      title: "Our Values",
      description: "These core values guide everything we do and shape how we interact with our clients, partners, and each other.",
      items: [
        {
          title: "Innovation",
          description: "We embrace cutting-edge technologies and creative thinking to solve complex business challenges.",
          icon: "🚀",
          color: "from-blue-500 to-cyan-500"
        },
        {
          title: "Excellence",
          description: "We deliver exceptional quality in every project, exceeding client expectations consistently.",
          icon: "",
          color: "from-gray-400 to-gray-600"
        },
        {
          title: "Integrity",
          description: "We act with honesty and transparency, building trust through ethical business practices.",
          icon: "🤝",
          color: "from-green-500 to-teal-500"
        },
        {
          title: "Partnership",
          description: "We work closely with our clients as trusted partners in their digital transformation journey.",
          icon: "🤝",
          color: "from-orange-500 to-red-500"
        }
      ]
    }
  },

  AboutJourneySection: {
    componentName: "AboutJourney",
    category: "about",
    icon: "🛤️",
    displayName: "About Journey",
    description: "Company journey and history section with static content",
    schema: {
      type: "object",
      properties: {
        beginningTitle: {
          type: "string",
          label: "Beginning Section Title",
          placeholder: "The Beginning",
          formField: "text"
        },
        beginningText: {
          type: "string",
          label: "Beginning Section Text",
          placeholder: "Founded in 2008 with a vision to bridge the gap...",
          formField: "textarea"
        },
        growthTitle: {
          type: "string",
          label: "Growth Section Title",
          placeholder: "Growth & Evolution",
          formField: "text"
        },
        growthText: {
          type: "string",
          label: "Growth Section Text",
          placeholder: "Over the years, we've evolved from a small consulting firm...",
          formField: "textarea"
        },
        todayTitle: {
          type: "string",
          label: "Today Section Title",
          placeholder: "Today",
          formField: "text"
        },
        todayText: {
          type: "string",
          label: "Today Section Text",
          placeholder: "We continue to innovate and expand our services...",
          formField: "textarea"
        },
        imageUrl: {
          type: "string",
          label: "Journey Image URL",
          placeholder: "/images/solution.jpg",
          formField: "media",
          mediaType: "image"
        }
      }
    },
    defaultData: {
      beginningTitle: "The Beginning",
      beginningText: "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments.",
      growthTitle: "Growth & Evolution",
      growthText: "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential.",
      todayTitle: "Today",
      todayText: "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity.",
      imageUrl: "/images/solution.jpg"
    }
  },

  AboutMilestonesSection: {
    componentName: "AboutMilestones",
    category: "about",
    icon: "🏆",
    displayName: "About Milestones",
    description: "Company achievements and milestones section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Milestones Title",
          placeholder: "Our Milestones",
          required: true,
          formField: "text"
        },
        description: {
          type: "string",
          label: "Milestones Description",
          placeholder: "Key achievements and milestones...",
          required: true,
          formField: "textarea"
        },
        items: {
          type: "array",
          label: "Milestone Items",
          items: {
            type: "object",
            properties: {
              year: {
                type: "string",
                label: "Milestone Year",
                placeholder: "2024",
                required: true,
                formField: "text"
              },
              title: {
                type: "string",
                label: "Milestone Title",
                placeholder: "AI Integration",
                required: true,
                formField: "text"
              },
              description: {
                type: "string",
                label: "Milestone Description",
                placeholder: "Pioneered AI-powered solutions...",
                required: true,
                formField: "textarea"
              }
            }
          },
          formField: "array",
          minItems: 1,
          maxItems: 10
        }
      }
    },
    defaultData: {
      title: "Our Milestones",
      description: "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
      items: [
        {
          year: "2020",
          title: "Global Expansion",
          description: "Expanded operations to serve clients across multiple continents."
        },
        {
          year: "2023",
          title: "500+ Projects",
          description: "Successfully completed over 500 implementation projects."
        },
        {
          year: "2024",
          title: "AI Integration",
          description: "Pioneered AI-powered solutions for enhanced business intelligence."
        }
      ]
    }
  },

  AboutDifferentiatorsSection: {
    componentName: "AboutDifferentiators",
    category: "about",
    icon: "✨",
    displayName: "About Differentiators",
    description: "What sets the company apart section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Differentiators Title",
          placeholder: "What Sets Us Apart",
          required: true,
          formField: "text"
        },
        description: {
          type: "string",
          label: "Differentiators Description",
          placeholder: "Our unique combination of expertise...",
          required: true,
          formField: "textarea"
        },
        items: {
          type: "array",
          label: "Differentiator Items",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Differentiator Title",
                placeholder: "Industry Expertise",
                required: true,
                formField: "text"
              },
              description: {
                type: "string",
                label: "Differentiator Description",
                placeholder: "Deep understanding of various industries...",
                required: true,
                formField: "textarea"
              },
              stats: {
                type: "string",
                label: "Statistics",
                placeholder: "15+ Industries",
                formField: "text"
              },
              icon: {
                type: "string",
                label: "Differentiator Icon",
                placeholder: "🏭",
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 2,
          maxItems: 6
        }
      }
    },
    defaultData: {
      title: "What Sets Us Apart",
      description: "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
      items: [
        {
          title: "Industry Expertise",
          description: "Deep understanding of various industries and their unique challenges.",
          stats: "15+ Industries",
          icon: "🏭"
        },
        {
          title: "Proven Methodology",
          description: "Time-tested implementation methodology ensuring project success.",
          stats: "98% Success Rate",
          icon: "📊"
        },
        {
          title: "Ongoing Support",
          description: "24/7 support and maintenance services for continuous optimization.",
          stats: "24/7 Support",
          icon: "🛠️"
        },
        {
          title: "Custom Solutions",
          description: "Tailored solutions designed specifically for your business needs.",
          stats: "100% Custom",
          icon: "⚙️"
        }
      ]
    }
  },

  AboutCTASection: {
    componentName: "AboutCTA",
    category: "about",
    icon: "🚀",
    displayName: "About CTA",
    description: "Call-to-action section with features and button",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "CTA Title",
          placeholder: "Ready to Build Something Great?",
          required: true,
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "CTA Subtitle",
          placeholder: "Let's collaborate to transform your business...",
          required: true,
          formField: "textarea"
        },
        description: {
          type: "string",
          label: "CTA Description",
          placeholder: "Contact us today to discuss...",
          formField: "textarea"
        },
        ctaButton: {
          type: "object",
          label: "CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              placeholder: "Start Consultation",
              required: true,
              formField: "text"
            },
            link: {
              type: "string",
              label: "Button Link",
              placeholder: "/contact",
              formField: "text"
            },
            variant: {
              type: "string",
              label: "Button Style",
              placeholder: "primary",
              formField: "select",
              options: ["primary", "secondary", "outline", "ghost"]
            }
          },
          formField: "object"
        },
        features: {
          type: "array",
          label: "Features List",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Feature Title",
                placeholder: "Quick Start",
                required: true,
                formField: "text"
              },
              description: {
                type: "string",
                label: "Feature Description",
                placeholder: "Get started our consultation",
                required: true,
                formField: "text"
              }
            }
          },
          formField: "array",
          minItems: 1,
          maxItems: 6
        }
      }
    },
    defaultData: {
      title: "Ready to Build Something Great?",
      subtitle: "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
      description: "Contact us today to discuss how we can help you optimize your operations and drive growth.",
      ctaButton: {
        text: "Start Consultation",
        link: null,
        variant: "primary"
      },
      features: [
        {
          title: "Quick Start",
          description: "Get started our consultation"
        },
        {
          title: "Expert Team",
          description: "Work with certified professionals"
        },
        {
          title: "Proven Results",
          description: "Join our success stories"
        }
      ]
    }
  }
};

/**
 * Get schema for a specific About component
 * @param {string} componentType - The component type name
 * @returns {Object} Component schema with metadata
 */
export const getAboutComponentSchema = (componentType) => {
  return aboutComponentSchemas[componentType] || null;
};

/**
 * Get all About components for the registry
 * @returns {Array} Array of component definitions
 */
export const getAllAboutComponents = () => {
  return Object.entries(aboutComponentSchemas).map(([componentType, schema]) => ({
    id: componentType,
    name: schema.displayName,
    description: schema.description,
    icon: schema.icon,
    componentType,
    componentName: schema.componentName,
    category: schema.category,
    schema: schema.schema,
    defaultData: schema.defaultData
  }));
};

/**
 * Get default data for a component type
 * @param {string} componentType - The component type name
 * @returns {Object} Default data object for the component
 */
export const getAboutComponentDefaultData = (componentType) => {
  const schema = aboutComponentSchemas[componentType];
  return schema ? schema.defaultData : {};
};

export default aboutComponentSchemas;