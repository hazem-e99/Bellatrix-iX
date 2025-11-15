import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

/**
 * Component Not Found Component
 * Displays when a component type is not registered
 */
const ComponentNotFound = ({ componentType }) => {
  return (
    <div className="p-6 border border-yellow-200 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
      <div className="flex items-center space-x-2 mb-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
          Component Not Found
        </h3>
      </div>
      <p className="text-sm text-yellow-600 dark:text-yellow-400">
        Component type "{componentType}" is not registered in the preview
        system.
      </p>
    </div>
  );
};

export default ComponentNotFound;

