import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Reusable Modal Component
 *
 * Displays content in a centered overlay with optional header, body, and footer.
 * Supports closing via Escape key or backdrop click, and prevents background scrolling while open.
 *
 * Props:
 * @param {boolean} isOpen - Controls whether the modal is visible
 * @param {() => void} onClose - Function to call when the modal should close
 * @param {string} [title] - Optional title displayed in the modal header
 * @param {React.ReactNode} children - Main modal content
 * @param {React.ReactNode} [footer] - Optional footer content (e.g., buttons)
 * @param {"sm"|"md"|"lg"|"xl"} [size="md"] - Determines max-width of the modal
 * @param {string} [className=""] - Additional classes for outer container
 */

// Predefined modal max-widths by size
const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl"
};

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = ""
}) {
  // Handle Escape key to close modal and prevent background scrolling
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      // Attach Escape key listener
      document.addEventListener("keydown", handleEscape);

      // Prevent background scrolling while modal is open
      document.body.style.overflow = "hidden";
    }

    // Cleanup function runs when modal closes or unmounts
    return () => {
      // Remove keydown listener to avoid memory leaks and unwanted Escape key handling
      document.removeEventListener("keydown", handleEscape);

      // Restore default scrolling behavior for the page
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don’t render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${className}`}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity bg-black/30"
        onClick={onClose} // Clicking outside modal closes it
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizes[size]} bg-white rounded-lg shadow-xl transform transition-all`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            <button
              onClick={onClose}
              className="text-gray-400  hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
