import { useEffect, useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import SearchInput from "../components/common/SearchInput";
import Pagination from "../components/common/Pagination";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { useDebounce } from "../hooks/useDebounce";
import { formatCurrency } from "../utils/formatters";
import { format } from "date-fns";
import { Users, Mail, Phone, MapPin } from "lucide-react";

/**
 * Customers Page Component
 */
const Customers = () => {
  const { customers, customersLoading, fetchCustomers } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and pagination
  const { filteredData, updateFilter, resetFilters } = useFilter(customers, {
    search: ""
  });

  const {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPreviousPage
  } = usePagination(filteredData, 10);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    updateFilter("search", debouncedSearch);
  }, [debouncedSearch]);

  const getStatusVariant = (status) => {
    const variants = {
      active: "success",
      inactive: "default",
      vip: "warning"
    };
    return variants[status] || "default";
  };

  if (customersLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">
          Manage and view customer information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Users className="text-primary-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter((c) => c.status === "vip").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Users className="text-yellow-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.filter((c) => c.status === "inactive").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <Users className="text-gray-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          placeholder="Search by name or email..."
        />
      </Card>

      {/* Customers Table */}
      <Card padding={false}>
        {currentData.length === 0 ? (
          <EmptyState
            icon={<Users size={48} />}
            title="No customers found"
            message="No customers match your current search criteria."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {customer.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {customer.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(customer.totalSpent)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(customer.status)}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {format(
                            new Date(customer.joinedDate),
                            "MMM dd, yyyy"
                          )}
                        </span>
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
    </div>
  );
};

export default Customers;
