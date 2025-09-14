const IntegrationTypes = ({ title, items }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((integration, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">{integration.icon}</div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">{integration.title}</h3>
            <p className="text-gray-600">{integration.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationTypes;