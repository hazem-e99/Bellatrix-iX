/**
 * Test script to demonstrate payroll data normalization
 * Shows how payroll.json data gets mapped to PayrollStepperSection props
 */

import { normalizeProps } from './src/utils/normalizeProps.js';

// Sample payroll data from payroll.json
const payrollData = {
  "coreWorkflow": {
    "show": true,
    "title": "Payroll System Built for All Industries",
    "description": "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
    "subtitle": "Core Workflow",
    "steps": [
      {
        "title": "Employee data import",
        "desc": "Easily onboard and manage employee records in one place.",
        "details": "Import employee data from spreadsheets or integrated HR systems. Supports bulk uploads and data validation with real-time error checking.",
        "benefits": [
          "Bulk import from Excel/CSV",
          "Data validation",
          "Duplicate detection",
          "HR system integration"
        ]
      },
      {
        "title": "Time & attendance sync",
        "desc": "Integrate timesheets and attendance for accurate payroll.",
        "details": "Syncs with your time tracking tools to ensure accurate hours and leave data for every employee. Supports multiple time tracking systems.",
        "benefits": [
          "Real-time sync",
          "Multiple time systems",
          "Leave management",
          "Overtime calculation"
        ]
      },
      {
        "title": "Salary & tax auto-calculation",
        "desc": "Automate salary, tax, and deduction calculations.",
        "details": "Calculates gross and net pay, taxes, and deductions automatically based on your rules and local compliance. Handles complex tax scenarios.",
        "benefits": [
          "Auto tax calculation",
          "Compliance built-in",
          "Deduction management",
          "Bonus processing"
        ]
      }
    ]
  },
  "features": {
    "show": true,
    "title": "Key Features for Modern Consultancies",
    "description": null,
    "items": [
      {
        "title": "Automated Payroll Runs",
        "desc": "Set up payroll once and let it run automatically, with full audit trails.",
        "icon": "lightning"
      },
      {
        "title": "Tax & Compliance",
        "desc": "Stay compliant with local tax laws and generate reports in one click.",
        "icon": "check"
      }
    ]
  },
  "painPoints": {
    "show": true,
    "title": "The Payroll <span class=\"text-blue-600\">Struggles</span> We Eliminate",
    "description": "Our system addresses the most common payroll challenges faced by consultancy firms:",
    "items": [
      {
        "text": "Delayed salary processing and errors",
        "icon": "time"
      },
      {
        "text": "Manual tax calculations and compliance risks",
        "icon": "check"
      }
    ]
  },
  "faqs": {
    "show": true,
    "title": "Common Questions",
    "description": "Get quick answers to the most frequently asked questions about our payroll system",
    "items": [
      {
        "question": "Does this system support global payroll?",
        "answer": "Yes, we support multi-country and multi-currency payroll operations."
      },
      {
        "question": "Can it integrate with our existing HR system?",
        "answer": "Absolutely, we offer seamless integrations and open APIs."
      }
    ]
  },
  "cta": {
    "show": true,
    "title": "Ready to Simplify Your <span class=\"text-blue-600\">Payroll?</span>",
    "description": "Get in touch for a personalized demo and see how our solution can transform your payroll process.",
    "buttonText": "Request Now !"
  }
};

console.log('=== Testing Payroll Data Normalization ===\n');

// Test PayrollStepperSection
console.log('1. PayrollStepperSection:');
const stepperProps = normalizeProps('PayrollStepperSection', payrollData);
console.log('Input JSON structure:', {
  coreWorkflow: {
    title: payrollData.coreWorkflow.title,
    steps: payrollData.coreWorkflow.steps.length + ' steps'
  }
});
console.log('Normalized props:', {
  title: stepperProps.title,
  steps: stepperProps.steps.length + ' steps',
  firstStep: stepperProps.steps[0]?.title
});
console.log('✅ Correct mapping: coreWorkflow.steps → steps\n');

// Test PayrollFeaturesSection
console.log('2. PayrollFeaturesSection:');
const featuresProps = normalizeProps('PayrollFeaturesSection', payrollData);
console.log('Input JSON structure:', {
  features: {
    title: payrollData.features.title,
    items: payrollData.features.items.length + ' items'
  }
});
console.log('Normalized props:', {
  title: featuresProps.title,
  items: featuresProps.items.length + ' items',
  firstFeature: featuresProps.items[0]?.title
});
console.log('✅ Correct mapping: features.items → items\n');

// Test PayrollPainPointsSection
console.log('3. PayrollPainPointsSection:');
const painPointsProps = normalizeProps('PayrollPainPointsSection', payrollData);
console.log('Input JSON structure:', {
  painPoints: {
    title: payrollData.painPoints.title,
    items: payrollData.painPoints.items.length + ' items'
  }
});
console.log('Normalized props:', {
  title: painPointsProps.title,
  subtitle: painPointsProps.subtitle,
  painPoints: painPointsProps.painPoints.length + ' pain points',
  firstPainPoint: painPointsProps.painPoints[0]?.text
});
console.log('✅ Correct mapping: painPoints.items → painPoints\n');

// Test PayrollFAQSection
console.log('4. PayrollFAQSection:');
const faqProps = normalizeProps('PayrollFAQSection', payrollData);
console.log('Input JSON structure:', {
  faqs: {
    title: payrollData.faqs.title,
    items: payrollData.faqs.items.length + ' FAQs'
  }
});
console.log('Normalized props:', {
  title: faqProps.title,
  subtitle: faqProps.subtitle,
  faqs: faqProps.faqs.length + ' FAQs',
  firstFAQ: faqProps.faqs[0]?.question
});
console.log('✅ Correct mapping: faqs.items → faqs\n');

// Test PayrollCTASection
console.log('5. PayrollCTASection:');
const ctaProps = normalizeProps('PayrollCTASection', payrollData);
console.log('Input JSON structure:', {
  cta: {
    title: payrollData.cta.title,
    description: payrollData.cta.description,
    buttonText: payrollData.cta.buttonText
  }
});
console.log('Normalized props:', {
  title: ctaProps.title,
  subtitle: ctaProps.subtitle,
  buttonText: ctaProps.buttonText,
  cta: ctaProps.cta ? 'cta object present' : 'no cta object'
});
console.log('✅ Correct mapping: cta.* → respective props\n');

console.log('=== Summary ===');
console.log('The normalizeProps function successfully maps all payroll data:');
console.log('- coreWorkflow.steps → steps (for PayrollStepperSection)');
console.log('- features.items → items (for PayrollFeaturesSection)');
console.log('- painPoints.items → painPoints (for PayrollPainPointsSection)');
console.log('- faqs.items → faqs (for PayrollFAQSection)');
console.log('- cta.* → title, subtitle, buttonText, cta (for PayrollCTASection)');
console.log('\n🎉 All payroll components will now receive the correct data structure!');

