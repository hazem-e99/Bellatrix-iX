// API Test Document

// 1. Create a page with components in one request
// POST http://bellatrix.runasp.net/api/Pages/with-components
// This endpoint should be used when creating a page with components in a single request

// Sample payload
const createPageWithComponentsPayload = {
  name: "About Us",
  categoryId: 2,
  slug: "about-us",
  metaTitle: "About Us",
  metaDescription: "Who we are",
  isHomepage: false,
  isPublished: true,
  components: [
    {
      componentType: "CtaButton",
      componentName: "Main CTA",
      orderIndex: 0,
      contentJson:
        '{"text":"Learn More","link":"/hr","variant":"primary","backgroundVideo":"/Videos/hrVideo.mp4"}',
    },
  ],
};

// 2. Create a page without components
// POST http://bellatrix.runasp.net/api/Pages
// This endpoint should be used when creating a page without components

// Sample payload
const createPagePayload = {
  name: "Contact Us",
  categoryId: 3,
  slug: "contact-us",
  metaTitle: "Contact Us",
  metaDescription: "Get in touch with our team",
  isHomepage: false,
  isPublished: true,
};

// 3. Add components to an existing page
// POST http://bellatrix.runasp.net/api/Pages/{pageId}/components
// This endpoint should be used to add components to an existing page

// Sample payload
const addComponentPayload = {
  componentType: "ContactForm",
  componentName: "Contact Form Section",
  contentJson:
    '{"title":"Get in Touch","subtitle":"We\'d love to hear from you","submitButtonText":"Send Message"}',
  orderIndex: 0,
};

// Note: In all cases, the contentJson field must be a JSON string (serialized via JSON.stringify)
// rather than sending component fields as separate keys in the request body.
