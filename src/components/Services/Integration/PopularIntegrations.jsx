const PopularIntegrations = ({ title, platforms }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {platforms.map((platform, index) => (
          <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-blue-800">{platform}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularIntegrations;