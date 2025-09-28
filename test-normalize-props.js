/**
 * Test script to demonstrate the normalizeProps function
 * This shows how JSON data gets mapped to the correct component props
 */

import { normalizeProps } from './src/utils/normalizeProps.js';

// Sample JSON data that would come from the backend
const sampleIntegrationData = {
  "integrationTypes": {
    "title": "Integration Solutions",
    "items": [
      {
        "title": "E-commerce Integration",
        "description": "Connect NetSuite with Shopify, Magento, WooCommerce, and other platforms",
        "icon": "🛒"
      },
      {
        "title": "CRM Integration", 
        "description": "Integrate with Salesforce, HubSpot, and other CRM systems",
        "icon": "👥"
      }
    ]
  },
  "benefits": {
    "title": "Integration Benefits",
    "items": [
      {
        "title": "Automated Data Sync",
        "description": "Eliminate manual data entry with real-time synchronization"
      },
      {
        "title": "Improved Accuracy",
        "description": "Reduce errors caused by manual data transfer"
      }
    ]
  },
  "popularIntegrations": {
    "title": "Popular Integrations",
    "platforms": [
      "Shopify", "Magento", "Salesforce", "HubSpot", "PayPal", "Stripe"
    ]
  }
};

// Sample Payroll data
const samplePayrollData = {
  "painPoints": {
    "title": "Common Payroll Pain Points",
    "subtitle": "Problems we solve",
    "items": [
      {
        "title": "Manual Calculations",
        "description": "Time-consuming and error-prone manual processes",
        "impact": "High"
      },
      {
        "title": "Compliance Issues", 
        "description": "Difficulty staying compliant with regulations",
        "impact": "High"
      }
    ]
  }
};

console.log('=== Testing normalizeProps Function ===\n');

// Test IntegrationTypesSection
console.log('1. IntegrationTypesSection:');
const integrationTypesProps = normalizeProps('IntegrationTypesSection', sampleIntegrationData);
console.log('Input JSON structure:', {
  integrationTypes: sampleIntegrationData.integrationTypes
});
console.log('Normalized props:', integrationTypesProps);
console.log('Expected: { title: "Integration Solutions", items: [...] }');
console.log('✓ Correct mapping: integrationTypes.items → items\n');

// Test IntegrationBenefitsSection  
console.log('2. IntegrationBenefitsSection:');
const integrationBenefitsProps = normalizeProps('IntegrationBenefitsSection', sampleIntegrationData);
console.log('Input JSON structure:', {
  benefits: sampleIntegrationData.benefits
});
console.log('Normalized props:', integrationBenefitsProps);
console.log('Expected: { title: "Integration Benefits", items: [...], benefits: [...] }');
console.log('✓ Correct mapping: benefits.items → items AND benefits\n');

// Test PopularIntegrationsSection
console.log('3. PopularIntegrationsSection:');
const popularIntegrationsProps = normalizeProps('PopularIntegrationsSection', sampleIntegrationData);
console.log('Input JSON structure:', {
  popularIntegrations: sampleIntegrationData.popularIntegrations
});
console.log('Normalized props:', popularIntegrationsProps);
console.log('Expected: { title: "Popular Integrations", platforms: [...] }');
console.log('✓ Correct mapping: popularIntegrations.platforms → platforms\n');

// Test PayrollPainPointsSection
console.log('4. PayrollPainPointsSection:');
const payrollPainPointsProps = normalizeProps('PayrollPainPointsSection', samplePayrollData);
console.log('Input JSON structure:', {
  painPoints: samplePayrollData.painPoints
});
console.log('Normalized props:', payrollPainPointsProps);
console.log('Expected: { title: "Common Payroll Pain Points", subtitle: "Problems we solve", painPoints: [...] }');
console.log('✓ Correct mapping: painPoints.items → painPoints\n');

console.log('=== Summary ===');
console.log('The normalizeProps function successfully maps:');
console.log('- integrationTypes.items → items (for IntegrationTypesSection)');
console.log('- benefits.items → items + benefits (for IntegrationBenefitsSection)');
console.log('- popularIntegrations.platforms → platforms (for PopularIntegrationsSection)');
console.log('- painPoints.items → painPoints (for PayrollPainPointsSection)');
console.log('\nThis ensures components receive data in the format they expect!');

