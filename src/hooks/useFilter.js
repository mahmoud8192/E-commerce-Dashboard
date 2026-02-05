import { useState, useMemo } from "react";

/**
 * Custom hook for filtering and searching data
 * @param {Array} data - Array of data to filter
 * @param {Object} initialFilters - Initial filter state
 * @returns {Object} Filtered data and filter controls
 */
export const useFilter = (data, initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        // Skip empty filters
        if (!value || value === "all" || value === "") return true;

        // Handle search across multiple fields
        if (key === "search") {
          const searchLower = value.toLowerCase();
          return Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchLower)
          );
        }

        // Direct field matching
        return String(item[key])
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });
  }, [data, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filteredData,
    filters,
    updateFilter,
    setFilters,
    resetFilters
  };
};
