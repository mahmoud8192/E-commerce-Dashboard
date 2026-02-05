import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Statistics Card Component for Dashboard
 */
const StatCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color = "primary"
}) => {
  const colors = {
    primary: "bg-primary-50 text-primary-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-yellow-50 text-yellow-600",
    danger: "bg-red-50 text-red-600"
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>

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
