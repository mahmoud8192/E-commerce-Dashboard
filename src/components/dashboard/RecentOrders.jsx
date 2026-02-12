import { useNavigate } from "react-router-dom";
import Table from "../Tables/Table";
import useOrders from "../../hooks/useOrders";
import { formatCurrency, formatDate } from "../../utils/formatters";
import Badge from "../common/Badge";
import { useCallback, useMemo } from "react";

/**
 * Recent Orders Component
 */
const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate();
  const { columns, getStatusVariant } = useOrders();

  // Memoize columns
  const memoizedColumns = useMemo(() => columns, [columns]);

  // Memoize renderRow function
  const renderRow = useCallback(
    (row, col) => {
      switch (col.accessor) {
        case "date":
          return (
            <span className="text-sm text-gray-500">
              {formatDate(new Date(row.date), "MMM dd, yyyy")}
            </span>
          );
        case "total":
          return (
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(row.total)}
            </span>
          );
        case "status":
          return (
            <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
          );
        default:
          return (
            <span className="text-sm text-gray-900">{row[col.accessor]}</span>
          );
      }
    },
    [getStatusVariant]
  );

  return (
    <div className="bg-white rounded-lg shadow-card">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button
          onClick={() => navigate("/orders")}
          className="cursor-pointer text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All
        </button>
      </div>

      {/* Use memoized columns and renderRow */}
      <Table columns={memoizedColumns} renderRow={renderRow} data={orders} />
    </div>
  );
};

export default RecentOrders;
