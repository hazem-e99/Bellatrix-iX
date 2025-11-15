const EmptyState = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📄</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No sections found
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This page doesn't have any sections yet.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;

