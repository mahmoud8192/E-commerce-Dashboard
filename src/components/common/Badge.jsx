/**
 * Badge Component
 *
 * A small, inline visual indicator used to display status,
 * category labels, or short contextual information.
 *
 * Common use cases include:
 * - Status indicators (success, warning, error)
 * - Labels or tags
 * - Counters or metadata
 *
 * @component
 *
 * @param {React.ReactNode} children
 *  Content displayed inside the badge (text or icon).
 *
 * @param {"default" | "primary" | "success" | "warning" | "danger" | "info"} variant
 *  Visual style of the badge.
 *  Controls background and text color.
 *
 * @param {"sm" | "md" | "lg"} size
 *  Size of the badge.
 *  Controls padding and font size.
 *
 * @param {string} className
 *  Optional additional CSS / Tailwind classes
 *  for layout or style overrides.
 *
 * @returns {JSX.Element}
 *  A styled inline badge element.
 */

const variants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-cyan-100 text-cyan-800"
};
const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base"
};

function Badge({ children, variant = "default", size = "md", className = "" }) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
export default Badge;
