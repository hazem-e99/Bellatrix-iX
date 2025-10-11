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
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Streamline operations with our intelligent payroll system",
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our comprehensive payroll solution...",
          formField: "textarea"
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder: "/images/payroll-hero.jpg",
          formField: "media",
          mediaType: "image"
        }
      }
    },
    defaultData: {
      title: "Transform Your Payroll Process",
      subtitle: "Streamline operations with our intelligent payroll system",
      description: "Our comprehensive payroll solution automates complex processes and ensures accuracy.",
      backgroundImage: "/images/payroll-hero.jpg"
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our payroll process is simple and efficient",
          formField: "textarea"
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
                formField: "text"
              },
              description: {
                type: "string",
                label: "Step Description",
                formField: "textarea"
              },
              icon: {
                type: "string",
                label: "Icon",
                formField: "text"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "How It Works",
      description: "Our payroll process is simple and efficient",
      steps: [
        {
          title: "Data Input",
          description: "Enter employee data and hours",
          icon: "📝"
        },
        {
          title: "Processing",
          description: "System calculates payroll automatically",
          icon: "⚙️"
        },
        {
          title: "Approval",
          description: "Review and approve payroll",
          icon: "✅"
        }
      ]
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our streamlined workflow process",
          formField: "textarea"
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
                formField: "text"
              },
              stepDescription: {
                type: "string",
                label: "Step Description",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Workflow Process",
      description: "Our streamlined workflow process",
      workflowSteps: [
        {
          stepTitle: "Data Collection",
          stepDescription: "Collect employee data and time records"
        },
        {
          stepTitle: "Calculation",
          stepDescription: "Calculate salaries and deductions"
        },
        {
          stepTitle: "Review",
          stepDescription: "Review and validate calculations"
        }
      ]
    }
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
          formField: "text"
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
                formField: "text"
              },
              description: {
                type: "string",
                label: "Step Description",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Process Steps",
      steps: [
        {
          title: "Step 1",
          description: "First step description"
        },
        {
          title: "Step 2",
          description: "Second step description"
        }
      ]
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "We solve these common challenges",
          formField: "textarea"
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
                formField: "text"
              },
              description: {
                type: "string",
                label: "Pain Point Description",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Common Challenges",
      description: "We solve these common challenges",
      painPoints: [
        {
          title: "Manual Processing",
          description: "Time-consuming manual payroll processing"
        },
        {
          title: "Calculation Errors",
          description: "Human errors in salary calculations"
        }
      ]
    }
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
          formField: "text"
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
                formField: "text"
              },
              answer: {
                type: "string",
                label: "Answer",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Frequently Asked Questions",
      faqItems: [
        {
          question: "How does the payroll system work?",
          answer: "Our system automates the entire payroll process..."
        },
        {
          question: "Is it secure?",
          answer: "Yes, we use enterprise-grade security..."
        }
      ]
    }
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
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Get started today",
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Contact us to learn more",
          formField: "textarea"
        },
        ctaButton: {
          type: "object",
          label: "CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              formField: "text"
            },
            link: {
              type: "string",
              label: "Button Link",
              formField: "text"
            }
          }
        }
      }
    },
    defaultData: {
      title: "Ready to Transform Your Payroll?",
      subtitle: "Get started today",
      description: "Contact us to learn more about our payroll solution",
      ctaButton: {
        text: "Get Started",
        link: "/contact"
      }
    }
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
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Streamline your human resources",
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Our comprehensive HR solution...",
          formField: "textarea"
        },
        backgroundImage: {
          type: "string",
          label: "Background Image URL",
          placeholder: "/images/hr-hero.jpg",
          formField: "media",
          mediaType: "image"
        }
      }
    },
    defaultData: {
      title: "Transform Your HR Management",
      subtitle: "Streamline your human resources",
      description: "Our comprehensive HR solution simplifies employee management.",
      backgroundImage: "/images/hr-hero.jpg"
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Comprehensive HR modules",
          formField: "textarea"
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
                formField: "text"
              },
              description: {
                type: "string",
                label: "Module Description",
                formField: "textarea"
              },
              icon: {
                type: "string",
                label: "Icon",
                formField: "text"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "HR Modules",
      description: "Comprehensive HR modules",
      modules: [
        {
          title: "Employee Management",
          description: "Complete employee lifecycle management",
          icon: "👤"
        },
        {
          title: "Time Tracking",
          description: "Accurate time and attendance tracking",
          icon: "⏰"
        }
      ]
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Key benefits of our HR solution",
          formField: "textarea"
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
                formField: "text"
              },
              description: {
                type: "string",
                label: "Feature Description",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Benefits",
      description: "Key benefits of our HR solution",
      features: [
        {
          title: "Automation",
          description: "Automate routine HR tasks"
        },
        {
          title: "Compliance",
          description: "Ensure regulatory compliance"
        }
      ]
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Common use cases for our HR solution",
          formField: "textarea"
        },
        useCases: {
          type: "array",
          label: "Use Cases",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                label: "Use Case Title",
                formField: "text"
              },
              description: {
                type: "string",
                label: "Use Case Description",
                formField: "textarea"
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Use Cases",
      description: "Common use cases for our HR solution",
      useCases: [
        {
          title: "Small Business",
          description: "Perfect for small businesses"
        },
        {
          title: "Enterprise",
          description: "Scalable for large enterprises"
        }
      ]
    }
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
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Choose the right plan for your needs",
          formField: "textarea"
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
                formField: "text"
              },
              price: {
                type: "string",
                label: "Price",
                formField: "text"
              },
              description: {
                type: "string",
                label: "Plan Description",
                formField: "textarea"
              },
              features: {
                type: "array",
                label: "Features",
                items: {
                  type: "string",
                  formField: "text"
                }
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Pricing Plans",
      description: "Choose the right plan for your needs",
      pricing: [
        {
          name: "Basic",
          price: "$29/month",
          description: "Perfect for small teams",
          features: ["Up to 10 employees", "Basic features"]
        },
        {
          name: "Professional",
          price: "$59/month",
          description: "Ideal for growing businesses",
          features: ["Up to 50 employees", "Advanced features"]
        }
      ]
    }
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
          formField: "text"
        },
        faq: {
          type: "object",
          label: "FAQ Data",
          properties: {
            title: {
              type: "string",
              label: "FAQ Title",
              formField: "text"
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
                    formField: "text"
                  },
                  answer: {
                    type: "string",
                    label: "Answer",
                    formField: "textarea"
                  }
                }
              }
            }
          }
        }
      }
    },
    defaultData: {
      title: "Frequently Asked Questions",
      faq: {
        title: "HR Solution FAQ",
        items: [
          {
            question: "How does the HR system work?",
            answer: "Our HR system automates employee management..."
          },
          {
            question: "Is it secure?",
            answer: "Yes, we use enterprise-grade security..."
          }
        ]
      }
    }
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
          formField: "text"
        },
        subtitle: {
          type: "string",
          label: "Subtitle",
          placeholder: "Get started today",
          formField: "text"
        },
        description: {
          type: "string",
          label: "Description",
          placeholder: "Contact us to learn more",
          formField: "textarea"
        },
        ctaButton: {
          type: "object",
          label: "CTA Button",
          properties: {
            text: {
              type: "string",
              label: "Button Text",
              formField: "text"
            },
            link: {
              type: "string",
              label: "Button Link",
              formField: "text"
            }
          }
        }
      }
    },
    defaultData: {
      title: "Ready to Transform Your HR?",
      subtitle: "Get started today",
      description: "Contact us to learn more about our HR solution",
      ctaButton: {
        text: "Get Started",
        link: "/contact"
      }
    }
  }
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
  return Object.entries(generalComponentSchemas).map(([componentType, schema]) => ({
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
  }));
};
