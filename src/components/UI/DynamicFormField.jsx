import React from "react";

const DynamicFormField = ({ field, onChange }) => {
  const handleChange = (value) => {
    onChange(field.path, value);
  };

  const renderField = () => {
    switch (field.type) {
      case "string":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white capitalize">
              {field.label}
            </label>
            {field.isLongText ? (
              <textarea
                value={field.value}
                onChange={(e) => handleChange(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={`Enter ${field.label}`}
              />
            ) : (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${field.label}`}
              />
            )}
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white capitalize">
              {field.label}
            </label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${field.label}`}
            />
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={field.key}
                checked={field.value}
                onChange={(e) => handleChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor={field.key} className="text-sm font-medium text-white capitalize">
                {field.label}
              </label>
            </div>
          </div>
        );

      case "array":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white capitalize">
              {field.label} ({field.value.length} items)
            </label>
            <div className="space-y-2">
              {field.items.map((item, index) => (
                <div key={`${field.key}_${index}`} className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Item {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newArray = [...field.value];
                        newArray.splice(index, 1);
                        handleChange(newArray);
                      }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  {item.subFields ? (
                    <div className="space-y-2">
                      {item.subFields.map((subField) => (
                        <DynamicFormField
                          key={subField.key}
                          field={subField}
                          onChange={onChange}
                        />
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const newArray = [...field.value];
                        newArray[index] = e.target.value;
                        handleChange(newArray);
                      }}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${field.label} item`}
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newArray = [...field.value];
                  newArray.push(typeof field.value[0] === "object" ? {} : "");
                  handleChange(newArray);
                }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors"
              >
                + Add {field.label} Item
              </button>
            </div>
          </div>
        );

      case "object":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white capitalize">
              {field.label}
            </label>
            <div className="bg-white/5 p-4 rounded border border-white/10 space-y-3">
              {field.subFields.map((subField) => (
                <DynamicFormField
                  key={subField.key}
                  field={subField}
                  onChange={onChange}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default DynamicFormField;
