import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatCard Component
 *
 * A reusable dashboard card to display key statistics with optional trend indicators and icons.
 *
 * Props:
 * @param {string} title - The title or label of the statistic (e.g., "Revenue").
 * @param {string|number} value - The main value to display (e.g., "12,345" or "$12,345").
 * @param {number} [change] - Percentage change compared to a previous period. Optional.
 * @param {'up'|'down'} [trend] - Direction of the change; "up" shows a green upward arrow, "down" shows a red downward arrow. Optional.
 * @param {React.ElementType} [icon] - A React component to display as an icon on the card. Optional.
 * @param {'primary'|'success'|'warning'|'danger'} [color='primary'] - Background color variant for the icon container. Defaults to "primary".
 *
 * Color Mapping:
 * - primary: light blue background with blue icon
 * - success: light green background with green icon
 * - warning: light yellow background with yellow icon
 * - danger: light red background with red icon
 *
 * Usage Example:
 * <StatCard
 *   title="Revenue"
 *   value="$12,345"
 *   change={15.2}
 *   trend="up"
 *   icon={DollarSignIcon}
 *   color="success"
 * />
 */
const StatCard = ({ title, value, change, trend, Icon, color = "primary" }) => {
  // Define color classes for the icon container
  const colors = {
    primary: "bg-primary-50 text-primary-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-yellow-50 text-yellow-600",
    danger: "bg-red-50 text-red-600"
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between">
        {/* Statistic Text */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>

          {/* Optional Trend Indicator */}
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>

        {/* Optional Icon */}
        {Icon && (
          <div
            className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
