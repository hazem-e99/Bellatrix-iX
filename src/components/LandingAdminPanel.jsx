import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import thunks
import { login, uploadImage, getProfile } from "../store/auth/authSlice";
import {
  fetchHero,
  createHero,
  updateHero,
  deleteHero,
} from "../store/hero/heroSlice";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../store/landing/servicesSlice";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../store/landing/testimonialsSlice";
import {
  fetchIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "../store/landing/industriesSlice";
import {
  modal,
  cta,
  pricing,
  process,
  whyChoose,
} from "../store/content/contentSlice";

// Import selectors
import {
  selectIsAnyLoading,
  selectAllErrors,
  selectIsAuthenticated,
  selectCurrentUser,
  selectStaleResources,
} from "../store/globalSelectors";

import { selectHeroItem, selectIsHeroStale } from "../store/hero/heroSlice";

import {
  selectServicesItems,
  selectIsServicesStale,
} from "../store/landing/servicesSlice";

import {
  selectTestimonialsItems,
  selectIsTestimonialsStale,
} from "../store/landing/testimonialsSlice";

import {
  selectIndustriesItems,
  selectIsIndustriesStale,
} from "../store/landing/industriesSlice";

const LandingAdminPanel = () => {
  const dispatch = useDispatch();

  // Global state
  const isAnyLoading = useSelector(selectIsAnyLoading);
  const allErrors = useSelector(selectAllErrors);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const staleResources = useSelector(selectStaleResources);

  // Resource-specific state
  const heroItem = useSelector(selectHeroItem);
  const isHeroStale = useSelector(selectIsHeroStale);

  const servicesItems = useSelector(selectServicesItems);
  const isServicesStale = useSelector(selectIsServicesStale);

  const testimonialsItems = useSelector(selectTestimonialsItems);
  const isTestimonialsStale = useSelector(selectIsTestimonialsStale);

  const industriesItems = useSelector(selectIndustriesItems);
  const isIndustriesStale = useSelector(selectIsIndustriesStale);

  // Component state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(!isAuthenticated);

  // Fetch stale data on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    // Only fetch data that is stale or never fetched
    if (isHeroStale || !heroItem) {
      dispatch(fetchHero());
    }

    if (isServicesStale || servicesItems.length === 0) {
      dispatch(fetchServices());
    }

    if (isTestimonialsStale || testimonialsItems.length === 0) {
      dispatch(fetchTestimonials());
    }

    if (isIndustriesStale || industriesItems.length === 0) {
      dispatch(fetchIndustries());
    }

    // Fetch content sections if stale
    if (staleResources.includes("content_modal")) {
      dispatch(modal.fetch());
    }
    if (staleResources.includes("content_cta")) {
      dispatch(cta.fetch());
    }
    if (staleResources.includes("content_pricing")) {
      dispatch(pricing.fetch());
    }
    if (staleResources.includes("content_process")) {
      dispatch(process.fetch());
    }
    if (staleResources.includes("content_whyChoose")) {
      dispatch(whyChoose.fetch());
    }
  }, [
    dispatch,
    isAuthenticated,
    isHeroStale,
    isServicesStale,
    isTestimonialsStale,
    isIndustriesStale,
    staleResources,
    heroItem,
    servicesItems.length,
    testimonialsItems.length,
    industriesItems.length,
  ]);

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ payload: loginForm })).then((result) => {
      if (result.type.endsWith("/fulfilled")) {
        setShowLoginForm(false);
        dispatch(getProfile());
      }
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      dispatch(uploadImage({ payload: { image: selectedFile } }));
      setSelectedFile(null);
    }
  };

  const handleRetry = (resourceName) => {
    switch (resourceName) {
      case "hero":
        dispatch(fetchHero({ force: true }));
        break;
      case "services":
        dispatch(fetchServices({ force: true }));
        break;
      case "testimonials":
        dispatch(fetchTestimonials({ force: true }));
        break;
      case "industries":
        dispatch(fetchIndustries({ force: true }));
        break;
      case "content_modal":
        dispatch(modal.fetch({ force: true }));
        break;
      case "content_cta":
        dispatch(cta.fetch({ force: true }));
        break;
      case "content_pricing":
        dispatch(pricing.fetch({ force: true }));
        break;
      case "content_process":
        dispatch(process.fetch({ force: true }));
        break;
      case "content_whyChoose":
        dispatch(whyChoose.fetch({ force: true }));
        break;
      default:
        console.warn("Unknown resource for retry:", resourceName);
    }
  };

  const ErrorDisplay = ({ resourceName, error }) => (
    <div
      style={{
        color: "red",
        margin: "8px 0",
        padding: "8px",
        border: "1px solid red",
        borderRadius: "4px",
      }}
    >
      <strong>{resourceName} Error:</strong> {error}
      <button
        onClick={() => handleRetry(resourceName)}
        style={{ marginLeft: "8px", padding: "4px 8px" }}
      >
        Retry
      </button>
    </div>
  );

  if (showLoginForm && !isAuthenticated) {
    return (
      <div style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label>Email:</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password:</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isAnyLoading}
            style={{ padding: "8px 16px" }}
          >
            {isAnyLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {allErrors.auth && (
          <ErrorDisplay resourceName="auth" error={allErrors.auth} />
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h1>Landing Page Admin Panel</h1>
        <div>
          {currentUser && (
            <span>Welcome, {currentUser.email || currentUser.username}</span>
          )}
          {isAnyLoading && (
            <div style={{ color: "blue", marginLeft: 16 }}>Loading...</div>
          )}
        </div>
      </div>

      {/* File Upload Section */}
      {isAuthenticated && (
        <div
          style={{
            marginBottom: 32,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <h3>File Upload</h3>
          <form onSubmit={handleFileUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ marginRight: 8 }}
            />
            <button type="submit" disabled={!selectedFile || isAnyLoading}>
              Upload Image
            </button>
          </form>
          {allErrors.auth && allErrors.auth.includes("upload") && (
            <ErrorDisplay resourceName="upload" error={allErrors.auth} />
          )}
        </div>
      )}

      {/* Hero Section */}
      <div style={{ marginBottom: 32 }}>
        <h2>Hero Section</h2>
        {allErrors.hero && (
          <ErrorDisplay resourceName="hero" error={allErrors.hero} />
        )}
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Current Hero Data:</h4>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 4,
              overflow: "auto",
            }}
          >
            {JSON.stringify(heroItem, null, 2)}
          </pre>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() =>
                dispatch(createHero({ payload: { title: "New Hero" } }))
              }
            >
              Create Hero
            </button>
            <button
              onClick={() =>
                dispatch(updateHero({ payload: { title: "Updated Hero" } }))
              }
              style={{ marginLeft: 8 }}
            >
              Update Hero
            </button>
            <button
              onClick={() => dispatch(deleteHero())}
              style={{ marginLeft: 8 }}
            >
              Delete Hero
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ marginBottom: 32 }}>
        <h2>Services ({servicesItems.length})</h2>
        {allErrors.services && (
          <ErrorDisplay resourceName="services" error={allErrors.services} />
        )}
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Services List:</h4>
          <div
            style={{
              maxHeight: 200,
              overflow: "auto",
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 4,
            }}
          >
            {servicesItems.map((service, index) => (
              <div
                key={service.id || index}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  background: "white",
                  borderRadius: 4,
                }}
              >
                <strong>
                  {service.name || service.title || `Service ${index + 1}`}
                </strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  {service.description || service.subtitle || "No description"}
                </div>
              </div>
            ))}
            {servicesItems.length === 0 && <div>No services found</div>}
          </div>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() =>
                dispatch(createService({ payload: { name: "New Service" } }))
              }
            >
              Create Service
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ marginBottom: 32 }}>
        <h2>Testimonials ({testimonialsItems.length})</h2>
        {allErrors.testimonials && (
          <ErrorDisplay
            resourceName="testimonials"
            error={allErrors.testimonials}
          />
        )}
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Testimonials List:</h4>
          <div
            style={{
              maxHeight: 200,
              overflow: "auto",
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 4,
            }}
          >
            {testimonialsItems.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  background: "white",
                  borderRadius: 4,
                }}
              >
                <strong>
                  {testimonial.author ||
                    testimonial.name ||
                    `Testimonial ${index + 1}`}
                </strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  {testimonial.content || testimonial.text || "No content"}
                </div>
              </div>
            ))}
            {testimonialsItems.length === 0 && <div>No testimonials found</div>}
          </div>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() =>
                dispatch(
                  createTestimonial({
                    payload: {
                      author: "New Client",
                      content: "Great service!",
                    },
                  })
                )
              }
            >
              Create Testimonial
            </button>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div style={{ marginBottom: 32 }}>
        <h2>Industries ({industriesItems.length})</h2>
        {allErrors.industries && (
          <ErrorDisplay
            resourceName="industries"
            error={allErrors.industries}
          />
        )}
        <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
          <h4>Industries List:</h4>
          <div
            style={{
              maxHeight: 200,
              overflow: "auto",
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 4,
            }}
          >
            {industriesItems.map((industry, index) => (
              <div
                key={industry.id || index}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  background: "white",
                  borderRadius: 4,
                }}
              >
                <strong>
                  {industry.name || industry.title || `Industry ${index + 1}`}
                </strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  {industry.description || "No description"}
                </div>
              </div>
            ))}
            {industriesItems.length === 0 && <div>No industries found</div>}
          </div>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() =>
                dispatch(createIndustry({ payload: { name: "New Industry" } }))
              }
            >
              Create Industry
            </button>
          </div>
        </div>
      </div>

      {/* Stale Resources Warning */}
      {staleResources.length > 0 && (
        <div
          style={{
            marginTop: 32,
            padding: 16,
            background: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: 8,
          }}
        >
          <h3>Stale Data Detected</h3>
          <p>The following resources have stale data:</p>
          <ul>
            {staleResources.map((resource) => (
              <li key={resource}>
                {resource}
                <button
                  onClick={() => handleRetry(resource)}
                  style={{
                    marginLeft: 8,
                    padding: "2px 6px",
                    fontSize: "0.8em",
                  }}
                >
                  Refresh
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Global Actions */}
      <div
        style={{
          marginTop: 32,
          padding: 16,
          background: "#f8f9fa",
          borderRadius: 8,
        }}
      >
        <h3>Global Actions</h3>
        <button
          onClick={() => {
            dispatch(fetchHero({ force: true }));
            dispatch(fetchServices({ force: true }));
            dispatch(fetchTestimonials({ force: true }));
            dispatch(fetchIndustries({ force: true }));
          }}
          disabled={isAnyLoading}
        >
          Refresh All Data
        </button>
        <button
          onClick={() => setShowLoginForm(true)}
          style={{ marginLeft: 8 }}
        >
          Show Login
        </button>
      </div>
    </div>
  );
};

export default LandingAdminPanel;
