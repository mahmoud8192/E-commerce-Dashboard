/**
 * Select
 *
 * A reusable, controlled `<select>` component with:
 * - Optional label and required indicator
 * - Placeholder option
 * - Disabled and error states
 * - External styling via `className`
 *
 * Designed for use in forms, filters, and dashboards.
 * State is fully controlled by the parent component.
 *
 * @param {string} [label] - Optional label displayed above the select field
 * @param {{ label: string, value: string | number }[]} options - List of selectable options
 * @param {string | number} value - Currently selected value
 * @param {(event: React.ChangeEvent<HTMLSelectElement>) => void} onChange - Change handler
 * @param {string} [name] - Name attribute for form submission
 * @param {string} [error] - Validation error message (renders error styles when present)
 * @param {string} [placeholder="Select an option"] - Placeholder option label
 * @param {boolean} [required=false] - Marks the field as required (visual only)
 * @param {boolean} [disabled=false] - Disables user interaction
 * @param {string} [className=""] - Optional wrapper class for layout control
 */
const Select = ({
  label,
  options = [{ label: "Label", value: "value" }],
  value,
  onChange,
  name,
  error,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = ""
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Field label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {/* Required indicator (visual only) */}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select input */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          block w-full rounded-lg border-gray-300 shadow-sm
          focus:border-primary-500 focus:ring-primary-500
          disabled:bg-gray-50 disabled:text-gray-500
          px-4 py-2 text-gray-900
          ${error ? "border-red-500" : ""}
        `}
      >
        {/* Placeholder option */}
        <option>{placeholder}</option>

        {/* Render options */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Validation error message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
