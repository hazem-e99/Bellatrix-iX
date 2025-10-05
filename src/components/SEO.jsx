import { useEffect } from "react";

const SEO = ({
  title = "Bellatrix - Oracle NetSuite Consulting Services",
  description = "Expert Oracle NetSuite consulting and implementation services",
  keywords = "Oracle NetSuite, consulting, implementation, ERP",
  ogTitle,
  ogDescription,
  ogImage = "/images/bellatrix-default.jpg",
  twitterCard = "summary_large_image",
  canonicalUrl,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property, content, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement("meta");
        if (isProperty) {
          metaTag.setAttribute("property", property);
        } else {
          metaTag.setAttribute("name", property);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute("content", content);
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", ogTitle || title, true);
    updateMetaTag("og:description", ogDescription || description, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", "website", true);

    // Update Twitter tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", ogTitle || title);
    updateMetaTag("twitter:description", ogDescription || description);
    updateMetaTag("twitter:image", ogImage);

    // Update canonical URL if provided
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // Optional: Clean up specific meta tags if needed
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    canonicalUrl,
  ]);

  // This component doesn't render anything visible
  return null;
};

export default SEO;
