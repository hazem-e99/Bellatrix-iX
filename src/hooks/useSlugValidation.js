import { useState, useEffect, useRef } from "react";
import pagesAPI from "../lib/pagesAPI";

export const useSlugValidation = (slug, excludeId = null) => {
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [slugError, setSlugError] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!slug || slug.trim().length === 0) {
      setSlugAvailable(true);
      setSlugError("");
      return;
    }

    const slugPattern = /^[a-z0-9-]+$/;
    if (!slugPattern.test(slug)) {
      setSlugAvailable(false);
      setSlugError(
        "Slug must only contain lowercase letters, numbers, and dashes."
      );
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setSlugChecking(true);
        setSlugError("");
        const response = await pagesAPI.checkSlugExists(slug, excludeId);
        const exists = response.data || response;
        setSlugAvailable(!exists);
        if (exists) {
          setSlugError("This slug is already taken. Please choose another.");
        }
      } catch (error) {
        setSlugAvailable(true);
        setSlugError("");
      } finally {
        setSlugChecking(false);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [slug, excludeId]);

  return { slugChecking, slugAvailable, slugError };
};

