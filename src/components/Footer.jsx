import {
  Facebook,
  Twitter,
  LinkedIn,
  Email,
  ArrowUpward,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import SEO from "./SEO";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show scroll-to-top button on scroll
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setShowTop(window.scrollY > 200);
    };
  }

  // Fetch categories for Quick Links
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "http://bellatrix.runasp.net/api/Categories/navbar"
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        setCategories(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message || "Error loading categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer
      className="relative bg-slate-900 text-white pt-0 pb-8 px-0 overflow-hidden border-t-4 border-slate-600 shadow-inner"
      style={{ backgroundColor: "#0f172a" }}
    >
      <SEO
        title="Contact Bellatrix | Oracle NetSuite Consulting & Support Information"
        description="Get in touch with Bellatrix for Oracle NetSuite consulting, implementation, and support services. Contact information and company details."
        keywords="contact Bellatrix, NetSuite support contact, Oracle consulting contact, business hours, company information, get in touch"
        ogTitle="Contact Bellatrix | Oracle NetSuite Consulting Company"
        ogDescription="Contact Bellatrix for expert Oracle NetSuite consulting and implementation services. Get in touch with our team of specialists."
        ogImage="/images/bellatrix-contact-footer.jpg"
        twitterCard="summary_large_image"
      />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 blur-lg opacity-60 z-0" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Column */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-100 drop-shadow">
              Bellatrix
            </h3>
            <p className="text-slate-100/80 text-center lg:text-left max-w-xs">
              Empowering your business with next-gen enterprise software
              solutions.
            </p>
            <div className="flex space-x-4 mt-2">
              {[
                { icon: <Twitter fontSize="medium" />, href: "#" },
                { icon: <LinkedIn fontSize="medium" />, href: "#" },
                { icon: <Facebook fontSize="medium" />, href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group p-2 rounded-full bg-slate-800 hover:bg-slate-600 transition-colors duration-300 shadow hover:scale-110"
                  aria-label="Social Link"
                >
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h4 className="text-xl font-semibold text-slate-100 mb-2">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-slate-100/80">
              {loading ? (
                <li className="text-gray-400">Loading...</li>
              ) : error ? (
                <li className="text-red-400">{error}</li>
              ) : categories.length === 0 ? (
                <li className="text-gray-400">No links available</li>
              ) : (
                categories.map((cat) => {
                  const homePage = Array.isArray(cat.pages)
                    ? cat.pages.find((p) => p.isHomepage)
                    : null;
                  if (homePage) {
                    return (
                      <li key={cat.id}>
                        <a
                          href={`/pages/${homePage.slug}`}
                          className="hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                          {cat.name}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={cat.id}>
                      {cat.pages && cat.pages.length > 0 ? (
                        (() => {
                          const homePage = cat.pages.find((p) => p.isHomepage);
                          return homePage ? (
                            <a
                              href={`/pages/${homePage.slug}`}
                              className="hover:text-primary text-gray-200 transition duration-200 cursor-pointer"
                            >
                              {cat.name}
                            </a>
                          ) : (
                            <span className="text-gray-400">{cat.name}</span>
                          );
                        })()
                      ) : (
                        <span className="text-gray-400">{cat.name}</span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h4 className="text-xl font-semibold text-slate-100 mb-2">
              Our Services
            </h4>
            <div className="flex flex-col gap-2 text-slate-100/80">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Software Implementation
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Training Programs
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Technical Support
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Consulting Services
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Custom Solutions
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Maintenance & Updates
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center lg:items-start gap-3 text-slate-100/90 text-sm">
            <h4 className="text-xl font-semibold mb-2 text-slate-100">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Email fontSize="small" />
                <span>info@bellatrix.com</span>
              </div>
              <div>123 Business Avenue, Suite 500</div>
              <div>San Francisco, CA 94107</div>
              <div>Phone: (555) 123-4567</div>
            </div>
          </div>
        </div>
        <div className="text-center pt-6 text-slate-100/70 text-xs border-t border-slate-800/40">
          <p>
            &copy; {new Date().getFullYear()} Bellatrix. All rights reserved.
          </p>
        </div>
        {/* Scroll to Top Button */}
        {showTop && (
          <button
            onClick={handleScrollTop}
            className="fixed bottom-8 right-8 z-50 bg-slate-700 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
            aria-label="Scroll to top"
          >
            <ArrowUpward />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
