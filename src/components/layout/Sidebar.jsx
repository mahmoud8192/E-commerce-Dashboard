/**
 * Sidebar Navigation Component
 *
 * This component renders the main sidebar used for navigation
 * in the admin dashboard layout.
 *
 * Features:
 * - Responsive sidebar (mobile + desktop)
 * - Slide-in / slide-out animation on mobile
 * - Active route highlighting using NavLink
 * - Backdrop overlay for mobile UX
 * - Icon-based navigation items
 * - Bottom helper section (Help / Docs)
 *
 * Dependencies:
 * - react-router-dom (Link, NavLink) for routing
 * - lucide-react for icons
 * - Tailwind CSS for styling
 */

import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  X
} from "lucide-react";

/**
 * Sidebar menu configuration
 *
 * Each item represents a navigation link in the sidebar.
 *
 * Properties:
 * - name: Displayed label in the sidebar
 * - icon: Icon component from lucide-react
 * - path: Route path used by react-router
 *
 * This array-driven approach allows:
 * - Easy extension (add/remove items)
 * - Cleaner JSX
 * - Centralized navigation management
 */
const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" }
];

/**
 * Sidebar Component
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls sidebar visibility on mobile screens
 * @param {Function} props.onClose - Callback to close the sidebar
 *
 * Behavior:
 * - On large screens (lg): sidebar is always visible
 * - On small screens: sidebar slides in/out
 * - Clicking backdrop or close button triggers onClose
 */
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 
        Mobile Backdrop Overlay
        -----------------------
        - Rendered only when sidebar is open
        - Prevents interaction with background content
        - Clicking it closes the sidebar
        - Hidden on large screens
      */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 
        Sidebar Container
        -----------------
        - Fixed position to stay visible
        - Uses transform for slide animation
        - Hidden off-screen on mobile when closed
        - Always visible on large screens
      */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* 
          Header Section (Logo + Close Button)
          -----------------------------------
          - Contains app logo/title
          - Close button only visible on mobile
        */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>

            {/* App Title */}
            <span className="text-xl font-bold text-gray-900">Admin</span>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* 
          Navigation Menu
          ----------------
          - Maps over menuItems
          - Uses NavLink to detect active route
          - Applies active styles automatically
        */}
        <nav className="px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {/* Menu Icon */}
              <item.icon size={20} />

              {/* Menu Label */}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* 
          Bottom Help Section
          -------------------
          - Fixed to bottom of sidebar
          - Provides quick access to documentation/help
          - Visually separated using border and background
        */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-primary-900 mb-1">
              Need Help?
            </h4>

            {/* Documentation Link */}
            <Link to={"/"} className="text-xs text-primary-700 mb-3">
              Check our documentation
            </Link>

            {/* Call-to-action Button */}
            <button className="w-full px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors">
              View Docs
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

/**
 * Export Sidebar component
 */
export default Sidebar;
