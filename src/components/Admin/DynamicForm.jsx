import React, { useState, useCallback } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component for drag and drop
const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-start gap-2">
        <button
          {...listeners}
          className="mt-2 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM8 6a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9zm-1 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
          </svg>
        </button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

// Individual Form Field Component
export const FormField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  options = [],
  isRequired = false,
  placeholder = '',
  description = '',
  className = ''
}) => {
  const fieldId = `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
            rows={4}
          />
        );
      
      case 'boolean':
        return (
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => onChange(!value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        );
      
      case 'select':
        return (
          <select
            id={fieldId}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            id={fieldId}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      default:
        return (
          <input
            id={fieldId}
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      {renderField()}
    </div>
  );
};

// Object/Section Editor Component
export const ObjectEditor = ({ 
  data, 
  onChange, 
  title = 'Object', 
  collapsible = true,
  showDeleteButton = false,
  onDelete = null,
  customFields = {}
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFieldChange = useCallback((key, value) => {
    onChange({
      ...data,
      [key]: value
    });
  }, [data, onChange]);

  const renderFieldForValue = (key, value) => {
    // Check if there's a custom field configuration
    const fieldConfig = customFields[key] || {};
    
    if (typeof value === 'boolean') {
      return (
        <FormField
          key={key}
          label={fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={(newValue) => handleFieldChange(key, newValue)}
          type="boolean"
          description={fieldConfig.description}
        />
      );
    }
    
    if (typeof value === 'number') {
      return (
        <FormField
          key={key}
          label={fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={(newValue) => handleFieldChange(key, newValue)}
          type="number"
          description={fieldConfig.description}
        />
      );
    }
    
    if (typeof value === 'string') {
      // Determine field type based on content or configuration
      let fieldType = 'text';
      
      if (fieldConfig.type) {
        fieldType = fieldConfig.type;
      } else if (key.toLowerCase().includes('email')) {
        fieldType = 'email';
      } else if (key.toLowerCase().includes('url') || value.startsWith('http')) {
        fieldType = 'url';
      } else if (value.length > 100 || value.includes('\n')) {
        fieldType = 'textarea';
      }
      
      return (
        <FormField
          key={key}
          label={fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={(newValue) => handleFieldChange(key, newValue)}
          type={fieldType}
          placeholder={fieldConfig.placeholder}
          description={fieldConfig.description}
        />
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <ArrayEditor
          key={key}
          data={value}
          onChange={(newValue) => handleFieldChange(key, newValue)}
          title={fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1)}
          itemTemplate={fieldConfig.itemTemplate}
        />
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <ObjectEditor
          key={key}
          data={value}
          onChange={(newValue) => handleFieldChange(key, newValue)}
          title={fieldConfig.label || key.charAt(0).toUpperCase() + key.slice(1)}
          customFields={fieldConfig.fields || {}}
        />
      );
    }
    
    return null;
  };

  if (!data || typeof data !== 'object') {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">Invalid object data</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        {showDeleteButton && onDelete && (
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete this section"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {renderFieldForValue(key, value)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Array Editor Component with drag and drop
export const ArrayEditor = ({ 
  data, 
  onChange, 
  title = 'Array', 
  itemTemplate = null,
  collapsible = true 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = data.findIndex((_, index) => index.toString() === active.id);
      const newIndex = data.findIndex((_, index) => index.toString() === over.id);
      
      onChange(arrayMove(data, oldIndex, newIndex));
    }
  }, [data, onChange]);

  const addItem = useCallback(() => {
    const newItem = itemTemplate || 
      (typeof data[0] === 'string' ? '' : 
       typeof data[0] === 'object' ? {} : '');
    onChange([...data, newItem]);
  }, [data, onChange, itemTemplate]);

  const removeItem = useCallback((index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  }, [data, onChange]);

  const updateItem = useCallback((index, newValue) => {
    const newData = [...data];
    newData[index] = newValue;
    onChange(newData);
  }, [data, onChange]);

  if (!Array.isArray(data)) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">Invalid array data</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
          <h3 className="text-md font-medium text-gray-900">
            {title} ({data.length} items)
          </h3>
        </div>
        
        <button
          onClick={addItem}
          className="flex items-center space-x-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {!isCollapsed && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((_, index) => index.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {data.map((item, index) => (
                <SortableItem key={index} id={index.toString()}>
                  <div className="bg-white border border-gray-200 rounded-md p-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Item {index + 1}
                      </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove this item"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {typeof item === 'string' ? (
                      <FormField
                        label=""
                        value={item}
                        onChange={(newValue) => updateItem(index, newValue)}
                        type={item.length > 100 || item.includes('\n') ? 'textarea' : 'text'}
                      />
                    ) : typeof item === 'object' && item !== null ? (
                      <ObjectEditor
                        data={item}
                        onChange={(newValue) => updateItem(index, newValue)}
                        title=""
                        collapsible={false}
                      />
                    ) : (
                      <FormField
                        label=""
                        value={item}
                        onChange={(newValue) => updateItem(index, newValue)}
                      />
                    )}
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};