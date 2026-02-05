/**
 * Button
 *
 * A reusable, accessible button component with support for:
 * - Variants
 * - Sizes
 * - Icons
 * - Loading state
 * - Disabled state
 * - Full-width layout
 *
 * @component
 *
 * @param {React.ReactNode} children
 *  Button label or content.
 *
 * @param {"primary" | "secondary" | "success" | "danger" | "outline" | "ghost"} variant
 *  Visual style of the button.
 *
 * @param {"sm" | "md" | "lg"} size
 *  Size of the button.
 *
 * @param {boolean} fullWidth
 *  When true, the button expands to fill its container width.
 *
 * @param {boolean} disabled
 *  Disables user interaction and applies disabled styling.
 *
 * @param {boolean} loading
 *  Shows a spinner and disables interaction while loading.
 *
 * @param {React.ReactNode} icon
 *  Optional icon displayed before the button text.
 *
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} onClick
 *  Click event handler.
 *
 * @param {"button" | "submit" | "reset"} type
 *  Native HTML button type attribute.
 *
 * @param {string} className
 *  Optional additional CSS / Tailwind classes
 *  for layout or style overrides.
 *
 * @returns {JSX.Element}
 *  A styled button element with optional loading indicator and icon.
 */

const baseStyles =
  "cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-blue-600 text-white hover:brightness-75 focus:ring-primary-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline:
    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
};

function Button({
  children,
  variant = "success",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  type = "button",
  className = ""
}) {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;
