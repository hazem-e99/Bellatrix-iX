import { useState, useEffect, useRef } from "react";
import SEO from "./SEO";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./ContactForm";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { setupSectionThemeDetection } from "../utils/sectionThemeDetection";

const Navbar = () => {
  // Dynamic navbar categories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  // Fetch navbar categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await fetch(
          "http://bellatrix.runasp.net/api/Categories/navbar"
        );
        const data = await res.json();
        console.log(data);
        // Accepts: { data: [...] }, { result: [...] }, or array
        let cats = [];
        if (Array.isArray(data)) {
          cats = data;
        } else if (Array.isArray(data.data)) {
          cats = data.data;
        } else if (Array.isArray(data.result)) {
          cats = data.result;
        }
        setCategories(cats);
      } catch {
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  const { theme, toggleTheme } = useTheme();
  const [navbarTheme, setNavbarTheme] = useState("dark");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    // Set up section theme detection with improved logic
    const cleanup = setupSectionThemeDetection((newTheme) => {
      setNavbarTheme(newTheme);
    }, 60); // 60px navbar height

    return cleanup;
  }, []);
  // Contact form modal functions
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Contact form data
  const modalContent = {
    title: "Contact Us",
    subtitle: "Let's discuss your project",
    formFields: {
      contactInfo: {
        title: "Contact Information",
        fields: [
          {
            label: "Full Name *",
            type: "text",
            placeholder: "John Doe",
            required: true,
          },
          {
            label: "Email Address *",
            type: "email",
            placeholder: "john@company.com",
            required: true,
          },
          {
            label: "Phone Number",
            type: "tel",
            placeholder: "+1 (555) 123-4567",
          },
        ],
      },
      companyInfo: {
        title: "Company Details",
        fields: [
          {
            label: "Company Name",
            type: "text",
            placeholder: "Your Company Inc.",
          },
          {
            label: "Industry",
            type: "select",
            options: [
              "Select Industry",
              "Manufacturing",
              "Retail & E-commerce",
              "Healthcare",
              "Finance & Banking",
              "Technology",
              "Professional Services",
              "Non-Profit",
              "Other",
            ],
          },
          {
            label: "Country",
            type: "select",
            options: [
              "Select Country",
              "United States",
              "Canada",
              "United Kingdom",
              "Australia",
              "Germany",
              "France",
              "United Arab Emirates",
              "Saudi Arabia",
              "Egypt",
              "Other",
            ],
          },
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell us about your project requirements...",
      },
      submitNote: "✓ 24hr response",
      submitText: "Send Message",
    },
  };

  // New Services structure
  // ...removed unused servicesStructure...

  // Industries data
  // ...removed unused industriesData...

  const handleMenuEnter = (dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }, 200);
  };

  // ...removed unused handleSubMenuEnter and handleSubMenuLeave...

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle escape key to close dropdowns
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };

    if (openDropdown || openSubDropdown) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openDropdown, openSubDropdown]);

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  return (
    <>
      <SEO
        title="Bellatrix Navigation | Oracle NetSuite Consulting Services"
        description="Navigate Bellatrix's comprehensive Oracle NetSuite services including implementation, training, support, and industry-specific solutions."
        keywords="NetSuite navigation, Oracle consulting menu, implementation services, training programs, technical support, industry solutions"
        ogTitle="Bellatrix Services Navigation | Oracle NetSuite Solutions"
        ogDescription="Explore Bellatrix's full range of Oracle NetSuite consulting services, training programs, and industry-specific solutions."
        ogImage="/images/bellatrix-services-navigation.jpg"
        twitterCard="summary_large_image"
      />

      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/10 shadow-2xl backdrop-blur-md"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-1/4 w-2 h-2 bg-gradient-to-r from-[var(--color-primary)]/60 to-[var(--color-primary-light)]/60 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-[var(--color-primary-light)]/50 to-[var(--color-primary)]/50 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2/3 w-1 h-1 bg-[var(--color-white)]/40 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Premium Logo */}
            <a href="/" className="flex items-center group">
              <div className="flex items-center justify-center h-56 w-56 mr-2 relative">
                <div className="absolute top-0 left-0 h-full w-full">
                  <AnimatePresence mode="wait">
                    {navbarTheme === "light" ? (
                      <motion.img
                        key="logoThree"
                        src="/images/logoThree.png"
                        alt="Bellatrix Logo Three"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 h-20 w-20 object-contain -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 2 }}
                      />
                    ) : scrolled ? (
                      <motion.img
                        key="logoTwo"
                        src="/images/logoTwo.png"
                        alt="Bellatrix Logo Two"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 h-56 w-56 object-contain -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 2 }}
                      />
                    ) : (
                      <motion.img
                        key="logoOne"
                        src="/images/logoOne.png"
                        alt="Bellatrix Logo One"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 h-36 w-36 object-contain -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 2 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Home Link */}
              <Link
                to="/"
                className={`px-5 py-3 text-sm font-medium rounded-xl transition-colors duration-300 border border-transparent hover:border-white/20 ${
                  navbarTheme === "light"
                    ? "text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-primary-light)]"
                }`}
              >
                Home
              </Link>

              {/* Dynamic Categories Dropdowns */}
              {loadingCategories ? (
                <span className="px-5 py-3 text-sm text-gray-400">
                  Loading...
                </span>
              ) : Array.isArray(categories) && categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    className="relative"
                    key={cat.id}
                    onMouseEnter={() => handleMenuEnter(cat.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button
                      className={`flex items-center px-5 py-3 text-sm font-medium rounded-xl transition-colors duration-300 border ${
                        openDropdown === cat.id
                          ? navbarTheme === "light"
                            ? "text-[var(--color-text-dark)] border-blue-400/20 shadow"
                            : "text-[var(--color-text-light)] border-blue-400/30 shadow"
                          : navbarTheme === "light"
                          ? "text-[var(--color-text-dark)]/90 hover:text-[var(--color-primary)] border-transparent hover:border-black/20"
                          : "text-[var(--color-text-light)]/90 hover:text-[var(--color-primary-light)] border-transparent hover:border-white/20"
                      }`}
                      onClick={() => toggleDropdown(cat.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleDropdown(cat.id);
                        }
                      }}
                      aria-expanded={openDropdown === cat.id}
                      aria-haspopup="true"
                    >
                      <span>{cat.name}</span>
                      {cat.pages && cat.pages.length > 0 && (
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdown === cat.id &&
                        cat.pages &&
                        cat.pages.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 mt-2 w-56 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg z-50 py-2"
                            onMouseEnter={() => handleMenuEnter(cat.id)}
                            onMouseLeave={handleMenuLeave}
                          >
                            {cat.pages
                              ?.filter((page) => page.isPublished === true) // ✅ يعرض بس الصفحات المنشورة
                              .map((page) => (
                                <Link
                                  key={page.id}
                                  to={
                                    page.slug ? `/${page.slug}` : `/${page.id}`
                                  }
                                  className="block px-5 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-150 text-base font-medium"
                                >
                                  {page.title}
                                </Link>
                              ))}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))
              ) : (
                <span style={{ display: "none" }} />
              )}

              <Link
                to="/about"
                className={`px-5 py-3 text-sm font-medium rounded-xl transition-colors duration-300 border border-transparent hover:border-white/20 ${
                  navbarTheme === "light"
                    ? "text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-primary-light)]"
                }`}
              >
                About
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={() =>
                  toggleTheme(theme === "default" ? "purple" : "default")
                }
                className="relative ml-2 px-3 py-3 bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/20 text-[var(--color-white)] text-sm font-medium rounded-xl transition-all duration-300 border border-[var(--color-white)]/10 backdrop-blur-sm cursor-pointer"
                title={`Switch to ${
                  theme === "default" ? "Purple" : "Blue"
                } theme`}
              >
                <span className="text-lg">
                  {theme === "default" ? "🟣" : "🔵"}
                </span>
              </button>

              {/* Premium Contact button */}
              <button
                onClick={openContactModal}
                className="relative ml-2 px-6 py-3 bg-gradient-to-r from-[var(--tw-blue-200)] to-[var(--tw-blue-900)] text-[var(--color-text-primary)] text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--color-primary)]/40 transition-all duration-300 transform hover:scale-105 border border-[var(--color-white)]/10 backdrop-blur-sm group overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Contact</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`inline-flex items-center justify-center p-3 rounded-xl hover:bg-white/10 focus:outline-none border border-white/10 backdrop-blur-sm transition-colors duration-300 ${
                  navbarTheme === "light"
                    ? "text-[var(--color-text-dark)]/90 hover:text-[var(--color-primary)]"
                    : "text-[var(--color-text-light)]/90 hover:text-[var(--color-text-light)]"
                }`}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Premium Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/40 backdrop-blur-2xl border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Mobile Home Link */}
              <Link
                to="/"
                className={`block px-4 py-3 text-base font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors duration-300 ${
                  navbarTheme === "light"
                    ? "text-[var(--color-text-dark)]/90 hover:text-[var(--color-primary)]"
                    : "text-[var(--color-text-light)]/90 hover:text-[var(--color-text-light)]"
                }`}
              >
                Home
              </Link>

              {/* Dynamic Mobile Categories Dropdowns */}
              {loadingCategories ? (
                <span className="block px-4 py-3 text-base text-gray-400">
                  Loading...
                </span>
              ) : Array.isArray(categories) && categories.length > 0 ? (
                categories.map((cat) => (
                  <div className="relative" key={cat.id}>
                    <button
                      onClick={() => toggleDropdown(cat.id)}
                      className={`w-full flex justify-between items-center px-4 py-3 text-base font-medium rounded-xl hover:bg-white/10 transition-colors duration-300 border border-white/10 ${
                        navbarTheme === "light"
                          ? "text-[var(--color-text-dark)]/90 hover:text-[var(--color-primary)]"
                          : "text-[var(--color-text-light)]/90 hover:text-[var(--color-text-light)]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {cat.pages && cat.pages.length > 0 && (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                    {openDropdown === cat.id &&
                      cat.pages &&
                      cat.pages.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 ml-4 space-y-2"
                        >
                          {cat.pages.map((page) => (
                            <Link
                              key={page.id}
                              to={page.slug ? `/${page.slug}` : `/${page.id}`}
                              className="block px-4 py-3 text-sm text-white/70 rounded-lg hover:bg-white/5 hover:text-white border border-white/5 backdrop-blur-sm transition-all duration-300"
                            >
                              {page.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                  </div>
                ))
              ) : (
                <span className="block px-4 py-3 text-base text-gray-400">
                  No categories
                </span>
              )}

              <Link
                to="/about"
                className={`block px-4 py-3 text-base font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-colors duration-300 ${
                  navbarTheme === "light"
                    ? "text-[var(--color-text-dark)]/90 hover:text-[var(--color-primary)]"
                    : "text-[var(--color-text-light)]/90 hover:text-[var(--color-text-light)]"
                }`}
              >
                About
              </Link>

              {/* Mobile Theme Toggle */}
              <button
                onClick={() =>
                  toggleTheme(theme === "default" ? "purple" : "default")
                }
                className="block w-full px-4 py-3 mt-4 text-center bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/20 text-[var(--color-white)] font-medium rounded-xl border border-[var(--color-white)]/10 transition-all duration-300"
              >
                {theme === "default"
                  ? "🟣 Switch to Purple"
                  : "🔵 Switch to Blue"}
              </button>

              {/* Mobile Contact button */}
              <button
                onClick={openContactModal}
                className="block w-full px-4 py-3 mt-4 text-center bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary-dark)] text-[var(--color-white)] font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all duration-300 border border-[var(--color-white)]/10 cursor-pointer"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
      >
        <div className="p-2">
          <ContactForm onSuccess={closeContactModal} />
        </div>
      </Modal>

      <style>{`
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-slide {
          animation: fade-slide 0.22s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </>
  );
};

export default Navbar;
