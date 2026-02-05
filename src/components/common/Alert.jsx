import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

/**
 * Alert Component
 *
 * A reusable alert/notification component for displaying
 * contextual feedback messages such as success, error,
 * warning, or informational notices.
 *
 * @component
 *
 * @param {"success" | "error" | "warning" | "info"} type
 *  Visual style and semantic meaning of the alert.
 *  Determines background color, border, text color, and icon.
 *
 * @param {string} title
 *  Optional alert title displayed in bold above the message.
 *
 * @param {string} message
 *  Optional descriptive message providing additional context.
 *
 * @param {() => void} onClose
 *  Callback fired when the dismiss (close) button is clicked.
 *  Required if `dismissible` is true.
 *
 * @param {boolean} dismissible
 *  Controls whether the alert can be dismissed by the user.
 *  When true and `onClose` is provided, a close button is shown.
 *
 * @param {string} className
 *  Optional additional Tailwind / CSS classes
 *  for custom layout or styling overrides.
 *
 * @returns {JSX.Element}
 *  A styled alert box with icon, text content, and optional dismiss button.
 *
 * Tips:
 *
 * - To keep the Alert loosely coupled,
 *   the parent controls when and how it unmounts via the onClose callback.
 */

const types = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: <CheckCircle size={20} className="text-green-600" />
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: <AlertCircle size={20} className="text-red-600" />
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: <AlertTriangle size={20} className="text-yellow-600" />
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: <Info size={20} className="text-blue-600" />
  }
};

function Alert({
  type = "info",
  title,
  message,
  onClose,
  dismissible = true,
  className = ""
}) {
  const config = types[type];

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start">
        {/* Alert icon */}
        <div className="shrink-0">{config.icon}</div>

        {/* Alert content */}
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.text}`}>{title}</h3>
          )}
          {message && (
            <p className={`text-sm ${config.text} ${title ? "mt-1" : ""}`}>
              {message}
            </p>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className={`ml-3 inline-flex shrink-0 ${config.text} hover:opacity-75`}
            aria-label="Close alert"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
