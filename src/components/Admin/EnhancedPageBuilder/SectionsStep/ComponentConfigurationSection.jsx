import { DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../../../UI/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../../../UI/Card";
import { ComponentToggles } from "../../../UI/FancyToggle";
import ComponentFormRenderer from "./ComponentFormRenderer";

const ComponentConfigurationSection = ({
  components,
  availableComponents,
  onUpdateComponent,
  onRemoveComponent,
  componentSchemas,
  getAboutComponentSchema,
  getGeneralComponentSchema,
  generateDynamicSchema,
  validateAndFormatJSON,
}) => {
  const handleComponentUpdate = (index, field, value) => {
    if (field === "orderIndex") {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onUpdateComponent(index, field, numValue);
      }
    } else {
      onUpdateComponent(index, field, value);
    }
  };

  if (components.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Component Configuration (0)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[600px] flex flex-col">
          <div className="text-center py-12 flex-1 flex items-center justify-center">
            <div>
              <DocumentTextIcon className="h-20 w-20 text-white/40 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">
                No components added yet
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Click on components above or use "Add Component" button to start
                building your page
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Component Configuration ({components.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
          {components.map((component, index) => {
            const isVisible =
              component.isVisible === true || component.isVisible === 1;
            const themeClass = component.theme === 1 ? "light" : "dark";

            return (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border transition-all duration-500 ${
                  !isVisible
                    ? "border-red-400/40 bg-red-500/5 opacity-60 scale-95"
                    : component.theme === 1
                    ? "border-yellow-400/30 bg-yellow-500/5"
                    : "border-gray-400/30 bg-gray-500/5"
                }`}
                data-theme={themeClass}
                data-component-visible={isVisible}
              >
                {/* Component Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">
                      {availableComponents.find(
                        (c) => c.componentType === component.componentType
                      )?.icon || "📄"}
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Component #{index + 1}
                    </h4>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRemoveComponent(index)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Component Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Component Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Component Type
                    </label>
                    <input
                      type="text"
                      value={component.componentType || ""}
                      onChange={(e) =>
                        handleComponentUpdate(index, "componentType", e.target.value)
                      }
                      placeholder="e.g., HeroSection, CtaButton"
                      className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                    />
                  </div>

                  {/* Component Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Component Name
                    </label>
                    <input
                      type="text"
                      value={component.componentName || ""}
                      onChange={(e) =>
                        handleComponentUpdate(index, "componentName", e.target.value)
                      }
                      placeholder="e.g., Main Hero, Footer CTA"
                      className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                    />
                  </div>

                  {/* Component Toggles */}
                  <div className="md:col-span-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <ComponentToggles
                      isVisible={isVisible}
                      theme={component.theme || 1}
                      onVisibilityChange={(val) =>
                        handleComponentUpdate(index, "isVisible", val)
                      }
                      onThemeChange={(val) =>
                        handleComponentUpdate(index, "theme", val)
                      }
                      size="normal"
                      layout="horizontal"
                    />
                  </div>

                  {/* Content Configuration */}
                  <div className="col-span-full">
                    <ComponentFormRenderer
                      component={component}
                      index={index}
                      componentSchemas={componentSchemas}
                      getAboutComponentSchema={getAboutComponentSchema}
                      getGeneralComponentSchema={getGeneralComponentSchema}
                      generateDynamicSchema={generateDynamicSchema}
                      validateAndFormatJSON={validateAndFormatJSON}
                      onUpdate={handleComponentUpdate}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentConfigurationSection;

