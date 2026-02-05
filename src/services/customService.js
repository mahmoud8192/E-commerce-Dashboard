import api from "./api";
import { mockCustomers } from "../data/mockCustomers";

const MOCK_MODE = true;

export const customersService = {
  /**
   * Get all customers with optional filters
   * @param {Object} filters - { search, page, limit }
   * @returns {Promise<Array>}
   */
  getCustomers: async (filters = {}) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredCustomers = [...mockCustomers];

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(searchLower) ||
            customer.email.toLowerCase().includes(searchLower)
        );
      }

      return filteredCustomers;
    }

    try {
      const response = await api.get("/customers", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch customers"
      );
    }
  },

  /**
   * Get single customer by ID
   * @param {string} customerId
   * @returns {Promise<Object>}
   */
  getCustomerById: async (customerId) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const customer = mockCustomers.find((c) => c.id === customerId);
      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
    }

    try {
      const response = await api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch customer"
      );
    }
  }
};
