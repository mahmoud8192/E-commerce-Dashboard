import Table from "./Table";
import useOrders from "../../hooks/useOrders";
import { formatCurrency, formatDate } from "../../utils/formatters";
// Usage example for your orders
const OrdersTable = ({ orders }) => {
  const { columns, getStatusVariant } = useOrders();

  const renderRow = (row, col) => {
    switch (col.accessor) {
      case "date": {
        return (
          <span className="text-sm text-gray-500">
            {formatDate(new Date(row.date), "MMM dd, yyyy")}
          </span>
        );
      }
      case "total": {
        return (
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(row.total)}
          </span>
        );
      }
      case "status": {
        return (
          <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>
        );
      }
      default: {
        return (
          <span className="text-sm text-gray-900">{row[col.accessor]}</span>
        );
      }
    }
  };

  return <Table columns={columns} data={orders} renderRow={renderRow} />;
};

export default OrdersTable;
