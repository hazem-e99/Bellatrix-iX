import Modal from "../../../UI/Modal";
import Button from "../../../UI/Button";

const ComponentInputModal = ({
  isOpen,
  onClose,
  component,
  useNewInputSystem,
  onToggleInputSystem,
  onUpdate,
  renderDynamicInputs,
}) => {
  if (!isOpen || !component) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configure ${component.componentName || component.componentType}`}
      size="xl"
    >
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useNewInputSystem}
            onChange={(e) => onToggleInputSystem(e.target.checked)}
            className="rounded"
          />
          <span className="font-medium">Use New Input System</span>
          <span className="text-sm text-gray-600">
            (Toggle between old and new input systems)
          </span>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium mb-4 text-blue-800">
          ✅ Component Configuration for{" "}
          {component.componentName || component.componentType}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Title</label>
            <input
              type="text"
              defaultValue="Sample Title"
              onChange={(e) => onUpdate(component.index, "title", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              defaultValue="Sample description"
              onChange={(e) =>
                onUpdate(component.index, "description", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
        </div>

        {useNewInputSystem && (
          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
            <h5 className="font-medium text-blue-800 mb-3">
              🎯 Component-Specific Configuration
            </h5>
            {renderDynamicInputs(
              component.contentJson ? JSON.parse(component.contentJson) : {},
              "",
              0,
              component.index
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded">
          <p className="text-sm text-green-600">
            🎉 Success! Modal is connected to component updates. Try changing the inputs
            above.
          </p>
          <p className="text-xs text-green-500 mt-1">
            Changes will reflect in real-time on the component preview.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Close Modal
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Save Configuration
        </button>
      </div>
    </Modal>
  );
};

export default ComponentInputModal;

