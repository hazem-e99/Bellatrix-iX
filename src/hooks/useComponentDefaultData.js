import { useEffect, useState } from 'react';
import { componentDefaultMap } from '../utils/componentDefaultMap';

/**
 * Loads component data from contentJson or fetches default from /public/data if missing/invalid.
 * @param {string} componentName
 * @param {string} contentJson
 * @returns {object} { data, loading, error }
 */
export function useComponentDefaultData(componentName, contentJson) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let parsed = null;
    if (contentJson) {
      try {
        parsed = JSON.parse(contentJson);
        setData(parsed);
        setLoading(false);
        return;
      } catch (e) {
        // fall through to fetch default
      }
    }
    // Fallback: fetch default JSON
    const relPath = componentDefaultMap[componentName];
    if (!relPath) {
      setData({});
      setLoading(false);
      setError('No default mapping for ' + componentName);
      return;
    }
    fetch(`/data/${relPath}`)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
        console.log(`Loaded default data for [${componentName}] from /public/data/${relPath}`);
      })
      .catch((err) => {
        setData({});
        setLoading(false);
        setError(err.message);
        console.warn(`Failed to load default data for [${componentName}] from /public/data/${relPath}`);
      });
  }, [componentName, contentJson]);

  return { data, loading, error };
}
