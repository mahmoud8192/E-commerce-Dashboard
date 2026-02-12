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
import { formatDate } from "../utils/formatters";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import Table from "../components/Tables/Table";

/**
 * Customers Page Component
 */

const columns = [
  { Header: "Customer", accessor: "customer" },
  { Header: "Contact", accessor: "contact" },
  { Header: "Location", accessor: "location" },
  { Header: "Orders", accessor: "totalOrders" },
  { Header: "Total Spent", accessor: "total" },
  { Header: "Status", accessor: "status" },
  { Header: "Joined", accessor: "date" }
];

const getStatusVariant = (status) => {
  const variants = {
    active: "success",
    inactive: "default",
    vip: "warning"
  };
  return variants[status] || "default";
};

const renderRow = (row, col) => {
  switch (col.accessor) {
    case "date": {
      return (
        <span className="text-sm text-gray-500">
          {formatDate(new Date(row.joinedDate), "MMM dd, yyyy")}
        </span>
      );
    }
    case "total": {
      return (
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(row.totalSpent)}
        </span>
      );
    }
    case "status": {
      return <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>;
    }
    case "location": {
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            {row.location}
          </div>
        </td>
      );
    }

    case "contact": {
      return (
        <td className="px-6 py-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} />
              {row.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} />
              {row.phone}
            </div>
          </div>
        </td>
      );
    }
    case "customer": {
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img
              src={row.avatar}
              alt={row.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{row.name}</p>
              <p className="text-xs text-gray-500">ID: {row.id}</p>
            </div>
          </div>
        </td>
      );
    }

    default: {
      return <span className="text-sm text-gray-900">{row[col.accessor]}</span>;
    }
  }
};

const Customers = () => {
  const { customers, loading, fetchCustomers } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and pagination
  const { filteredData, updateFilter, filterMode, resetFilters } = useFilter(
    customers,
    {
      search: ""
    }
  );

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

  if (loading) {
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
            <Table
              columns={columns}
              data={filterMode ? filteredData : customers}
              renderRow={renderRow}
            />

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
