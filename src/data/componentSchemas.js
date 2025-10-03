/**
 * Component Schema Registry
 * Defines the default data structure and field configurations for each component type
 */

export const componentSchemas = {
  // Integration Components
  IntegrationHeroSection: {
    title: "Integration Services",
    subtitle: "Connect your ecosystem",
    description: "APIs, middleware, and data pipelines",
    imageUrl: "",
  },
  
  IntegrationTypesSection: {
    title: "Integration Types",
    types: ["REST APIs", "iPaaS", "File-based", "Webhooks"],
    items: [
      {
        title: "REST APIs",
        description: "Direct API integration with REST endpoints",
        icon: "🔌"
      },
      {
        title: "iPaaS",
        description: "Integration Platform as a Service solutions",
        icon: "☁️"
      },
      {
        title: "File-based",
        description: "File-based data exchange and processing",
        icon: "📁"
      },
      {
        title: "Webhooks",
        description: "Real-time event-driven integrations",
        icon: "🔗"
      }
    ]
  },
  
  IntegrationBenefitsSection: {
    title: "Integration Benefits",
    benefits: [
      "Fewer manual tasks",
      "Real-time data",
      "Higher accuracy",
      "Better visibility",
      "Scalable solutions",
      "Cost savings"
    ],
    items: [
      {
        title: "Automated Data Sync",
        description: "Eliminate manual data entry with real-time synchronization"
      },
      {
        title: "Improved Accuracy",
        description: "Reduce errors caused by manual data transfer"
      },
      {
        title: "Enhanced Productivity",
        description: "Save time and resources with automated processes"
      },
      {
        title: "Better Visibility",
        description: "Get a complete view of your business across all systems"
      },
      {
        title: "Scalable Solutions",
        description: "Integrations that grow with your business needs"
      },
      {
        title: "Cost Savings",
        description: "Reduce operational costs through automation"
      }
    ]
  },

  IntegrationPopularSection: {
    title: "Popular Integrations",
    platforms: [
      "Shopify", "Magento", "Salesforce", "HubSpot", "PayPal", "Stripe",
      "Amazon", "eBay", "QuickBooks", "Xero", "Slack", "Microsoft Office"
    ]
  },

  IntegrationCtaSection: {
    title: "Ready to Integrate?",
    subtitle: "Let's connect your systems and streamline your business operations.",
    buttonText: "Start Integration",
    buttonUrl: "#contact"
  },

  // Generic Hero Components
  HeroSection: {
    title: "Welcome to Our Service",
    subtitle: "Your trusted partner for success",
    description: "We provide comprehensive solutions tailored to your needs",
    imageUrl: "",
    buttonText: "Learn More",
    buttonUrl: "#about"
  },

  // CTA Components
  CtaSection: {
    title: "Ready to Get Started?",
    subtitle: "Take the next step towards your goals",
    buttonText: "Contact Us",
    buttonUrl: "#contact",
    backgroundColor: "#3B82F6"
  },

  // Features Components
  FeaturesSection: {
    title: "Our Features",
    subtitle: "Discover what makes us different",
    features: [
      {
        title: "Feature 1",
        description: "Description of feature 1",
        icon: "⭐"
      },
      {
        title: "Feature 2", 
        description: "Description of feature 2",
        icon: "🚀"
      },
      {
        title: "Feature 3",
        description: "Description of feature 3", 
        icon: "💡"
      }
    ]
  },

  // Services Components
  ServicesSection: {
    title: "Our Services",
    subtitle: "Comprehensive solutions for your business",
    services: [
      {
        name: "Service 1",
        description: "Description of service 1",
        icon: "🔧",
        link: "#service1"
      },
      {
        name: "Service 2",
        description: "Description of service 2", 
        icon: "⚙️",
        link: "#service2"
      },
      {
        name: "Service 3",
        description: "Description of service 3",
        icon: "🛠️", 
        link: "#service3"
      }
    ]
  },

  // Pricing Components
  PricingSection: {
    title: "Pricing Plans",
    subtitle: "Choose the plan that fits your needs",
    plans: [
      {
        name: "Basic",
        price: "$29",
        period: "per month",
        description: "Perfect for small businesses",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        cta: "Get Started",
        popular: false
      },
      {
        name: "Professional", 
        price: "$79",
        period: "per month",
        description: "Ideal for growing companies",
        features: ["All Basic features", "Feature 4", "Feature 5", "Priority Support"],
        cta: "Get Started",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$199", 
        period: "per month",
        description: "For large organizations",
        features: ["All Professional features", "Feature 6", "Feature 7", "24/7 Support", "Custom Integration"],
        cta: "Contact Sales",
        popular: false
      }
    ]
  },

  // FAQ Components
  FAQSection: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
    faqs: [
      {
        question: "What is your service about?",
        answer: "Our service provides comprehensive solutions to help your business grow and succeed."
      },
      {
        question: "How do I get started?",
        answer: "Simply contact us through our contact form or give us a call to discuss your needs."
      },
      {
        question: "Do you offer support?",
        answer: "Yes, we provide 24/7 customer support to help you with any questions or issues."
      }
    ]
  },

  // About Components
  AboutSection: {
    title: "About Us",
    subtitle: "Learn more about our company",
    description: "We are a dedicated team of professionals committed to delivering exceptional results for our clients.",
    mission: "Our mission is to provide innovative solutions that drive business growth and success.",
    values: [
      {
        title: "Quality",
        description: "We maintain the highest standards in everything we do"
      },
      {
        title: "Innovation", 
        description: "We continuously seek new and better ways to serve our clients"
      },
      {
        title: "Integrity",
        description: "We conduct business with honesty and transparency"
      }
    ]
  },

  // Team Components
  TeamSection: {
    title: "Our Team",
    subtitle: "Meet the people behind our success",
    members: [
      {
        name: "John Doe",
        position: "CEO & Founder",
        bio: "John has over 10 years of experience in the industry.",
        image: "",
        linkedin: "https://linkedin.com/in/johndoe"
      },
      {
        name: "Jane Smith",
        position: "CTO",
        bio: "Jane leads our technical team with expertise in modern technologies.",
        image: "",
        linkedin: "https://linkedin.com/in/janesmith"
      }
    ]
  },

  // Contact Components
  ContactSection: {
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    email: "contact@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "message", label: "Message", type: "textarea", required: true }
    ]
  },

  // Training Components
  TrainingHeroSection: {
    heroContent: {
      title: "Professional Training Programs",
      description: "Empower your team with comprehensive training solutions designed to enhance skills and drive success"
    },
    backgroundVideo: "/trainingHeroSectionTwo.mp4",
    ctaButton: {
      text: "Start Learning Today",
      link: "/training",
      variant: "primary",
      icon: ""
    }
  },

  TrainingProgramsSection: {
    programsSection: {
      title: "Our Training Programs",
      description: "Comprehensive training solutions designed to empower your team with the skills they need to excel",
      image: "/images/training.jpg",
      Professional_Badge: "Certified Training"
    },
    trainingPrograms: {
      programs: [
        {
          id: 1,
          title: "NetSuite Fundamentals",
          shortDescription: "Core concepts and navigation basics",
          icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
          id: 2,
          title: "Advanced Modules",
          shortDescription: "Financial management and reporting",
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        }
      ]
    }
  },

  // Manufacturing Components
  ManufacturingHeroSection: {
    title: "Manufacturing Solutions",
    subtitle: "Streamline your manufacturing operations",
    description: "Comprehensive NetSuite solutions for manufacturing businesses",
    backgroundImage: "/images/manufacturing-hero.jpg",
    backgroundVideo: "",
    ctaButton: {
      text: "Learn More",
      link: "/manufacturing",
      variant: "primary"
    }
  },

  ManufacturingChallengesSection: {
    title: "Manufacturing Challenges",
    subtitle: "Common pain points we solve",
    challenges: [
      {
        title: "Complex Production Planning",
        description: "Managing multi-level BOMs, work orders, and production schedules",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
        impact: "High"
      },
      {
        title: "Inventory Management",
        description: "Tracking raw materials, WIP, and finished goods",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
        impact: "Medium"
      }
    ]
  },

  ManufacturingSolutionsSection: {
    title: "Manufacturing Solutions",
    subtitle: "Comprehensive NetSuite solutions",
    description: "Tailored solutions for manufacturing businesses",
    solutions: [
      {
        title: "Production Management",
        description: "End-to-end production planning and execution",
        features: ["Work orders", "Routing", "Capacity planning"],
        benefits: "40% improvement in production efficiency"
      },
      {
        title: "Inventory Control",
        description: "Advanced inventory management capabilities",
        features: ["Multi-location", "Serial tracking", "Cycle counting"],
        benefits: "35% reduction in inventory costs"
      }
    ]
  },

  ManufacturingIndustryStatsSection: {
    title: "Manufacturing Industry Stats",
    subtitle: "The state of manufacturing today",
    stats: [
      {
        label: "Digital Transformation",
        value: "73%",
        description: "of manufacturers are investing in digital transformation"
      },
      {
        label: "Efficiency Gains",
        value: "25%",
        description: "average efficiency improvement with ERP systems"
      }
    ]
  }
};

/**
 * Get default data for a component type
 * @param {string} componentType - The component type name
 * @returns {Object} Default data object for the component
 */
export const getDefaultDataForComponent = (componentType) => {
  return componentSchemas[componentType] || {
    title: "New Component",
    description: "Component description",
    content: "Add your content here"
  };
};

/**
 * Get field configuration for a component type
 * @param {string} componentType - The component type name
 * @returns {Object} Field configuration object
 */
export const getFieldConfigForComponent = (componentType) => {
  const defaultData = getDefaultDataForComponent(componentType);
  
  // Generate field configuration based on the data structure
  const fieldConfig = {};
  
  Object.keys(defaultData).forEach(key => {
    const value = defaultData[key];
    
    if (Array.isArray(value)) {
      fieldConfig[key] = {
        type: 'array',
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        items: value.length > 0 && typeof value[0] === 'object' 
          ? Object.keys(value[0]).map(subKey => ({
              key: subKey,
              type: typeof value[0][subKey] === 'string' ? 'text' : 'text',
              label: subKey.replace(/([A-Z])/g, ' $1').trim()
            }))
          : [{ key: 'value', type: 'text', label: 'Value' }]
      };
    } else if (typeof value === 'object' && value !== null) {
      fieldConfig[key] = {
        type: 'object',
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        fields: Object.keys(value).map(subKey => ({
          key: subKey,
          type: typeof value[subKey] === 'string' ? 'text' : 'text',
          label: subKey.replace(/([A-Z])/g, ' $1').trim()
        }))
      };
    } else {
      fieldConfig[key] = {
        type: 'text',
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        placeholder: `Enter ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`
      };
    }
  });
  
  return fieldConfig;
};

export default componentSchemas;


