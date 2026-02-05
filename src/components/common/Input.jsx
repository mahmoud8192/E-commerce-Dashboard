import { forwardRef } from "react";

/**
 * Reusable Input Component
 *
 * A flexible input field supporting multiple types (text, email, password, number),
 * optional label, icon, helper text, and error display.
 *
 * Uses `forwardRef` to expose the internal `<input>` element to parent components.
 *
 * ⚡ **ForwardRef Hint:** This allows the parent to call imperative functions
 * like `.focus()` or `.select()` directly on the input, without needing
 * extra props or callbacks for that behavior.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Optional label displayed above the input
 * @param {string} [props.error] - Optional error message; highlights border red
 * @param {string} [props.helperText] - Optional helper text shown below the input
 * @param {React.ReactNode} [props.icon] - Optional icon inside the input (left side)
 * @param {"text"|"email"|"password"|"number"} [props.type="text"] - Input type
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string|number} [props.value] - Input value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Change handler
 * @param {(e: React.FocusEvent<HTMLInputElement>) => void} [props.onBlur] - Blur handler
 * @param {string} [props.name] - Input name attribute
 * @param {boolean} [props.disabled=false] - Disable the input
 * @param {boolean} [props.required=false] - Add required indicator to label
 * @param {string} [props.className=""] - Additional container classes
 *
 * @returns {JSX.Element} A styled input element with optional label, icon, helper text, and error display.
 *
 * @example
 * const inputRef = useRef();
 * <Input
 *   ref={inputRef}
 *   label="Email"
 *   placeholder="Enter your email"
 *   error={emailError}
 * />
 *
 * // Parent can now do:
 * inputRef.current.focus();
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      name,
      disabled = false,
      required = false,
      className = ""
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              block w-full rounded-lg border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500
              disabled:bg-gray-50 disabled:text-gray-500
              ${icon ? "pl-10" : "pl-4"}
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
              py-2 pr-4 text-gray-900
            `}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

// explicitly set displayed name becouse of the wraper forwardRef
//  -- good for testing and trace it in error message --
Input.displayName = "Input";

export default Input;
