/**
 * Spinner
 *
 * A reusable loading indicator used to communicate
 * background activity such as data fetching or processing.
 *
 * Features:
 * - Multiple predefined sizes
 * - Fully presentational (no internal logic or state)
 * - Easily composable inside buttons, cards, and pages
 *
 * @param {"sm" | "md" | "lg" | "xl"} [size="md"] - Controls the spinner dimensions
 * @param {string} [className=""] - Optional wrapper classes for layout customization
 */

/**
 * Maps size variants to Tailwind width/height utilities.
 * Centralizing this mapping avoids hard-coding styles
 * throughout the component.
 */
const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16"
};

function Spinner({ size = "md", className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      {/* Spinning circle */}
      <div
        className={`animate-spin  rounded-full border-t-3 border-b-3 ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default Spinner;
