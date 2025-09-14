import { createSelector } from "reselect";

/**
 * Global selectors that work across all slices
 * These provide unified access to loading states, errors, etc.
 */

// Helper to extract slice status and errors
const getSliceStates = (state) => {
  const slices = [
    "auth",
    "hero",
    "services",
    "testimonials",
    "industries",
    "training",
    "about",
    "implementation",
  ];
  const contentSections = ["modal", "cta", "pricing", "process", "whyChoose"];

  const states = {};

  // Regular slices
  slices.forEach((sliceName) => {
    if (state[sliceName]) {
      states[sliceName] = {
        status: state[sliceName].status,
        error: state[sliceName].error,
      };
    }
  });

  // Content slice sections
  if (state.content) {
    contentSections.forEach((section) => {
      if (state.content[section]) {
        states[`content_${section}`] = {
          status: state.content[section].status,
          error: state.content[section].error,
        };
      }
    });
  }

  return states;
};

// Global loading selector - true if ANY slice is loading
export const selectIsAnyLoading = createSelector(
  [getSliceStates],
  (sliceStates) => {
    return Object.values(sliceStates).some(
      (slice) => slice.status === "loading"
    );
  }
);

// Global errors selector - returns map of resource → error
export const selectAllErrors = createSelector(
  [getSliceStates],
  (sliceStates) => {
    const errors = {};
    Object.entries(sliceStates).forEach(([sliceName, slice]) => {
      if (slice.error) {
        errors[sliceName] = slice.error;
      }
    });
    return errors;
  }
);

// Check if any slice has errors
export const selectHasAnyErrors = createSelector(
  [selectAllErrors],
  (errors) => Object.keys(errors).length > 0
);

// Global data availability selector
export const selectDataAvailability = createSelector(
  [(state) => state],
  (state) => {
    const availability = {};

    // Check each slice for data
    if (state.auth?.user) availability.auth = true;
    if (state.hero?.item) availability.hero = true;
    if (state.services?.items?.length > 0) availability.services = true;
    if (state.testimonials?.items?.length > 0) availability.testimonials = true;
    if (state.industries?.items?.length > 0) availability.industries = true;
    if (state.training?.items?.length > 0) availability.training = true;
    if (state.about?.item) availability.about = true;
    if (state.implementation?.hero?.item) availability.implementation = true;

    // Check content sections
    if (state.content) {
      if (state.content.modal?.item) availability.modal = true;
      if (state.content.cta?.item) availability.cta = true;
      if (state.content.pricing?.item) availability.pricing = true;
      if (state.content.process?.item) availability.process = true;
      if (state.content.whyChoose?.item) availability.whyChoose = true;
    }

    return availability;
  }
);

// Authentication helpers
export const selectIsAuthenticated = (state) => !!state.auth?.token;
export const selectCurrentUser = (state) => state.auth?.user;
export const selectAuthToken = (state) => state.auth?.token;

// Landing page data selectors (commonly used together)
export const selectLandingPageData = createSelector(
  [
    (state) => state.hero?.item,
    (state) => state.services?.items || [],
    (state) => state.testimonials?.items || [],
    (state) => state.industries?.items || [],
  ],
  (hero, services, testimonials, industries) => ({
    hero,
    services,
    testimonials,
    industries,
  })
);

// Check if landing page is ready (has essential data)
export const selectIsLandingPageReady = createSelector(
  [selectLandingPageData],
  (landingData) => {
    return !!(
      landingData.hero ||
      landingData.services.length > 0 ||
      landingData.testimonials.length > 0
    );
  }
);

// Stale data detection - returns list of stale resources
export const selectStaleResources = createSelector(
  [(state) => state],
  (state) => {
    const staleResources = [];
    const now = Date.now();

    // Check each slice for stale data
    const slices = [
      "hero",
      "services",
      "testimonials",
      "industries",
      "training",
      "about",
    ];

    slices.forEach((sliceName) => {
      const slice = state[sliceName];
      if (slice?.lastFetchedAt && slice?.cacheTTLms) {
        if (now - slice.lastFetchedAt > slice.cacheTTLms) {
          staleResources.push(sliceName);
        }
      }
    });

    // Check content sections
    if (state.content) {
      const contentSections = [
        "modal",
        "cta",
        "pricing",
        "process",
        "whyChoose",
      ];
      contentSections.forEach((section) => {
        const sectionData = state.content[section];
        if (sectionData?.lastFetchedAt && state.content.cacheTTLms) {
          if (now - sectionData.lastFetchedAt > state.content.cacheTTLms) {
            staleResources.push(`content_${section}`);
          }
        }
      });
    }

    return staleResources;
  }
);

export default {
  selectIsAnyLoading,
  selectAllErrors,
  selectHasAnyErrors,
  selectDataAvailability,
  selectIsAuthenticated,
  selectCurrentUser,
  selectAuthToken,
  selectLandingPageData,
  selectIsLandingPageReady,
  selectStaleResources,
};
