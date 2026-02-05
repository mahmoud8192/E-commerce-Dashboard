import { useEffect, useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import SearchInput from "../components/common/SearchInput";
import Select from "../components/common/Select";
import Pagination from "../components/common/Pagination";
import Modal from "../components/common/Modal";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { useDebounce } from "../hooks/useDebounce";
import { formatCurrency } from "../utils/formatters";
import { format } from "date-fns";
import { Eye, Filter, Download, ShoppingBag } from "lucide-react";

/**
 * Orders Page Component
 */
const Orders = () => {
  const { orders, ordersLoading, fetchOrders, updateOrderStatus } =
    useDashboard();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and pagination
  const { filteredData, filters, updateFilter, resetFilters } = useFilter(
    orders,
    {
      status: "all",
      search: ""
    }
  );

  const {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage
  } = usePagination(filteredData, 10);

  // Load orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update search filter when debounced search changes
  useEffect(() => {
    updateFilter("search", debouncedSearch);
  }, [debouncedSearch]);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const getStatusVariant = (status) => {
    const variants = {
      delivered: "success",
      processing: "warning",
      shipped: "info",
      pending: "default",
      cancelled: "danger"
    };
    return variants[status] || "default";
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleExport = () => {
    // Mock export functionality
    const csv = [
      ["Order Number", "Customer", "Date", "Total", "Status"],
      ...filteredData.map((order) => [
        order.orderNumber,
        order.customer,
        format(new Date(order.date), "yyyy-MM-dd"),
        order.total,
        order.status
      ])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  if (ordersLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all customer orders
          </p>
        </div>

        <Button
          variant="outline"
          icon={<Download size={18} />}
          onClick={handleExport}
        >
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search by order number or customer..."
            />
          </div>

          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
            placeholder="Filter by status"
          />
        </div>

        {(filters.status !== "all" || searchTerm) && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredData.length} of {orders.length} orders
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetFilters();
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* Orders Table */}
      <Card padding={false}>
        {currentData.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag size={48} />}
            title="No orders found"
            message="No orders match your current filters. Try adjusting your search criteria."
            action={
              <Button
                onClick={() => {
                  resetFilters();
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.customer}
                          </p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {format(new Date(order.date), "MMM dd, yyyy")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {order.items}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(order.total)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye size={16} />}
                          onClick={() => handleViewDetails(order)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </>
        )}
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Order Details"
          size="lg"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button variant="primary">Print Invoice</Button>
            </>
          }
        >
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="text-base font-semibold text-gray-900">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="text-base font-semibold text-gray-900">
                  {format(new Date(selectedOrder.date), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="text-base font-semibold text-gray-900">
                  {selectedOrder.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <div className="mt-1">
                  <Select
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "processing", label: "Processing" },
                      { value: "shipped", label: "Shipped" },
                      { value: "delivered", label: "Delivered" },
                      { value: "cancelled", label: "Cancelled" }
                    ]}
                    value={selectedOrder.status}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Customer Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="text-gray-900 font-medium">
                    {selectedOrder.customer}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="text-gray-900">{selectedOrder.email}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Shipping Address:</span>{" "}
                  <span className="text-gray-900">
                    {selectedOrder.shippingAddress}
                  </span>
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Order Items
              </h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Product
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {product.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          {formatCurrency(product.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan="2"
                        className="px-4 py-3 text-sm font-semibold text-gray-900"
                      >
                        Total
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(selectedOrder.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
