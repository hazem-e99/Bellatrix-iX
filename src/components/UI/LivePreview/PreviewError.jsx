import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

/**
 * Preview Error Component
 * Displays error messages in the preview system
 */
const PreviewError = ({ error, componentType }) => {
  return (
    <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
      <div className="flex items-center space-x-2 mb-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
          Preview Error
        </h3>
      </div>
      <p className="text-sm text-red-600 dark:text-red-400">
        {error || "An error occurred while rendering the preview"}
      </p>
      {componentType && (
        <p className="text-xs text-red-500 mt-1">Component: {componentType}</p>
      )}
    </div>
  );
};

export default PreviewError;

