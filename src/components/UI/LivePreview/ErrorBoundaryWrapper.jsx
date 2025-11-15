import React, { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

/**
 * Error Boundary Wrapper
 * Catches component render errors and displays a fallback UI
 * Uses hooks-based error handling for function components
 */
const ErrorBoundaryWrapper = ({ children, componentType, componentData }) => {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const dataString = JSON.stringify(componentData);

  useEffect(() => {
    setHasError(false);
    setErrorDetails(null);
  }, [dataString]);

  const handleError = (error, errorInfo) => {
    console.error(`Component Error in ${componentType}:`, error, errorInfo);
    setHasError(true);
    setErrorDetails({ error, errorInfo });
  };

  if (hasError) {
    return (
      <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex items-center space-x-2 mb-4">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Component Render Error
          </h3>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 mb-2">
          {componentType} failed to render with the current configuration.
        </p>
        <details className="text-xs text-red-500">
          <summary className="cursor-pointer">Error Details</summary>
          <pre className="mt-2 p-2 bg-red-100 dark:bg-red-800/20 rounded overflow-auto">
            {errorDetails?.error?.toString()}
          </pre>
        </details>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default ErrorBoundaryWrapper;

