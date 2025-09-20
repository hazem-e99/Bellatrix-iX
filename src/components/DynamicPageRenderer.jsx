import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

// Map componentId to componentPath
const getComponentPathFromId = (componentId) => {
  const idToPathMap = {
    'PayrollHeroSection': 'solution/payroll/PayrollHero',
    'PayrollHowItWorksSection': 'solution/payroll/PayrollHowItWorks',
    'PayrollWorkflowSection': 'solution/payroll/PayrollWorkflow',
    'PayrollStepperSection': 'solution/payroll/PayrollStepper',
    'PayrollPainPointsSection': 'solution/payroll/PayrollPainPoints',
    'PayrollFAQSection': 'solution/payroll/PayrollFAQ',
    'PayrollCTASection': 'solution/payroll/PayrollCTA',
    'HRHeroSection': 'solution/hr/HeroSection',
    'HRModulesSection': 'solution/hr/ModulesSection',
    'HRBenefitsSection': 'solution/hr/BenefitsSection',
    'HRUseCasesSection': 'solution/hr/UseCasesSection',
    'HRPricingSection': 'solution/hr/PricingSection',
    'HRFAQSection': 'solution/hr/FAQSection',
    'HRCTASection': 'solution/hr/CTASection',
    'ImplementationHeroSection': 'Services/Implementation/HeroSection',
    'ImplementationProcessSection': 'Services/Implementation/ProcessSection',
    'ImplementationWhyChooseSection': 'Services/Implementation/WhyChooseSection',
    'ImplementationPricingSection': 'Services/Implementation/PricingSection',
    'ImplementationCTASection': 'Services/Implementation/CtaSection',
    'TrainingHeroSection': 'Services/training/HeroSection',
    'TrainingProgramsSection': 'Services/training/TrainingPrograms',
    'TrainingWhyChooseSection': 'Services/training/WhyChooseSection',
    'IntegrationHeroSection': 'Services/Integration/HeroSection',
    'IntegrationTypesSection': 'Services/Integration/IntegrationTypes',
    'IntegrationBenefitsSection': 'Services/Integration/BenefitsSection',
    'CustomizationHeroSection': 'Services/Customization/HeroSection',
    'CustomizationServicesSection': 'Services/Customization/ServicesSection',
    'CustomizationProcessSection': 'Services/Customization/ProcessSection',
    'ManufacturingHeroSection': 'industries/Manufacturing/HeroSection',
    'ManufacturingIndustryStatsSection': 'industries/Manufacturing/IndustryStats',
    'ManufacturingChallengesSection': 'industries/Manufacturing/ChallengesSection',
    'ManufacturingSolutionsSection': 'industries/Manufacturing/SolutionsSection',
    'ManufacturingCaseStudiesSection': 'industries/Manufacturing/CaseStudies',
    'ManufacturingImplementationProcessSection': 'industries/Manufacturing/ImplementationProcess',
    'ManufacturingCTASection': 'industries/Manufacturing/CTASection',
    'RetailHeroSection': 'industries/retail/HeroSection',
    'RetailIndustryStatsSection': 'industries/retail/IndustryStats',
    'RetailChallengesSection': 'industries/retail/ChallengesSection',
    'RetailSolutionsSection': 'industries/retail/SolutionsSection',
    'RetailFeaturesSection': 'industries/retail/FeaturesSection',
    'RetailCaseStudiesSection': 'industries/retail/CaseStudiesSection',
    'RetailImplementationSection': 'industries/retail/ImplementationSection',
    'RetailCTASection': 'industries/retail/CTASection',
    'AboutHeroSection': 'About/AboutHero',
    'AboutMissionSection': 'About/AboutMission',
    'AboutValuesSection': 'About/AboutValues',
    'AboutTeamSection': 'About/AboutTeam',
    'AboutJourneySection': 'About/AboutJourney',
    'AboutMilestonesSection': 'About/AboutMilestones',
    'AboutDifferentiatorsSection': 'About/AboutDifferentiators',
    'AboutCTASection': 'About/AboutCTA',
  };
  
  return idToPathMap[componentId] || null;
};

// Dynamic component loader
const loadComponent = async (componentPath) => {
  try {
    // Map component paths to actual components
    const componentMap = {
      'solution/payroll/PayrollHero': () => import('./solution/payroll/PayrollHero'),
      'solution/payroll/PayrollHowItWorks': () => import('./solution/payroll/PayrollHowItWorks'),
      'solution/payroll/PayrollWorkflow': () => import('./solution/payroll/PayrollWorkflow'),
      'solution/payroll/PayrollStepper': () => import('./solution/payroll/PayrollStepper'),
      'solution/payroll/PayrollPainPoints': () => import('./solution/payroll/PayrollPainPoints'),
      'solution/payroll/PayrollFAQ': () => import('./solution/payroll/PayrollFAQ'),
      'solution/payroll/PayrollCTA': () => import('./solution/payroll/PayrollCTA'),
      'solution/hr/HeroSection': () => import('./solution/hr/HeroSection'),
      'solution/hr/ModulesSection': () => import('./solution/hr/ModulesSection'),
      'solution/hr/BenefitsSection': () => import('./solution/hr/BenefitsSection'),
      'solution/hr/UseCasesSection': () => import('./solution/hr/UseCasesSection'),
      'solution/hr/PricingSection': () => import('./solution/hr/PricingSection'),
      'solution/hr/FAQSection': () => import('./solution/hr/FAQSection'),
      'solution/hr/CTASection': () => import('./solution/hr/CTASection'),
      'Services/Implementation/HeroSection': () => import('./Services/Implementation/HeroSection'),
      'Services/Implementation/ProcessSection': () => import('./Services/Implementation/ProcessSection'),
      'Services/Implementation/WhyChooseSection': () => import('./Services/Implementation/WhyChooseSection'),
      'Services/Implementation/PricingSection': () => import('./Services/Implementation/PricingSection'),
      'Services/Implementation/CtaSection': () => import('./Services/Implementation/CtaSection'),
      'Services/training/HeroSection': () => import('./Services/training/HeroSection'),
      'Services/training/TrainingPrograms': () => import('./Services/training/TrainingPrograms'),
      'Services/training/WhyChooseSection': () => import('./Services/training/WhyChooseSection'),
      'Services/Integration/HeroSection': () => import('./Services/Integration/HeroSection'),
      'Services/Integration/IntegrationTypes': () => import('./Services/Integration/IntegrationTypes'),
      'Services/Integration/BenefitsSection': () => import('./Services/Integration/BenefitsSection'),
      'Services/Customization/HeroSection': () => import('./Services/Customization/HeroSection'),
      'Services/Customization/ServicesSection': () => import('./Services/Customization/ServicesSection'),
      'Services/Customization/ProcessSection': () => import('./Services/Customization/ProcessSection'),
      'industries/Manufacturing/HeroSection': () => import('./industries/Manufacturing/HeroSection'),
      'industries/Manufacturing/IndustryStats': () => import('./industries/Manufacturing/IndustryStats'),
      'industries/Manufacturing/ChallengesSection': () => import('./industries/Manufacturing/ChallengesSection'),
      'industries/Manufacturing/SolutionsSection': () => import('./industries/Manufacturing/SolutionsSection'),
      'industries/Manufacturing/CaseStudies': () => import('./industries/Manufacturing/CaseStudies'),
      'industries/Manufacturing/ImplementationProcess': () => import('./industries/Manufacturing/ImplementationProcess'),
      'industries/Manufacturing/CTASection': () => import('./industries/Manufacturing/CTASection'),
      'industries/retail/HeroSection': () => import('./industries/retail/HeroSection'),
      'industries/retail/IndustryStats': () => import('./industries/retail/IndustryStats'),
      'industries/retail/ChallengesSection': () => import('./industries/retail/ChallengesSection'),
      'industries/retail/SolutionsSection': () => import('./industries/retail/SolutionsSection'),
      'industries/retail/FeaturesSection': () => import('./industries/retail/FeaturesSection'),
      'industries/retail/CaseStudiesSection': () => import('./industries/retail/CaseStudiesSection'),
      'industries/retail/ImplementationSection': () => import('./industries/retail/ImplementationSection'),
      'industries/retail/CTASection': () => import('./industries/retail/CTASection'),
      'About/AboutHero': () => import('./About/AboutHero'),
      'About/AboutMission': () => import('./About/AboutMission'),
      'About/AboutValues': () => import('./About/AboutValues'),
      'About/AboutTeam': () => import('./About/AboutTeam'),
      'About/AboutJourney': () => import('./About/AboutJourney'),
      'About/AboutMilestones': () => import('./About/AboutMilestones'),
      'About/AboutDifferentiators': () => import('./About/AboutDifferentiators'),
      'About/AboutCTA': () => import('./About/AboutCTA'),
    };

    const loader = componentMap[componentPath];
    if (!loader) {
      throw new Error(`Component not found: ${componentPath}`);
    }

    const module = await loader();
    return module.default;
  } catch (error) {
    console.error(`Failed to load component ${componentPath}:`, error);
    return null;
  }
};

const DynamicPageRenderer = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3001/api/pages/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Page not found');
          } else {
            throw new Error('Failed to fetch page');
          }
          return;
        }

        const data = await response.json();
        const pageData = data.data;
        setPageData(pageData); // Extract the actual page data from the response
        
        // Load components for each section
        if (pageData.sections && pageData.sections.length > 0) {
          const componentPromises = pageData.sections.map(async (section) => {
            // Try componentPath first, then fallback to componentId mapping
            const componentPath = section.componentPath || getComponentPathFromId(section.componentId);
            if (componentPath) {
              const Component = await loadComponent(componentPath);
              return { sectionId: section.uid, Component };
            }
            return { sectionId: section.uid, Component: null };
          });
          
          const loadedComponents = await Promise.all(componentPromises);
          const componentMap = {};
          loadedComponents.forEach(({ sectionId, Component }) => {
            if (Component) {
              componentMap[sectionId] = Component;
            }
          });
          setLoadedComponents(componentMap);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-4">The page "{slug}" could not be found.</p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No page data available.</p>
        </div>
      </div>
    );
  }

  // Transform props to match component expectations
  const transformProps = (componentId, props) => {
    switch (componentId) {
      case 'PayrollWorkflowSection':
        return {
          workflowData: {
            title: props.title,
            description: props.subtitle,
            steps: props.workflow
          }
        };
      case 'PayrollStepperSection':
        return {
          steps: props.steps
        };
      case 'PayrollHowItWorksSection':
        return {
          data: {
            title: props.title,
            description: props.subtitle,
            steps: props.steps
          }
        };
      default:
        return props;
    }
  };

  // Render page sections dynamically using actual components
  const renderSection = (section, index) => {
    const Component = loadedComponents[section.uid];
    
    if (Component) {
      // Transform props to match component expectations
      const transformedProps = transformProps(section.componentId, section.props);
      
      // Render the actual component with its original styling - no wrapper
      return <Component key={section.uid || index} {...transformedProps} />;
    }
    
    // Fallback: render a placeholder if component couldn't be loaded
    return (
      <div key={section.uid || index} className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{section.icon || "📄"}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {section.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {section.componentId} (Component not found)
              </p>
            </div>
          </div>
          
          {/* Render section content based on props */}
          <div className="space-y-4">
            {section.props?.title && (
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {section.props.title}
              </h3>
            )}
            
            {section.props?.subtitle && (
              <p className="text-gray-600 dark:text-gray-300">
                {section.props.subtitle}
              </p>
            )}
            
            {section.props?.description && (
              <p className="text-gray-600 dark:text-gray-300">
                {section.props.description}
              </p>
            )}
            
            {/* Render arrays like features, steps, etc. */}
            {section.props?.features && Array.isArray(section.props.features) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.props.features.map((feature, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {feature.title || feature.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Render workflow arrays */}
            {section.props?.workflow && Array.isArray(section.props.workflow) && (
              <div className="space-y-3">
                {section.props.workflow.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {item.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {section.props?.steps && Array.isArray(section.props.steps) && (
              <div className="space-y-3">
                {section.props.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {step.number || step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {section.props?.ctaText && (
              <div className="pt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {section.props.ctaText}
                </button>
              </div>
            )}
            
            {/* Background Image */}
            {section.props?.backgroundImage && (
              <div className="mt-4">
                <img 
                  src={section.props.backgroundImage} 
                  alt={section.props.title || section.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Render sections directly without any wrapper - let each component handle its own styling */}
      {pageData.sections && pageData.sections.length > 0 ? (
        pageData.sections.map((section, index) => renderSection(section, index))
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No sections found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This page doesn't have any sections yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPageRenderer;
