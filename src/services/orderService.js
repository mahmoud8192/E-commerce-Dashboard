import api from "./api";
import { mockOrders } from "../data/mockOrders";

const MOCK_MODE = true;

export const ordersService = {
  /**
   * Get all orders with optional filters
   * @param {Object} filters - { status, search, page, limit }
   * @returns {Promise<Array>}
   */
  getOrders: async (filters = {}) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredOrders = [...mockOrders];

      // Apply status filter
      if (filters.status && filters.status !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === filters.status
        );
      }

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.orderNumber.toLowerCase().includes(searchLower) ||
            order.customer.toLowerCase().includes(searchLower)
        );
      }

      return filteredOrders;
    }

    try {
      const response = await api.get("/orders", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  },

  /**
   * Get single order by ID
   * @param {string} orderId
   * @returns {Promise<Object>}
   */
  getOrderById: async (orderId) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const order = mockOrders.find((o) => o.id === orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    }

    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch order");
    }
  },

  /**
   * Update order status
   * @param {string} orderId
   * @param {string} status
   * @returns {Promise<Object>}
   */
  updateStatus: async (orderId, status) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const orderIndex = mockOrders.findIndex((o) => o.id === orderId);
      if (orderIndex === -1) {
        throw new Error("Order not found");
      }

      mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status,
        updatedAt: new Date().toISOString()
      };

      return mockOrders[orderIndex];
    }

    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
};
