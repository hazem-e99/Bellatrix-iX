import { useState, useEffect } from "react";
import pagesAPI from "../lib/pagesAPI";

export const usePageData = (slug) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await pagesAPI.getPublicPageBySlug(slug);
        const data = response.data || response;

        setPageData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();

    const handlePageDataUpdate = (event) => {
      const { slug: updatedSlug } = event.detail;
      if (updatedSlug === slug) {
        fetchPage();
      }
    };

    window.addEventListener("pageDataUpdated", handlePageDataUpdate);

    return () => {
      window.removeEventListener("pageDataUpdated", handlePageDataUpdate);
    };
  }, [slug]);

  return { pageData, loading, error };
};
