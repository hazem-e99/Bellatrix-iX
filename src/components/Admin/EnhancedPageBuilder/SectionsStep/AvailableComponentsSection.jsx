import { PlusIcon } from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../../../UI/Card";

const AvailableComponentsSection = ({
  availableComponents,
  filteredComponents,
  categories,
  selectedCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
  onAddComponent,
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Available Components
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--color-white-10)] backdrop-blur-sm border border-[var(--color-white-20)] rounded-lg text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/20 focus:outline-none transition-all duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-102"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Summary */}
        {(searchTerm || selectedCategory !== "all") && (
          <div className="mb-4 text-sm text-gray-300">
            Showing {filteredComponents.length} of {availableComponents.length} components
            {searchTerm && <span> for "{searchTerm}"</span>}
            {selectedCategory !== "all" && (
              <span> in {categories.find((c) => c.id === selectedCategory)?.name}</span>
            )}
          </div>
        )}

        {/* Components Grid */}
        {filteredComponents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-white mb-2">No components found</h3>
            <p className="text-gray-300 mb-4">
              {searchTerm ? (
                <>No components match your search "{searchTerm}"</>
              ) : (
                <>
                  No components available for the "
                  {categories.find((c) => c.id === selectedCategory)?.name}" category
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Search
                </button>
              )}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => onCategoryChange("all")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View All Components
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                className="p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-200 group"
                onClick={() => onAddComponent(component)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {component.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {component.name}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                        {component.category}
                      </span>
                    </div>
                  </div>
                  <PlusIcon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableComponentsSection;

