import React from "react";
import MediaPicker from "../MediaPicker";

const Input = React.forwardRef(
  (
    {
      className = "",
      type = "text",
      placeholder,
      label,
      error,
      icon,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const inputClasses = [
      baseClasses,
      icon ? "pl-10" : "",
      error ? "border-red-500 focus-visible:ring-red-500" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // If mediaPicker or formField === 'media', render MediaPicker
    if (props.mediaPicker || props.formField === "media") {
      return (
        <div className="w-full">
          {label && (
            <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] mb-1">
              {label}
            </label>
          )}
          <MediaPicker
            {...props}
            label={label}
            error={error}
            mediaType={props.mediaType || "image"}
            value={props.value}
            onChange={props.onChange}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      );
    }
    // Default input
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">{icon}</div>
            </div>
          )}
          <input
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

const Textarea = React.forwardRef(
  ({ className = "", placeholder, label, error, rows = 4, ...props }, ref) => {
    const baseClasses =
      "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const textareaClasses = [
      baseClasses,
      error ? "border-red-500 focus-visible:ring-red-500" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] mb-1">
            {label}
          </label>
        )}
        <textarea
          className={textareaClasses}
          placeholder={placeholder}
          rows={rows}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

const Select = React.forwardRef(
  (
    {
      className = "",
      placeholder,
      label,
      error,
      options = [],
      optionClassName = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const selectClasses = [
      baseClasses,
      error ? "border-red-500 focus-visible:ring-red-500" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const optionClasses = [
      "bg-white text-gray-900",
      "dark:bg-gray-800 dark:text-white",
      optionClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] mb-1">
            {label}
          </label>
        )}
        <select className={selectClasses} ref={ref} {...props}>
          {placeholder && (
            <option value="" disabled className={optionClasses}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={optionClasses}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
export default Input;
