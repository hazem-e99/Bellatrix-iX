// Component Discovery Utility
// This utility helps discover and categorize reusable components across the project

export const getSharedComponents = () => {
  // Based on the analysis, here are the main shared/reusable components
  return [
    // Hero Sections
    {
      id: 'hero-main',
      name: 'Main Hero Section',
      category: 'Hero Sections',
      type: 'component',
      description: 'Homepage hero with video background and animated content',
      path: '/src/components/Hero.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      variations: [
        'Video Background',
        'Animated Text',
        'Slide Navigation'
      ],
      usedIn: ['Homepage'],
      lastModified: '2024-01-15',
      status: 'active',
      tags: ['hero', 'video', 'animation', 'homepage'],
      author: 'Development Team',
      version: '2.1'
    },
    {
      id: 'hero-services',
      name: 'Services Hero Section',
      category: 'Hero Sections',
      type: 'component',
      description: 'Service page hero with gradient background and animated elements',
      path: '/src/components/Services/Implementation/HeroSection.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      variations: [
        'Gradient Backgrounds',
        'Floating Elements',
        'Creative Overlays'
      ],
      usedIn: ['Implementation', 'Training', 'NetSuite Consulting'],
      lastModified: '2024-01-14',
      status: 'active',
      tags: ['hero', 'services', 'gradient', 'animation'],
      author: 'Development Team',
      version: '1.8'
    },
    {
      id: 'hero-solution',
      name: 'Solution Hero Section',
      category: 'Hero Sections',
      type: 'component',
      description: 'Multi-variant hero section for solution pages (HR, Payroll)',
      path: '/src/components/solution/common/HeroSection.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
      variations: [
        'Image Background (HR)',
        'Video Background (Payroll)',
        'Gradient Background'
      ],
      usedIn: ['HR Solution', 'Payroll'],
      lastModified: '2024-01-16',
      status: 'active',
      tags: ['hero', 'solution', 'multi-variant', 'hr', 'payroll'],
      author: 'Development Team',
      version: '3.0'
    },
    {
      id: 'hero-industry',
      name: 'Industry Hero Section',
      category: 'Hero Sections',
      type: 'component',
      description: 'Industry-specific hero sections with customizable backgrounds',
      path: '/src/components/industries/retail/HeroSection.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      variations: [
        'Retail Version',
        'Manufacturing Version',
        'Custom Industry Themes'
      ],
      usedIn: ['Retail', 'Manufacturing'],
      lastModified: '2024-01-12',
      status: 'active',
      tags: ['hero', 'industry', 'retail', 'manufacturing'],
      author: 'Development Team',
      version: '1.5'
    },

    // Cards & Features
    {
      id: 'feature-cards',
      name: 'Feature Cards',
      category: 'Cards & Features',
      type: 'component',
      description: 'Reusable feature cards with icons and descriptions',
      path: '/src/components/solution/common/FeatureCards.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=300&fit=crop',
      variations: [
        'Grid Layout',
        'List Layout',
        'Icon Variations'
      ],
      usedIn: ['HR Solution', 'Payroll', 'Services'],
      lastModified: '2024-01-13',
      status: 'active',
      tags: ['cards', 'features', 'grid', 'icons'],
      author: 'UI Team',
      version: '2.0'
    },
    {
      id: 'service-cards',
      name: 'Service Cards',
      category: 'Cards & Features',
      type: 'component',
      description: 'Professional service showcase cards',
      path: '/src/components/ProfessionalServices.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      variations: [
        'Hover Effects',
        'Icon Integration',
        'Service Links'
      ],
      usedIn: ['Homepage', 'Services'],
      lastModified: '2024-01-11',
      status: 'active',
      tags: ['cards', 'services', 'professional', 'hover'],
      author: 'UI Team',
      version: '1.7'
    },

    // Layout Components
    {
      id: 'navbar',
      name: 'Navigation Bar',
      category: 'Layout & Navigation',
      type: 'component',
      description: 'Responsive navigation with dropdown menus',
      path: '/src/components/Navbar.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      variations: [
        'Desktop Layout',
        'Mobile Responsive',
        'Dropdown Menus'
      ],
      usedIn: ['All Pages'],
      lastModified: '2024-01-16',
      status: 'active',
      tags: ['navigation', 'navbar', 'responsive', 'menu'],
      author: 'UI Team',
      version: '3.2'
    },
    {
      id: 'footer',
      name: 'Footer Section',
      category: 'Layout & Navigation',
      type: 'component',
      description: 'Site-wide footer with links and contact information',
      path: '/src/components/Footer.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
      variations: [
        'Multi-column Layout',
        'Social Links',
        'Contact Info'
      ],
      usedIn: ['All Pages'],
      lastModified: '2024-01-10',
      status: 'active',
      tags: ['footer', 'layout', 'links', 'contact'],
      author: 'UI Team',
      version: '2.5'
    },

    // Content Sections
    {
      id: 'about-sections',
      name: 'About Sections',
      category: 'Content Sections',
      type: 'component',
      description: 'Modular about page sections (Values, Team, Mission, Journey)',
      path: '/src/components/About/',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      variations: [
        'About Values',
        'About Team',
        'About Mission',
        'About Journey'
      ],
      usedIn: ['About Page'],
      lastModified: '2024-01-14',
      status: 'active',
      tags: ['about', 'content', 'modular', 'company'],
      author: 'Content Team',
      version: '1.9'
    },
    {
      id: 'testimonials',
      name: 'Testimonials Section',
      category: 'Content Sections',
      type: 'component',
      description: 'Customer testimonials with rating system',
      path: '/src/components/Testimonials.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      variations: [
        'Carousel View',
        'Grid View',
        'Rating Stars'
      ],
      usedIn: ['Homepage', 'Services'],
      lastModified: '2024-01-12',
      status: 'active',
      tags: ['testimonials', 'reviews', 'carousel', 'ratings'],
      author: 'Content Team',
      version: '2.3'
    },

    // Interactive Components
    {
      id: 'contact-form',
      name: 'Contact Form',
      category: 'Forms & Interaction',
      type: 'component',
      description: 'Multi-purpose contact form with validation',
      path: '/src/components/ContactForm.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
      variations: [
        'Basic Contact',
        'Service Inquiry',
        'Demo Request'
      ],
      usedIn: ['Contact', 'Services', 'Modals'],
      lastModified: '2024-01-15',
      status: 'active',
      tags: ['form', 'contact', 'validation', 'inquiry'],
      author: 'Development Team',
      version: '2.8'
    },
    {
      id: 'modal-components',
      name: 'Modal Components',
      category: 'Forms & Interaction',
      type: 'component',
      description: 'Reusable modal system with various content types',
      path: '/src/components/Modal.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop',
      variations: [
        'Demo Modal',
        'Contact Modal',
        'Confirmation Modal'
      ],
      usedIn: ['Multiple Pages'],
      lastModified: '2024-01-13',
      status: 'active',
      tags: ['modal', 'popup', 'overlay', 'interaction'],
      author: 'UI Team',
      version: '1.6'
    },

    // Dashboard Components
    {
      id: 'dashboard-cards',
      name: 'Dashboard Cards',
      category: 'Dashboard & Admin',
      type: 'component',
      description: 'Admin dashboard cards and widgets',
      path: '/src/components/Dashboard/',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      variations: [
        'Stat Cards',
        'Chart Widgets',
        'Action Cards'
      ],
      usedIn: ['Admin Dashboard'],
      lastModified: '2024-01-16',
      status: 'active',
      tags: ['dashboard', 'admin', 'cards', 'widgets'],
      author: 'Admin Team',
      version: '3.1'
    },
    {
      id: 'table-components',
      name: 'Data Tables',
      category: 'Dashboard & Admin',
      type: 'component',
      description: 'Reusable data table components with sorting and filtering',
      path: '/src/components/UI/Table.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      variations: [
        'Sortable Columns',
        'Filtering',
        'Pagination'
      ],
      usedIn: ['Admin Pages', 'Templates Management'],
      lastModified: '2024-01-14',
      status: 'active',
      tags: ['table', 'data', 'sorting', 'filtering'],
      author: 'Admin Team',
      version: '2.4'
    },

    // UI Components
    {
      id: 'button-system',
      name: 'Button Components',
      category: 'UI Elements',
      type: 'component',
      description: 'Comprehensive button system with variants',
      path: '/src/components/UI/Button.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=300&fit=crop',
      variations: [
        'Primary/Secondary',
        'Sizes (sm, md, lg)',
        'Loading States',
        'Icon Buttons'
      ],
      usedIn: ['All Pages'],
      lastModified: '2024-01-15',
      status: 'active',
      tags: ['buttons', 'ui', 'variants', 'design-system'],
      author: 'UI Team',
      version: '4.0'
    },
    {
      id: 'input-system',
      name: 'Input Components',
      category: 'UI Elements',
      type: 'component',
      description: 'Form input components with validation',
      path: '/src/components/UI/Input.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
      variations: [
        'Text Inputs',
        'Select Dropdowns',
        'Search Inputs',
        'Validation States'
      ],
      usedIn: ['Forms', 'Admin'],
      lastModified: '2024-01-14',
      status: 'active',
      tags: ['inputs', 'forms', 'validation', 'ui'],
      author: 'UI Team',
      version: '3.5'
    },

    // Specialized Components
    {
      id: 'cta-sections',
      name: 'Call-to-Action Sections',
      category: 'Marketing & CTA',
      type: 'component',
      description: 'Various CTA section designs for conversion',
      path: '/src/components/solution/common/CTASection.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      variations: [
        'Simple CTA',
        'Feature-rich CTA',
        'Demo Request CTA'
      ],
      usedIn: ['Solution Pages', 'Services'],
      lastModified: '2024-01-13',
      status: 'active',
      tags: ['cta', 'conversion', 'marketing', 'action'],
      author: 'Marketing Team',
      version: '2.1'
    },
    {
      id: 'faq-sections',
      name: 'FAQ Sections',
      category: 'Content Sections',
      type: 'component',
      description: 'Expandable FAQ sections with accordion',
      path: '/src/components/solution/common/FAQSection.jsx',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      variations: [
        'Accordion Style',
        'Tabbed FAQ',
        'Search FAQ'
      ],
      usedIn: ['Solution Pages', 'Support'],
      lastModified: '2024-01-11',
      status: 'active',
      tags: ['faq', 'accordion', 'help', 'content'],
      author: 'Content Team',
      version: '1.8'
    }
  ];
};

// Categories for filtering
export const getComponentCategories = () => {
  return [
    { value: 'all', label: 'All Categories', count: 0 },
    { value: 'Hero Sections', label: 'Hero Sections', count: 0 },
    { value: 'Cards & Features', label: 'Cards & Features', count: 0 },
    { value: 'Layout & Navigation', label: 'Layout & Navigation', count: 0 },
    { value: 'Content Sections', label: 'Content Sections', count: 0 },
    { value: 'Forms & Interaction', label: 'Forms & Interaction', count: 0 },
    { value: 'Dashboard & Admin', label: 'Dashboard & Admin', count: 0 },
    { value: 'UI Elements', label: 'UI Elements', count: 0 },
    { value: 'Marketing & CTA', label: 'Marketing & CTA', count: 0 }
  ];
};

// Update category counts based on components
export const getCategoriesWithCounts = () => {
  const components = getSharedComponents();
  const categories = getComponentCategories();
  
  // Count components per category
  const counts = {};
  components.forEach(component => {
    counts[component.category] = (counts[component.category] || 0) + 1;
  });
  
  // Update categories with counts
  return categories.map(category => ({
    ...category,
    count: category.value === 'all' ? components.length : (counts[category.value] || 0)
  }));
};

// Filter components by various criteria
export const filterComponents = (components, filters = {}) => {
  let filtered = [...components];
  
  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(comp => comp.category === filters.category);
  }
  
  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(comp =>
      comp.name.toLowerCase().includes(searchTerm) ||
      comp.description.toLowerCase().includes(searchTerm) ||
      comp.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      comp.author.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(comp => comp.status === filters.status);
  }
  
  // Sort components
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (filters.sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
  }
  
  return filtered;
};

// Get component by ID
export const getComponentById = (id) => {
  const components = getSharedComponents();
  return components.find(comp => comp.id === id);
};

// Get components used in a specific page
export const getComponentsByPage = (pageName) => {
  const components = getSharedComponents();
  return components.filter(comp => 
    comp.usedIn.some(page => 
      page.toLowerCase().includes(pageName.toLowerCase())
    )
  );
};

// Get recently modified components
export const getRecentComponents = (limit = 5) => {
  const components = getSharedComponents();
  return components
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, limit);
};

// Get component statistics
export const getComponentStats = () => {
  const components = getSharedComponents();
  const categories = getCategoriesWithCounts();
  
  return {
    total: components.length,
    active: components.filter(c => c.status === 'active').length,
    categories: categories.filter(c => c.value !== 'all').length,
    recentlyUpdated: components.filter(c => {
      const lastModified = new Date(c.lastModified);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastModified > weekAgo;
    }).length
  };
};