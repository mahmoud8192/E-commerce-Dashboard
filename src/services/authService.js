import api from "./api";
import { mockUsers } from "../data/mockUsers";

// Mock mode - set to false when you have a real backend
const MOCK_MODE = true;
const MOCK_PASSWORD = "admin@111";
export const authService = {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  login: async (email, password) => {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock authentication
      const user = mockUsers.find((u) => u.email === email);

      if (!user || password !== MOCK_PASSWORD) {
        return {
          success: false,
          message: "Invalid email or password"
        };
      }

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
          },
          token: "mock-jwt-token-" + Date.now()
        }
      };
    }

    // Real API call
    try {
      const response = await api.post("/auth/login", { email, password });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  },

  /**
   * Register new user
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  register: async (userData) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if email already exists
      const existingUser = mockUsers.find((u) => u.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: "Email already registered"
        };
      }

      return {
        success: true,
        message: "Registration successful"
      };
    }

    try {
      const response = await api.post("/auth/register", userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed"
      };
    }
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise<Object>}
   */
  forgotPassword: async (email) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        success: true,
        message: "Password reset link sent to your email"
      };
    }

    try {
      const response = await api.post("/auth/forgot-password", { email });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Request failed"
      };
    }
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
};
