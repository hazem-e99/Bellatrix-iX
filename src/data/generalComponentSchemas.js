/**
 * General Component Schema Registry
 * Provides basic schemas for components that don't have specific schemas
 */

export const generalComponentSchemas = {
  // Payroll Components
  PayrollHeroSection: {
    componentName: "PayrollHero",
    category: "payroll",
    icon: "💰",
    displayName: "Payroll Hero",
    description: "Hero section for payroll solution",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Transform Your Payroll Process",
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder:
            "Streamline operations with our intelligent payroll system",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our comprehensive payroll solution...",
          formField: "textarea",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder: "/images/payroll-hero.jpg",
          formField: "media",
          mediaType: "image",
        },
      },
    },
    defaultData: {
      title: "Transform Your Payroll Process",
      subtitle: "Streamline operations with our intelligent payroll system",
      description:
        "Our comprehensive payroll solution automates complex processes and ensures accuracy.",
      backgroundImage: "/images/payroll-hero.jpg",
    },
  },

  PayrollHowItWorksSection: {
    componentName: "PayrollHowItWorks",
    category: "payroll",
    icon: "⚙️",
    displayName: "Payroll How It Works",
    description: "How the payroll system works",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "How It Works",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our payroll process is simple and efficient",
          formField: "textarea",
        },
        steps: {
          type: "array",
          label: "Steps",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Step Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Step Description",
                formField: "textarea",
              },
              icon: {
                type: "string",
                label: "Icon",
                formField: "text",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "How It Works",
      description: "Our payroll process is simple and efficient",
      steps: [
        {
          title: "Data Input",
          description: "Enter employee data and hours",
          icon: "📝",
        },
        {
          title: "Processing",
          description: "System calculates payroll automatically",
          icon: "⚙️",
        },
        {
          title: "Approval",
          description: "Review and approve payroll",
          icon: "✅",
        },
      ],
    },
  },

  PayrollWorkflowSection: {
    componentName: "PayrollWorkflow",
    category: "payroll",
    icon: "🔄",
    displayName: "Payroll Workflow",
    description: "Payroll workflow process",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Workflow Process",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our streamlined workflow process",
          formField: "textarea",
        },
        workflowSteps: {
          type: "array",
          label: "Workflow Steps",
          items: {
            type: "object",
            properties: {
              stepTitle: {
                type: "string",
                label: "Step Title",
                formField: "text",
              },
              stepDescription: {
                type: "string",
                label: "Step Description",
                formField: "textarea",
              },
              features: {
                type: "array",
                label: "Key Features",
                items: {
                  type: "string",
                  label: "Feature",
                  formField: "text",
                },
                formField: "array-text",
              },
              automated: {
                type: "string",
                label: "Automated Info",
                placeholder: "Reduces manual work by 80%",
                formField: "text",
              },
              compliant: {
                type: "string",
                label: "Compliant Info",
                placeholder: "Built-in regulatory compliance",
                formField: "text",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Workflow Process",
      description: "Our streamlined workflow process",
      workflowSteps: [
        {
          stepTitle: "Data Collection",
          stepDescription: "Collect employee data and time records",
        },
        {
          stepTitle: "Calculation",
          stepDescription: "Calculate salaries and deductions",
        },
        {
          stepTitle: "Review",
          stepDescription: "Review and validate calculations",
        },
      ],
    },
  },

  PayrollStepperSection: {
    componentName: "PayrollStepper",
    category: "payroll",
    icon: "📊",
    displayName: "Payroll Stepper",
    description: "Payroll process steps",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Process Steps",
          formField: "text",
        },
        steps: {
          type: "array",
          label: "Steps",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Step Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Step Description",
                formField: "textarea",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Process Steps",
      steps: [
        {
          title: "Step 1",
          description: "First step description",
        },
        {
          title: "Step 2",
          description: "Second step description",
        },
      ],
    },
  },

  PayrollPainPointsSection: {
    componentName: "PayrollPainPoints",
    category: "payroll",
    icon: "⚠️",
    displayName: "Payroll Pain Points",
    description: "Common payroll challenges",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Common Challenges",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "We solve these common challenges",
          formField: "textarea",
        },
        painPoints: {
          type: "array",
          label: "Pain Points",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Pain Point Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Pain Point Description",
                formField: "textarea",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Common Challenges",
      description: "We solve these common challenges",
      painPoints: [
        {
          title: "Manual Processing",
          description: "Time-consuming manual payroll processing",
        },
        {
          title: "Calculation Errors",
          description: "Human errors in salary calculations",
        },
      ],
    },
  },

  PayrollFAQSection: {
    componentName: "PayrollFAQ",
    category: "payroll",
    icon: "❓",
    displayName: "Payroll FAQ",
    description: "Frequently asked questions",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Frequently Asked Questions",
          formField: "text",
        },
        faqItems: {
          type: "array",
          label: "FAQ Items",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                label: "Question",
                formField: "text",
              },
              answer: {
                type: "string",
                label: "Answer",
                formField: "textarea",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Frequently Asked Questions",
      faqItems: [
        {
          question: "How does the payroll system work?",
          answer: "Our system automates the entire payroll process...",
        },
        {
          question: "Is it secure?",
          answer: "Yes, we use enterprise-grade security...",
        },
      ],
    },
  },

  PayrollCTASection: {
    componentName: "PayrollCTA",
    category: "payroll",
    icon: "🚀",
    displayName: "Payroll CTA",
    description: "Call to action section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Ready to Transform Your Payroll?",
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Get started today",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Contact us to learn more",
          formField: "textarea",
        },
        ctaButton: {
          type: "object",
          label: "CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              formField: "text",
            },
            link: {
              type: "string",
              label: "Button Link",
              formField: "text",
            },
          },
        },
      },
    },
    defaultData: {
      title: "Ready to Transform Your Payroll?",
      subtitle: "Get started today",
      description: "Contact us to learn more about our payroll solution",
      ctaButton: {
        text: "Get Started",
        link: "/contact",
      },
    },
  },

  // HR Components
  HRHeroSection: {
    componentName: "HRHero",
    category: "hr",
    icon: "👥",
    displayName: "HR Hero",
    description: "Hero section for HR solution",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Transform Your HR Management",
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Streamline your human resources",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our comprehensive HR solution...",
          formField: "textarea",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder: "/images/hr-hero.jpg",
          formField: "media",
          mediaType: "image",
        },
      },
    },
    defaultData: {
      title: "Transform Your HR Management",
      subtitle: "Streamline your human resources",
      description:
        "Our comprehensive HR solution simplifies employee management.",
      backgroundImage: "/images/hr-hero.jpg",
    },
  },

  HRModulesSection: {
    componentName: "HRModules",
    category: "hr",
    icon: "📦",
    displayName: "HR Modules",
    description: "HR system modules",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "HR Modules",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Comprehensive HR modules",
          formField: "textarea",
        },
        modules: {
          type: "array",
          label: "Modules",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Module Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Module Description",
                formField: "textarea",
              },
              icon: {
                type: "string",
                label: "Icon",
                formField: "text",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "HR Modules",
      description: "Comprehensive HR modules",
      modules: [
        {
          title: "Employee Management",
          description: "Complete employee lifecycle management",
          icon: "👤",
        },
        {
          title: "Time Tracking",
          description: "Accurate time and attendance tracking",
          icon: "⏰",
        },
      ],
    },
  },

  HRBenefitsSection: {
    componentName: "HRBenefits",
    category: "hr",
    icon: "✨",
    displayName: "HR Benefits",
    description: "HR system benefits",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Benefits",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Key benefits of our HR solution",
          formField: "textarea",
        },
        features: {
          type: "array",
          label: "Features",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Feature Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Feature Description",
                formField: "textarea",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Benefits",
      description: "Key benefits of our HR solution",
      features: [
        {
          title: "Automation",
          description: "Automate routine HR tasks",
        },
        {
          title: "Compliance",
          description: "Ensure regulatory compliance",
        },
      ],
    },
  },

  HRUseCasesSection: {
    componentName: "HRUseCases",
    category: "hr",
    icon: "🎯",
    displayName: "HR Use Cases",
    description: "HR system use cases",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Use Cases",
          formField: "text",
        },
        useCases: {
          type: "array",
          label: "Use Cases",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Title",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Description",
                formField: "textarea",
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Use Cases",
      description: "Common use cases for our HR solution",
      useCases: [
        {
          title: "Small Business",
          description: "Perfect for small businesses",
        },
        {
          title: "Enterprise",
          description: "Scalable for large enterprises",
        },
      ],
    },
  },

  HRPricingSection: {
    componentName: "HRPricing",
    category: "hr",
    icon: "💵",
    displayName: "HR Pricing",
    description: "HR solution pricing",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Pricing Plans",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Choose the right plan for your needs",
          formField: "textarea",
        },
        pricing: {
          type: "array",
          label: "Pricing Plans",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                label: "Plan Name",
                formField: "text",
              },
              price: {
                type: "string",
                label: "Price",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Plan Description",
                formField: "textarea",
              },
              features: {
                type: "array",
                label: "Features",
                items: {
                  type: "string",
                  formField: "text",
                },
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Pricing Plans",
      description: "Choose the right plan for your needs",
      pricing: [
        {
          name: "Basic",
          price: "$29/month",
          description: "Perfect for small teams",
          features: ["Up to 10 employees", "Basic features"],
        },
        {
          name: "Professional",
          price: "$59/month",
          description: "Ideal for growing businesses",
          features: ["Up to 50 employees", "Advanced features"],
        },
      ],
    },
  },

  HRFAQSection: {
    componentName: "HRFAQ",
    category: "hr",
    icon: "❓",
    displayName: "HR FAQ",
    description: "Frequently asked questions",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Frequently Asked Questions",
          formField: "text",
        },
        faq: {
          type: "object",
          label: "FAQ Data",
          properties: {
            title: {
              type: "string",
              label: "FAQ Title",
              formField: "text",
            },
            items: {
              type: "array",
              label: "FAQ Items",
              items: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    label: "Question",
                    formField: "text",
                  },
                  answer: {
                    type: "string",
                    label: "Answer",
                    formField: "textarea",
                  },
                },
              },
            },
          },
        },
      },
    },
    defaultData: {
      title: "Frequently Asked Questions",
      faq: {
        title: "HR Solution FAQ",
        items: [
          {
            question: "How does the HR system work?",
            answer: "Our HR system automates employee management...",
          },
          {
            question: "Is it secure?",
            answer: "Yes, we use enterprise-grade security...",
          },
        ],
      },
    },
  },

  HRCTASection: {
    componentName: "HRCTA",
    category: "hr",
    icon: "🚀",
    displayName: "HR CTA",
    description: "Call to action section",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Title",
          placeholder: "Ready to Transform Your HR?",
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Get started today",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Contact us to learn more",
          formField: "textarea",
        },
        ctaButton: {
          type: "object",
          label: "CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              formField: "text",
            },
            link: {
              type: "string",
              label: "Button Link",
              formField: "text",
            },
          },
        },
      },
    },
    defaultData: {
      title: "Ready to Transform Your HR?",
      subtitle: "Get started today",
      description: "Contact us to learn more about our HR solution",
      ctaButton: {
        text: "Get Started",
        link: "/contact",
      },
    },
  },

  // Manufacturing Components
  ManufacturingIndustryStats: {
    componentName: "ManufacturingIndustryStats",
    category: "manufacturing",
    icon: "📊",
    displayName: "Manufacturing Industry Statistics",
    description: "Display key manufacturing performance metrics and statistics",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Manufacturing Industry Stats",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "The state of manufacturing today",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Section Description",
          placeholder:
            "Key metrics that demonstrate our manufacturing excellence",
          formField: "textarea",
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
                formField: "text",
              },
              label: {
                type: "string",
                label: "Statistic Label",
                placeholder: "Manufacturing Clients",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Statistic Description",
                placeholder: "Successful implementations",
                required: true,
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 8,
        },
        backgroundImage: {
          type: "string",
          label: "Background Image (Optional)",
          placeholder: "/images/manufacturing-bg.jpg",
          formField: "media",
          mediaType: "image",
        },
        backgroundColor: {
          type: "string",
          label: "Background Color",
          placeholder: "Select Background Color",
          formField: "select",
          options: [
            { value: "white", label: "White" },
            { value: "light-gray", label: "Light Gray" },
            { value: "dark", label: "Dark" },
            { value: "blue", label: "Blue" },
            { value: "transparent", label: "Transparent" },
          ],
        },
      },
    },
    defaultData: {
      title: "New Component Title",
      subtitle: "Key industry metrics",
      description: "Component description - please configure this component",
      stats: [
        {
          value: "85%",
          label: "Efficiency Improvement",
          description: "Average efficiency gain",
        },
        {
          value: "60%",
          label: "Cost Reduction",
          description: "Operational cost savings",
        },
        {
          value: "90%",
          label: "Accuracy Rate",
          description: "Data accuracy improvement",
        },
      ],
      backgroundColor: "white",
    },
  },

  ManufacturingHeroSection: {
    componentName: "ManufacturingHero",
    category: "manufacturing",
    icon: "🏭",
    displayName: "Manufacturing Hero Section",
    description: "Hero section for manufacturing industry pages",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Hero Title",
          placeholder: "Manufacturing Excellence",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Hero Subtitle",
          placeholder: "Powered by NetSuite",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Hero Description",
          placeholder:
            "Transform your manufacturing operations with integrated ERP solutions...",
          required: true,
          formField: "textarea",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder:
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
          formField: "media",
          mediaType: "image",
        },
        ctaText: {
          type: "string",
          label: "CTA Button Text (Optional)",
          placeholder: "Schedule Manufacturing Demo",
          formField: "text",
        },
        ctaLink: {
          type: "string",
          label: "CTA Button Link (Optional)",
          placeholder: "/contact",
          formField: "text",
        },
      },
    },
    defaultData: {
      title: "Manufacturing Excellence",
      subtitle: "Powered by NetSuite",
      description:
        "Transform your manufacturing operations with integrated ERP solutions that streamline production, optimize inventory, and ensure quality compliance across your entire value chain.",
      backgroundImage:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      ctaText: "Schedule Manufacturing Demo",
      ctaLink: "/contact",
    },
  },

  ManufacturingChallengesSection: {
    componentName: "ManufacturingChallenges",
    category: "manufacturing",
    icon: "⚡",
    displayName: "Manufacturing Challenges",
    description: "Display common manufacturing challenges and pain points",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Manufacturing Challenges We Solve",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "Common pain points facing manufacturers",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Section Description",
          placeholder:
            "We understand the unique challenges manufacturers face and provide targeted solutions",
          formField: "textarea",
        },
        challenges: {
          type: "array",
          label: "Challenges List",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Challenge Title",
                placeholder: "Inventory Management",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Challenge Description",
                placeholder:
                  "Difficulty tracking inventory across multiple locations",
                required: true,
                formField: "textarea",
              },
              icon: {
                type: "string",
                label: "Icon SVG Path (Optional)",
                placeholder:
                  "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                formField: "text",
              },
              impact: {
                type: "string",
                label: "Business Impact",
                placeholder: "25% excess inventory costs",
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 6,
        },
      },
    },
    defaultData: {
      title: "Manufacturing Challenges We Solve",
      subtitle: "Common pain points facing manufacturers",
      description:
        "We understand the unique challenges manufacturers face in today's competitive landscape and provide targeted solutions to address them.",
      challenges: [
        {
          title: "Inventory Management",
          description:
            "Difficulty tracking inventory levels, managing stockouts, and optimizing inventory across multiple locations and warehouses",
          icon:
            "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
          impact: "25% excess inventory costs",
        },
        {
          title: "Production Planning",
          description:
            "Complex scheduling, resource allocation, and demand forecasting leading to inefficient production cycles",
          icon:
            "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          impact: "20% production delays",
        },
        {
          title: "Quality Control",
          description:
            "Maintaining consistent quality standards and compliance across all production processes and locations",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          impact: "15% quality issues",
        },
      ],
    },
  },

  ManufacturingSolutionsSection: {
    componentName: "ManufacturingSolutions",
    category: "manufacturing",
    icon: "🔧",
    displayName: "Manufacturing Solutions",
    description: "NetSuite solutions for manufacturing challenges",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "NetSuite Manufacturing Solutions",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "Comprehensive ERP solutions for manufacturers",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Section Description",
          placeholder:
            "Our NetSuite solutions are specifically designed to address manufacturing challenges",
          formField: "textarea",
        },
        solutions: {
          type: "array",
          label: "Solutions List",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Solution Title",
                placeholder: "Production Planning & Scheduling",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Solution Description",
                placeholder:
                  "Advanced planning tools to optimize production schedules",
                required: true,
                formField: "textarea",
              },
              features: {
                type: "array",
                label: "Key Features",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
              benefits: {
                type: "string",
                label: "Key Benefits",
                placeholder: "30% improvement in on-time delivery",
                formField: "text",
              },
              icon: {
                type: "string",
                label: "Icon SVG Path (Optional)",
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 6,
        },
      },
    },
    defaultData: {
      title: "NetSuite Manufacturing Solutions",
      subtitle: "Comprehensive ERP solutions designed for manufacturers",
      description:
        "Our proven NetSuite solutions address the specific challenges facing manufacturers, providing integrated tools to optimize operations and drive growth.",
      solutions: [
        {
          title: "Production Planning & Scheduling",
          description:
            "Advanced planning tools to optimize production schedules, manage capacity, and coordinate resources across multiple facilities",
          features: [
            "Capacity planning",
            "Resource scheduling",
            "Demand forecasting",
            "Work order management",
          ],
          benefits: "30% improvement in on-time delivery",
          icon:
            "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2",
        },
        {
          title: "Inventory & Supply Chain Management",
          description:
            "Real-time inventory tracking, supplier management, and supply chain optimization to reduce costs and improve efficiency",
          features: [
            "Real-time inventory tracking",
            "Supplier management",
            "Purchase order automation",
            "Demand planning",
          ],
          benefits: "25% reduction in inventory costs",
          icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10",
        },
        {
          title: "Quality Management & Compliance",
          description:
            "Comprehensive quality control processes and compliance tracking to ensure product quality and regulatory adherence",
          features: [
            "Quality control workflows",
            "Compliance tracking",
            "Document management",
            "Audit trails",
          ],
          benefits: "50% reduction in quality issues",
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
      ],
    },
  },

  ManufacturingCTASection: {
    componentName: "ManufacturingCTA",
    category: "manufacturing",
    icon: "📞",
    displayName: "Manufacturing CTA",
    description: "Call-to-action section for manufacturing services",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "CTA Title",
          placeholder: "Ready to Transform Your Manufacturing Operations?",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "CTA Subtitle",
          placeholder: "Get started with our manufacturing experts",
          formField: "text",
        },
        description: {
          type: "string",
          label: "CTA Description",
          placeholder:
            "Contact our manufacturing specialists to learn how NetSuite can optimize your operations",
          formField: "textarea",
        },
        features: {
          type: "array",
          label: "Features (Items)",
          items: {
            type: "object",
            properties: {
              icon: {
                type: "string",
                label: "Icon",
                placeholder: "💡",
                formField: "text",
              },
              title: {
                type: "string",
                label: "Feature Title",
                placeholder: "Streamlined Operations",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Feature Description",
                placeholder: "Optimize your manufacturing processes",
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 6,
        },
        ctaButton: {
          type: "object",
          label: "Primary CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              placeholder: "Schedule Manufacturing Consultation",
              formField: "text",
            },
            link: {
              type: "string",
              label: "Button Link",
              placeholder: "/contact",
              formField: "text",
            },
            variant: {
              type: "string",
              label: "Button Style",
              formField: "select",
              options: [
                { value: "primary", label: "Primary Button" },
                { value: "secondary", label: "Secondary Button" },
                { value: "outline", label: "Outline Button" },
              ],
            },
          },
          formField: "object",
        },
        secondaryButton: {
          type: "object",
          label: "Secondary CTA Button (Optional)",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              placeholder: "Download Manufacturing Guide",
              formField: "text",
            },
            link: {
              type: "string",
              label: "Button Link",
              placeholder: "/resources/manufacturing-guide",
              formField: "text",
            },
            variant: {
              type: "string",
              label: "Button Style",
              formField: "select",
              options: [
                { value: "primary", label: "Primary Button" },
                { value: "secondary", label: "Secondary Button" },
                { value: "outline", label: "Outline Button" },
              ],
            },
          },
          formField: "object",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image (Optional)",
          placeholder: "/images/manufacturing-cta-bg.jpg",
          formField: "media",
          mediaType: "image",
        },
      },
    },
    defaultData: {
      title: "Ready to Transform Your Manufacturing Operations?",
      subtitle: "Get started with our manufacturing experts",
      description:
        "Contact our NetSuite manufacturing specialists to discover how we can optimize your operations, reduce costs, and improve efficiency across your entire value chain.",
      features: [
        {
          icon: "💡",
          title: "Streamlined Operations",
          description: "Optimize your manufacturing processes",
        },
        {
          icon: "📊",
          title: "Real-time Insights",
          description: "Get actionable data for better decisions",
        },
        {
          icon: "🛠️",
          title: "Expert Support",
          description: "24/7 support from industry experts",
        },
      ],
      ctaButton: {
        text: "Schedule Manufacturing Consultation",
        link: "/contact",
        variant: "primary",
      },
      secondaryButton: {
        text: "Download Manufacturing Guide",
        link: "/resources/manufacturing-guide",
        variant: "outline",
      },
    },
  },

  // Retail Components
  RetailIndustryStats: {
    componentName: "RetailIndustryStats",
    category: "retail",
    icon: "📊",
    displayName: "Retail Industry Statistics",
    description: "Display key retail performance metrics and statistics",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Retail Industry Stats",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "The state of retail today",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Section Description",
          placeholder: "Key metrics that demonstrate our retail excellence",
          formField: "textarea",
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
                placeholder: "85%",
                required: true,
                formField: "text",
              },
              label: {
                type: "string",
                label: "Statistic Label",
                placeholder: "Efficiency Improvement",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Statistic Description",
                placeholder: "Average efficiency gain",
                required: true,
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 8,
        },
      },
    },
    defaultData: {
      title: "Retail Industry Stats",
      subtitle: "The state of retail today",
      description:
        "Key metrics that demonstrate our retail excellence and industry leadership",
      stats: [
        {
          value: "85%",
          label: "Efficiency Improvement",
          description: "Average efficiency gain",
        },
        {
          value: "60%",
          label: "Cost Reduction",
          description: "Operational cost savings",
        },
        {
          value: "90%",
          label: "Accuracy Rate",
          description: "Data accuracy improvement",
        },
        {
          value: "75%",
          label: "Time Savings",
          description: "Process automation benefits",
        },
      ],
    },
  },

  RetailHeroSection: {
    componentName: "RetailHero",
    category: "retail",
    icon: "🛍️",
    displayName: "Retail Hero Section",
    description: "Hero section for retail industry pages",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Hero Title",
          placeholder: "Retail Excellence",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Hero Subtitle",
          placeholder: "Powered by NetSuite",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Hero Description",
          placeholder:
            "Transform your retail operations with comprehensive ERP solutions...",
          required: true,
          formField: "textarea",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
          formField: "media",
          mediaType: "image",
        },
        ctaText: {
          type: "string",
          label: "CTA Button Text (Optional)",
          placeholder: "Schedule Retail Demo",
          formField: "text",
        },
        ctaLink: {
          type: "string",
          label: "CTA Button Link (Optional)",
          placeholder: "/contact",
          formField: "text",
        },
      },
    },
    defaultData: {
      title: "Retail Excellence",
      subtitle: "Powered by NetSuite",
      description:
        "Transform your retail operations with comprehensive ERP solutions that optimize inventory management, enhance customer experiences, and drive sales growth across all channels.",
      backgroundImage:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      ctaText: "Schedule Retail Demo",
      ctaLink: "/contact",
    },
  },

  // Landing Page Components
  Hero: {
    componentName: "Hero",
    category: "landing",
    icon: "🌟",
    displayName: "Landing Page Hero",
    description: "Main hero section with slides, videos, and statistics",
    schema: {
      type: "object",
      properties: {
        slides: {
          type: "array",
          label: "Hero Slides",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Slide Title",
                placeholder: "Strategic Business Transformation",
                required: true,
                formField: "text",
              },
              subtitle: {
                type: "string",
                label: "Slide Subtitle",
                placeholder: "Oracle NetSuite Consultancy",
                formField: "text",
              },
              description: {
                type: "string",
                label: "Slide Description",
                placeholder:
                  "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
                required: true,
                formField: "textarea",
              },
              video: {
                type: "string",
                label: "Background Video URL",
                placeholder: "/Videos/implementation/homepage_hero.mp4",
                formField: "media",
                mediaType: "video",
              },
              backgroundImage: {
                type: "string",
                label: "Background Image (Fallback)",
                placeholder: "/images/hero-bg.jpg",
                formField: "media",
                mediaType: "image",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 5,
        },
        stats: {
          type: "array",
          label: "Statistics Display",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                label: "Statistic Value",
                placeholder: "500+",
                required: true,
                formField: "text",
              },
              label: {
                type: "string",
                label: "Statistic Label",
                placeholder: "Projects Completed",
                required: true,
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 0,
          maxItems: 6,
        },
      },
    },
    defaultData: {
      slides: [
        {
          title: "Strategic Business Transformation",
          subtitle: "Oracle NetSuite Consultancy",
          description:
            "Streamline operations and drive growth with our comprehensive NetSuite solutions designed to optimize your business processes and enhance efficiency.",
          video: "/Videos/implementation/homepage_hero.mp4",
          backgroundImage: "/images/hero-bg.jpg",
        },
      ],
      stats: [
        { value: "500+", label: "Projects Completed" },
        { value: "15+", label: "Years Experience" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "200+", label: "Happy Clients" },
      ],
    },
  },

  Services: {
    componentName: "Services",
    category: "landing",
    icon: "⚙️",
    displayName: "Services Grid Section",
    description: "Services grid with section header and view all button",
    schema: {
      type: "object",
      properties: {
        sectionHeader: {
          type: "object",
          label: "Section Header",
          properties: {
            title: {
              type: "string",
              label: "Section Title",
              placeholder: "Our Services",
              required: true,
              formField: "text",
            },
            subtitle: {
              type: "string",
              label: "Section Subtitle",
              placeholder: "Comprehensive NetSuite solutions for your business",
              formField: "text",
            },
            description: {
              type: "string",
              label: "Section Description",
              placeholder:
                "We provide end-to-end NetSuite consulting services to help businesses optimize their operations.",
              formField: "textarea",
            },
          },
          formField: "object",
        },
        services: {
          type: "array",
          label: "Services List",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Service Title",
                placeholder: "NetSuite Implementation",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Service Description",
                placeholder:
                  "Complete NetSuite implementation and setup for your business",
                required: true,
                formField: "textarea",
              },
              icon: {
                type: "string",
                label: "Service Icon",
                placeholder: "⚙️",
                formField: "text",
              },
              link: {
                type: "string",
                label: "Service Link",
                placeholder: "/services/implementation",
                formField: "text",
              },
              image: {
                type: "string",
                label: "Service Image",
                placeholder: "/images/services/implementation.jpg",
                formField: "media",
                mediaType: "image",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 12,
        },
        viewAllButton: {
          type: "object",
          label: "View All Button (Optional)",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              placeholder: "View All Services",
              formField: "text",
            },
            link: {
              type: "string",
              label: "Button Link",
              placeholder: "/services",
              formField: "text",
            },
          },
          formField: "object",
        },
      },
    },
    defaultData: {
      sectionHeader: {
        title: "Our Services",
        subtitle: "Comprehensive NetSuite solutions for your business",
        description:
          "We provide end-to-end NetSuite consulting services designed to optimize your operations and drive sustainable growth.",
      },
      services: [
        {
          title: "NetSuite Implementation",
          description:
            "Complete NetSuite implementation and setup tailored to your business requirements",
          icon: "⚙️",
          link: "/services/implementation",
          image: "/images/services/implementation.jpg",
        },
        {
          title: "System Integration",
          description:
            "Seamlessly integrate NetSuite with your existing business systems and applications",
          icon: "🔗",
          link: "/services/integration",
          image: "/images/services/integration.jpg",
        },
        {
          title: "Customization Services",
          description:
            "Custom development and configuration to meet your unique business needs",
          icon: "🛠️",
          link: "/services/customization",
          image: "/images/services/customization.jpg",
        },
      ],
      viewAllButton: {
        text: "View All Services",
        link: "/services",
      },
    },
  },

  Industries: {
    componentName: "Industries",
    category: "landing",
    icon: "🏭",
    displayName: "Industries Section",
    description: "Industries we serve with expandable cards and links",
    schema: {
      type: "object",
      properties: {
        sectionHeader: {
          type: "object",
          label: "Section Header",
          properties: {
            title: {
              type: "string",
              label: "Section Title",
              placeholder: "Industries We Serve",
              required: true,
              formField: "text",
            },
            subtitle: {
              type: "string",
              label: "Section Subtitle",
              placeholder:
                "Specialized NetSuite solutions for various industries",
              formField: "text",
            },
            description: {
              type: "string",
              label: "Section Description",
              placeholder:
                "We understand the unique challenges of different industries and provide tailored NetSuite solutions.",
              formField: "textarea",
            },
          },
          formField: "object",
        },
        industries: {
          type: "array",
          label: "Industries List",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                label: "Industry ID",
                placeholder: "manufacturing",
                required: true,
                formField: "text",
              },
              label: {
                type: "string",
                label: "Industry Name",
                placeholder: "Manufacturing",
                required: true,
                formField: "text",
              },
              icon: {
                type: "string",
                label: "Industry Icon",
                placeholder: "Factory",
                formField: "text",
              },
              content: {
                type: "object",
                label: "Industry Content",
                properties: {
                  title: {
                    type: "string",
                    label: "Content Title",
                    placeholder: "Manufacturing Solutions",
                    formField: "text",
                  },
                  description: {
                    type: "string",
                    label: "Content Description",
                    placeholder: "Streamline your manufacturing operations...",
                    formField: "textarea",
                  },
                  features: {
                    type: "array",
                    label: "Key Features",
                    items: {
                      type: "string",
                      formField: "text",
                    },
                    formField: "array",
                  },
                  image: {
                    type: "string",
                    label: "Content Image",
                    placeholder:
                      "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
                    formField: "media",
                    mediaType: "image",
                  },
                },
                formField: "object",
              },
              link: {
                type: "string",
                label: "Industry Page Link",
                placeholder: "/industries/manufacturing",
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 8,
        },
      },
    },
    defaultData: {
      sectionHeader: {
        title: "Industries We Serve",
        subtitle: "Specialized NetSuite solutions for various industries",
        description:
          "We understand the unique challenges of different industries and provide tailored NetSuite solutions to drive growth and efficiency.",
      },
      industries: [
        {
          id: "manufacturing",
          label: "Manufacturing",
          icon: "Factory",
          content: {
            title: "Manufacturing Solutions",
            description:
              "Streamline your manufacturing operations with our comprehensive NetSuite solutions. From production planning to inventory management, we help you optimize every aspect of your manufacturing process.",
            features: [
              "Production planning and scheduling",
              "Inventory and supply chain management",
              "Quality control and compliance",
              "Cost accounting and analysis",
              "Shop floor control",
            ],
            image:
              "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          link: "/industries/manufacturing",
        },
        {
          id: "retail",
          label: "Retail",
          icon: "Store",
          content: {
            title: "Retail Solutions",
            description:
              "Enhance your retail operations with integrated point-of-sale, inventory management, and customer relationship management solutions.",
            features: [
              "Point of sale integration",
              "Inventory optimization",
              "Customer relationship management",
              "E-commerce integration",
              "Multi-channel operations",
            ],
            image:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          link: "/industries/retail",
        },
      ],
    },
  },

  // Testimonials Components
  Testimonials: {
    componentName: "Testimonials",
    category: "testimonials",
    icon: "💬",
    displayName: "Client Testimonials",
    description:
      "Customer testimonials and success stories with video background",
    schema: {
      type: "object",
      properties: {
        sectionHeader: {
          type: "object",
          label: "Section Header",
          properties: {
            gradientText: {
              type: "string",
              label: "Header Title",
              placeholder: "Trusted by Industry Leaders",
              required: true,
              formField: "text",
            },
            subtitle: {
              type: "string",
              label: "Header Subtitle",
              placeholder:
                "Don't just take our word for it—here's what our clients say.",
              formField: "textarea",
            },
          },
          formField: "object",
        },
        testimonials: {
          type: "array",
          label: "Client Testimonials",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                label: "Testimonial ID",
                placeholder: "1",
                required: true,
                formField: "text",
              },
              quote: {
                type: "string",
                label: "Testimonial Quote",
                placeholder:
                  "Bellatrix transformed our business operations completely...",
                required: true,
                formField: "textarea",
              },
              name: {
                type: "string",
                label: "Client Name",
                placeholder: "Sarah Johnson",
                required: true,
                formField: "text",
              },
              title: {
                type: "string",
                label: "Client Title",
                placeholder: "CEO, TechCorp Inc.",
                required: true,
                formField: "text",
              },
              avatar: {
                type: "string",
                label: "Avatar (Initial)",
                placeholder: "SJ",
                formField: "text",
              },
              rating: {
                type: "number",
                label: "Rating (1-5 stars)",
                placeholder: "5",
                formField: "number",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 10,
        },
        backgroundVideo: {
          type: "string",
          label: "Background Video URL",
          placeholder: "/Videos/aesthetic.mp4",
          formField: "media",
          mediaType: "video",
        },
        sideImage: {
          type: "string",
          label: "Side Image URL",
          placeholder: "/images/indleaders.jpg",
          formField: "media",
          mediaType: "image",
        },
      },
    },
    defaultData: {
      sectionHeader: {
        gradientText: "Trusted by Industry Leaders",
        subtitle:
          "Don't just take our word for it—here's what our clients say.",
      },
      testimonials: [
        {
          id: "1",
          quote:
            "Bellatrix transformed our business operations completely. Their NetSuite expertise is unmatched.",
          name: "Sarah Johnson",
          title: "CEO, TechCorp Inc.",
          avatar: "SJ",
          rating: 5,
        },
        {
          id: "2",
          quote:
            "The implementation was smooth and the support team is always available when needed.",
          name: "Michael Chen",
          title: "COO, Global Manufacturing",
          avatar: "MC",
          rating: 5,
        },
        {
          id: "3",
          quote:
            "Outstanding results! Our efficiency increased by 40% after the NetSuite implementation.",
          name: "Emily Rodriguez",
          title: "CFO, Retail Solutions",
          avatar: "ER",
          rating: 5,
        },
      ],
      backgroundVideo: "/Videos/aesthetic.mp4",
      sideImage: "/images/indleaders.jpg",
    },
  },

  TestimonialsSection: {
    componentName: "TestimonialsSection",
    category: "testimonials",
    icon: "💬",
    displayName: "Testimonials Section (Duplicate)",
    description: "Duplicate of Testimonials component",
    schema: {
      type: "object",
      properties: {
        redirectTo: {
          type: "string",
          label: "This is a duplicate component",
          placeholder: "Please use 'Testimonials' component instead",
          formField: "text",
          disabled: true,
        },
      },
    },
    defaultData: {
      redirectTo: "Use Testimonials component instead",
    },
  },

  ServiceGrid: {
    componentName: "ServiceGrid",
    category: "services",
    icon: "⚙️",
    displayName: "Service Grid Layout",
    description: "Grid layout of services with features and CTA buttons",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Our Services",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder:
            "Comprehensive NetSuite solutions to drive your business forward",
          formField: "textarea",
        },
        services: {
          type: "array",
          label: "Services List",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Service Title",
                placeholder: "NetSuite Implementation",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Service Description",
                placeholder:
                  "Complete NetSuite setup and configuration tailored to your business needs.",
                required: true,
                formField: "textarea",
              },
              icon: {
                type: "string",
                label: "Service Icon",
                placeholder: "🚀",
                formField: "text",
              },
              features: {
                type: "array",
                label: "Service Features",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 12,
        },
        bottomCTA: {
          type: "object",
          label: "Bottom Call-to-Action",
          properties: {
            text: {
              type: "string",
              label: "CTA Text",
              placeholder: "Ready to transform your business with NetSuite?",
              formField: "textarea",
            },
            buttonText: {
              type: "string",
              label: "Button Text",
              placeholder: "Get Started Today",
              formField: "text",
            },
          },
          formField: "object",
        },
      },
    },
    defaultData: {
      title: "Our Services",
      subtitle:
        "Comprehensive NetSuite solutions to drive your business forward",
      services: [
        {
          title: "NetSuite Implementation",
          description:
            "Complete NetSuite setup and configuration tailored to your business needs.",
          icon: "🚀",
          features: [
            "System Configuration",
            "Data Migration",
            "Custom Workflows",
            "User Training",
          ],
        },
        {
          title: "Training & Support",
          description:
            "Comprehensive training programs to maximize your NetSuite investment.",
          icon: "📚",
          features: [
            "User Training",
            "Admin Training",
            "Custom Reports",
            "Ongoing Support",
          ],
        },
        {
          title: "Customization",
          description:
            "Tailored solutions to meet your specific business requirements.",
          icon: "⚙️",
          features: ["Custom Fields", "Scripts", "Workflows", "Integrations"],
        },
      ],
      bottomCTA: {
        text: "Ready to transform your business with NetSuite?",
        buttonText: "Get Started Today",
      },
    },
  },

  // Services Implementation Components
  ImplementationHeroSection: {
    componentName: "ImplementationHero",
    category: "services",
    icon: "🚀",
    displayName: "Implementation Hero Section",
    description: "Hero section for NetSuite implementation services",
    schema: {
      type: "object",
      properties: {
        titleParts: {
          type: "array",
          label: "Title Parts (4 words)",
          items: {
            type: "string",
            formField: "text",
          },
          formField: "array",
          minItems: 4,
          maxItems: 4,
        },
        title: {
          type: "string",
          label: "Alternative Title",
          placeholder: "Implementation Services Made Simple",
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Alternative Subtitle",
          placeholder: "Where Vision Meets Reality",
          formField: "text",
        },
        description: {
          type: "string",
          label: "Hero Description",
          placeholder:
            "We don't just implement solutions—we craft digital experiences that transform the way you do business",
          required: true,
          formField: "textarea",
        },
        backgroundVideo: {
          type: "string",
          label: "Background Video URL",
          placeholder: "/Videos/HomeHeroSectionV.mp4",
          formField: "media",
          mediaType: "video",
        },
        backgroundImage: {
          type: "string",
          label: "Background Image (Fallback)",
          placeholder: "/images/implementation-hero-bg.jpg",
          formField: "media",
          mediaType: "image",
        },
        ctaButton: {
          type: "object",
          label: "CTA Button Configuration",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              placeholder: "Start Implementation",
              formField: "text",
            },
            icon: {
              type: "string",
              label: "Button Icon SVG Path",
              placeholder: "M13 7l5 5m0 0l-5 5m5-5H6",
              formField: "text",
            },
            variant: {
              type: "string",
              label: "Button Style",
              formField: "select",
              options: ["primary", "secondary", "outline", "ghost"],
            },
          },
          formField: "object",
        },
      },
    },
    defaultData: {
      titleParts: ["Where", "Vision", "Meets", "Reality"],
      description:
        "We don't just implement solutions—we craft digital experiences that transform the way you do business",
      backgroundVideo: "/Videos/HomeHeroSectionV.mp4",
      ctaButton: {
        text: "Start Implementation",
        icon: "M13 7l5 5m0 0l-5 5m5-5H6",
        variant: "primary",
      },
    },
  },

  // Common/Shared Components
  SEO: {
    componentName: "SEO",
    category: "seo",
    icon: "🔍",
    displayName: "SEO Meta Tags",
    description: "SEO meta tags and page optimization settings",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Page Title",
          placeholder: "Your Page Title | Bellatrix NetSuite Solutions",
          required: true,
          formField: "text",
        },
        description: {
          type: "string",
          label: "Meta Description",
          placeholder: "Page description for search engines and social sharing",
          required: true,
          formField: "textarea",
        },
        keywords: {
          type: "string",
          label: "Keywords",
          placeholder: "NetSuite, ERP, implementation, consulting",
          formField: "text",
        },
        ogTitle: {
          type: "string",
          label: "Open Graph Title",
          placeholder: "Social sharing title",
          formField: "text",
        },
        ogDescription: {
          type: "string",
          label: "Open Graph Description",
          placeholder: "Social sharing description",
          formField: "textarea",
        },
        ogImage: {
          type: "string",
          label: "Open Graph Image",
          placeholder: "/images/social-share.jpg",
          formField: "media",
          mediaType: "image",
        },
        canonicalUrl: {
          type: "string",
          label: "Canonical URL",
          placeholder: "https://bellatrix.com/page-url",
          formField: "url",
        },
      },
    },
    defaultData: {
      title: "Bellatrix NetSuite Solutions",
      description:
        "Expert Oracle NetSuite consulting and implementation services to transform your business operations.",
      keywords:
        "NetSuite, ERP, Oracle, implementation, consulting, business transformation",
      ogTitle: "Bellatrix NetSuite Solutions",
      ogDescription:
        "Expert Oracle NetSuite consulting and implementation services",
      ogImage: "/images/social-share.jpg",
    },
  },

  // Remaining Services Components
  Training: {
    componentName: "Training",
    category: "services",
    icon: "📚",
    displayName: "Training Services",
    description: "NetSuite training programs and certification courses",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "NetSuite Training Programs",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder:
            "Comprehensive training to maximize your NetSuite investment",
          formField: "textarea",
        },
        trainingPrograms: {
          type: "array",
          label: "Training Programs",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Program Title",
                placeholder: "End User Training",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Program Description",
                placeholder: "Comprehensive training for daily NetSuite users",
                required: true,
                formField: "textarea",
              },
              duration: {
                type: "string",
                label: "Duration",
                placeholder: "2-3 weeks",
                formField: "text",
              },
              level: {
                type: "string",
                label: "Skill Level",
                formField: "select",
                options: [
                  { value: "Beginner", label: "Beginner Level" },
                  { value: "Intermediate", label: "Intermediate Level" },
                  { value: "Advanced", label: "Advanced Level" },
                  { value: "Expert", label: "Expert Level" },
                ],
              },
              format: {
                type: "string",
                label: "Training Format",
                formField: "select",
                options: [
                  { value: "Online", label: "Online Training" },
                  { value: "On-site", label: "On-site Training" },
                  { value: "Hybrid", label: "Hybrid Training" },
                  { value: "Self-paced", label: "Self-paced Learning" },
                ],
              },
              modules: {
                type: "array",
                label: "Training Modules",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
              certification: {
                type: "boolean",
                label: "Includes Certification",
                formField: "checkbox",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 10,
        },
        certifications: {
          type: "array",
          label: "Available Certifications",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                label: "Certification Name",
                placeholder: "NetSuite Administrator",
                required: true,
                formField: "text",
              },
              provider: {
                type: "string",
                label: "Certification Provider",
                placeholder: "Oracle",
                formField: "text",
              },
              difficulty: {
                type: "string",
                label: "Difficulty Level",
                formField: "select",
                options: ["Foundation", "Intermediate", "Advanced", "Expert"],
              },
              duration: {
                type: "string",
                label: "Preparation Time",
                placeholder: "4-6 weeks",
                formField: "text",
              },
            },
          },
          formField: "array",
        },
      },
    },
    defaultData: {
      title: "NetSuite Training Programs",
      subtitle: "Comprehensive training to maximize your NetSuite investment",
      trainingPrograms: [
        {
          title: "End User Training",
          description: "Comprehensive training for daily NetSuite users",
          duration: "2-3 weeks",
          level: "Beginner",
          format: "Online",
          modules: [
            "Navigation",
            "Basic Transactions",
            "Reporting",
            "Customer Management",
          ],
          certification: true,
        },
        {
          title: "Administrator Training",
          description: "Advanced training for NetSuite system administrators",
          duration: "4-6 weeks",
          level: "Advanced",
          format: "Hybrid",
          modules: [
            "System Setup",
            "User Management",
            "Customization",
            "Integration",
          ],
          certification: true,
        },
      ],
      certifications: [
        {
          name: "NetSuite Administrator",
          provider: "Oracle",
          difficulty: "Advanced",
          duration: "4-6 weeks",
        },
        {
          name: "NetSuite ERP Consultant",
          provider: "Oracle",
          difficulty: "Expert",
          duration: "8-12 weeks",
        },
      ],
    },
  },

  Migration: {
    componentName: "Migration",
    category: "services",
    icon: "🔄",
    displayName: "Data Migration Services",
    description: "Seamless data migration from legacy systems to NetSuite",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Data Migration Services",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder:
            "Seamless migration from your current system to NetSuite",
          formField: "textarea",
        },
        migrationTypes: {
          type: "array",
          label: "Migration Services",
          items: {
            type: "object",
            properties: {
              fromSystem: {
                type: "string",
                label: "Source System",
                placeholder: "QuickBooks",
                required: true,
                formField: "text",
              },
              dataTypes: {
                type: "array",
                label: "Data Types",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
              complexity: {
                type: "string",
                label: "Migration Complexity",
                formField: "select",
                options: [
                  { value: "Simple", label: "Simple Migration" },
                  { value: "Standard", label: "Standard Complexity" },
                  { value: "Complex", label: "Complex Migration" },
                  { value: "Enterprise", label: "Enterprise Level" },
                ],
              },
              timeline: {
                type: "string",
                label: "Migration Timeline",
                placeholder: "4-6 weeks",
                formField: "text",
              },
              dataVolume: {
                type: "string",
                label: "Typical Data Volume",
                placeholder: "Up to 100K records",
                formField: "text",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 10,
        },
        migrationProcess: {
          type: "object",
          label: "Migration Process",
          properties: {
            phases: {
              type: "array",
              label: "Process Phases",
              items: {
                type: "object",
                properties: {
                  phase: {
                    type: "string",
                    label: "Phase Name",
                    placeholder: "Data Assessment",
                    formField: "text",
                  },
                  description: {
                    type: "string",
                    label: "Phase Description",
                    placeholder: "Analyze source data quality and structure",
                    formField: "textarea",
                  },
                  duration: {
                    type: "string",
                    label: "Phase Duration",
                    placeholder: "1 week",
                    formField: "text",
                  },
                },
              },
              formField: "array",
            },
            tools: {
              type: "array",
              label: "Migration Tools",
              items: {
                type: "string",
                formField: "text",
              },
              formField: "array",
            },
            qualityChecks: {
              type: "array",
              label: "Quality Assurance Checks",
              items: {
                type: "string",
                formField: "text",
              },
              formField: "array",
            },
          },
          formField: "object",
        },
        supportedSystems: {
          type: "array",
          label: "Supported Source Systems",
          items: {
            type: "object",
            properties: {
              system: {
                type: "string",
                label: "System Name",
                placeholder: "QuickBooks Desktop",
                required: true,
                formField: "text",
              },
              category: {
                type: "string",
                label: "System Category",
                formField: "select",
                options: [
                  { value: "ERP", label: "ERP System" },
                  { value: "CRM", label: "CRM System" },
                  { value: "Accounting", label: "Accounting Software" },
                  { value: "E-commerce", label: "E-commerce Platform" },
                  { value: "Custom Database", label: "Custom Database" },
                ],
              },
              migrationComplexity: {
                type: "string",
                label: "Migration Complexity",
                formField: "select",
                options: [
                  { value: "Low", label: "Low Complexity" },
                  { value: "Medium", label: "Medium Complexity" },
                  { value: "High", label: "High Complexity" },
                ],
              },
              commonChallenges: {
                type: "array",
                label: "Common Challenges",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
            },
          },
          formField: "array",
        },
      },
    },
    defaultData: {
      title: "Data Migration Services",
      subtitle: "Seamless migration from your current system to NetSuite",
      migrationTypes: [
        {
          fromSystem: "QuickBooks Desktop/Online",
          dataTypes: [
            "Chart of Accounts",
            "Customers",
            "Vendors",
            "Items",
            "Transactions",
          ],
          complexity: "Standard",
          timeline: "4-6 weeks",
          dataVolume: "Up to 100K records",
        },
        {
          fromSystem: "Excel/CSV Files",
          dataTypes: [
            "Master Data",
            "Historical Transactions",
            "Contact Lists",
          ],
          complexity: "Simple",
          timeline: "2-3 weeks",
          dataVolume: "Up to 50K records",
        },
        {
          fromSystem: "Legacy ERP Systems",
          dataTypes: ["Complete Business Data", "Workflows", "Custom Fields"],
          complexity: "Enterprise",
          timeline: "12-16 weeks",
          dataVolume: "1M+ records",
        },
      ],
      migrationProcess: {
        phases: [
          {
            phase: "Data Assessment",
            description: "Analyze source data quality and structure",
            duration: "1 week",
          },
          {
            phase: "Mapping & Design",
            description: "Map source fields to NetSuite structure",
            duration: "1-2 weeks",
          },
          {
            phase: "Data Cleansing",
            description: "Clean and prepare data for migration",
            duration: "1-2 weeks",
          },
          {
            phase: "Migration Testing",
            description: "Test migration with sample data",
            duration: "1 week",
          },
          {
            phase: "Production Migration",
            description: "Execute final data migration",
            duration: "1 week",
          },
        ],
        tools: [
          "CSV Import",
          "SuiteScript",
          "Third-party Connectors",
          "Custom ETL Scripts",
        ],
        qualityChecks: [
          "Data Validation",
          "Completeness Check",
          "Accuracy Verification",
          "Integrity Testing",
        ],
      },
      supportedSystems: [
        {
          system: "QuickBooks Desktop/Online",
          category: "Accounting",
          migrationComplexity: "Medium",
          commonChallenges: [
            "Chart of Account Mapping",
            "Transaction History",
            "Multi-currency",
          ],
        },
        {
          system: "Sage 50/100/300",
          category: "ERP",
          migrationComplexity: "High",
          commonChallenges: [
            "Complex Data Structure",
            "Custom Fields",
            "Multi-company",
          ],
        },
        {
          system: "Salesforce CRM",
          category: "CRM",
          migrationComplexity: "Medium",
          commonChallenges: [
            "Custom Objects",
            "Relationship Mapping",
            "Workflow Rules",
          ],
        },
      ],
    },
  },

  Analytics: {
    componentName: "Analytics",
    category: "services",
    icon: "📊",
    displayName: "Analytics & Reporting Services",
    description:
      "Advanced analytics and custom reporting solutions for NetSuite",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          label: "Section Title",
          placeholder: "Analytics & Reporting Services",
          required: true,
          formField: "text",
        },
        subtitle: {
          type: "string",
          label: "Section Subtitle",
          placeholder: "Transform your data into actionable business insights",
          formField: "textarea",
        },
        analyticsServices: {
          type: "array",
          label: "Analytics Services",
          items: {
            type: "object",
            properties: {
              service: {
                type: "string",
                label: "Service Name",
                placeholder: "Custom Dashboard Development",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Service Description",
                placeholder:
                  "Create interactive dashboards with key business metrics",
                required: true,
                formField: "textarea",
              },
              deliverables: {
                type: "array",
                label: "Key Deliverables",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
              timeline: {
                type: "string",
                label: "Implementation Timeline",
                placeholder: "3-4 weeks",
                formField: "text",
              },
              tools: {
                type: "array",
                label: "Tools & Technologies",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
            },
          },
          formField: "array",
          minItems: 1,
          maxItems: 8,
        },
        reportTypes: {
          type: "array",
          label: "Report Categories",
          items: {
            type: "object",
            properties: {
              category: {
                type: "string",
                label: "Report Category",
                placeholder: "Financial Reports",
                required: true,
                formField: "text",
              },
              reports: {
                type: "array",
                label: "Available Reports",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
              businessValue: {
                type: "string",
                label: "Business Value",
                placeholder:
                  "Real-time financial insights for better decision making",
                formField: "textarea",
              },
            },
          },
          formField: "array",
        },
        dashboardFeatures: {
          type: "array",
          label: "Dashboard Features",
          items: {
            type: "object",
            properties: {
              feature: {
                type: "string",
                label: "Feature Name",
                placeholder: "Real-time KPI Monitoring",
                required: true,
                formField: "text",
              },
              description: {
                type: "string",
                label: "Feature Description",
                placeholder: "Monitor key performance indicators in real-time",
                formField: "textarea",
              },
              benefits: {
                type: "array",
                label: "Key Benefits",
                items: {
                  type: "string",
                  formField: "text",
                },
                formField: "array",
              },
            },
          },
          formField: "array",
        },
      },
    },
    defaultData: {
      title: "Analytics & Reporting Services",
      subtitle: "Transform your data into actionable business insights",
      analyticsServices: [
        {
          service: "Custom Dashboard Development",
          description:
            "Create interactive dashboards with key business metrics and KPIs",
          deliverables: [
            "Executive Dashboard",
            "Departmental Dashboards",
            "Mobile Dashboards",
            "Training Documentation",
          ],
          timeline: "3-4 weeks",
          tools: [
            "SuiteAnalytics",
            "SuiteScript",
            "Workbook Builder",
            "Custom Portlets",
          ],
        },
        {
          service: "Advanced Reporting Solutions",
          description:
            "Develop complex reports with drill-down capabilities and automated distribution",
          deliverables: [
            "Custom Reports",
            "Saved Searches",
            "Email Alerts",
            "Report Scheduling",
          ],
          timeline: "2-3 weeks",
          tools: [
            "Report Builder",
            "SuiteQL",
            "Saved Searches",
            "SuiteAnalytics Workbook",
          ],
        },
        {
          service: "KPI Monitoring Systems",
          description:
            "Set up automated KPI tracking with alerts and notifications",
          deliverables: [
            "KPI Framework",
            "Alert System",
            "Performance Metrics",
            "Trending Analysis",
          ],
          timeline: "4-5 weeks",
          tools: [
            "SuiteAnalytics",
            "Workflow Alerts",
            "Custom Records",
            "Portlets",
          ],
        },
      ],
      reportTypes: [
        {
          category: "Financial Reports",
          reports: [
            "P&L Analysis",
            "Cash Flow Reports",
            "Budget vs Actual",
            "Revenue Recognition",
            "Cost Analysis",
          ],
          businessValue:
            "Real-time financial insights for better decision making and compliance",
        },
        {
          category: "Sales Analytics",
          reports: [
            "Sales Performance",
            "Pipeline Analysis",
            "Customer Profitability",
            "Territory Analysis",
            "Forecasting",
          ],
          businessValue:
            "Optimize sales processes and improve revenue predictability",
        },
        {
          category: "Operations Reports",
          reports: [
            "Inventory Analysis",
            "Order Fulfillment",
            "Supplier Performance",
            "Production Metrics",
            "Quality Control",
          ],
          businessValue:
            "Streamline operations and reduce costs through data-driven insights",
        },
      ],
      dashboardFeatures: [
        {
          feature: "Real-time KPI Monitoring",
          description:
            "Monitor key performance indicators with live data updates",
          benefits: [
            "Immediate Issue Detection",
            "Proactive Decision Making",
            "Performance Tracking",
          ],
        },
        {
          feature: "Interactive Drill-down",
          description:
            "Click through summary data to detailed transaction information",
          benefits: [
            "Root Cause Analysis",
            "Detailed Investigation",
            "Enhanced Understanding",
          ],
        },
        {
          feature: "Mobile Accessibility",
          description: "Access dashboards and reports from any mobile device",
          benefits: [
            "Remote Monitoring",
            "On-the-go Insights",
            "Flexible Access",
          ],
        },
      ],
    },
  },
};

/**
 * Get schema for a specific general component
 * @param {string} componentType - The component type name
 * @returns {Object} Component schema with metadata
 */
export const getGeneralComponentSchema = (componentType) => {
  return generalComponentSchemas[componentType] || null;
};

/**
 * Get all general components for the registry
 * @returns {Array} Array of component definitions
 */
export const getAllGeneralComponents = () => {
  return Object.entries(generalComponentSchemas).map(
    ([componentType, schema]) => ({
      id: componentType,
      name: schema.displayName,
      description: schema.description,
      icon: schema.icon,
      componentType,
      componentName: schema.componentName,
      category: schema.category,
      hasEnhancedSchema: true,
      schema: schema.schema,
      defaultData: schema.defaultData,
    })
  );
};
