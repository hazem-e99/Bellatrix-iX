const ComponentNotFound = ({ componentType, componentId }) => {
  return (
    <div className="p-8 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-4xl mb-4">📄</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Component Not Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {componentType || componentId}
      </p>
    </div>
  );
};

export default ComponentNotFound;

