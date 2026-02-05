import api from "./api";
import {
  mockDashboardStats,
  mockRecentOrders,
  mockTopProducts,
  mockAnalyticsData
} from "../data/mockDashboard";

const MOCK_MODE = true;

export const dashboardService = {
  /**
   * Get dashboard statistics
   * @returns {Promise<Object>}
   */
  getStats: async () => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      return {
        stats: mockDashboardStats,
        recentOrders: mockRecentOrders,
        topProducts: mockTopProducts
      };
    }

    try {
      const response = await api.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch stats");
    }
  },

  /**
   * Get analytics data
   * @param {string} timeRange - '7d', '30d', '90d', '1y'
   * @returns {Promise<Object>}
   */
  getAnalytics: async (timeRange = "7d") => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      return mockAnalyticsData[timeRange] || mockAnalyticsData["7d"];
    }

    try {
      const response = await api.get(`/dashboard/analytics?range=${timeRange}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
};
