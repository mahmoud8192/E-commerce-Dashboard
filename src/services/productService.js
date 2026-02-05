import api from "./api";
import { mockProducts } from "../data/mockProducts";

const MOCK_MODE = true;

export const productsService = {
  /**
   * Get all products with optional filters
   * @param {Object} filters - { category, search, page, limit }
   * @returns {Promise<Array>}
   */
  getProducts: async (filters = {}) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredProducts = [...mockProducts];

      // Apply category filter
      if (filters.category && filters.category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filters.category
        );
      }

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.sku.toLowerCase().includes(searchLower)
        );
      }

      return filteredProducts;
    }

    try {
      const response = await api.get("/products", { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  },

  /**
   * Create new product
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  createProduct: async (productData) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const newProduct = {
        id: "prod_" + Date.now(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockProducts.unshift(newProduct);
      return newProduct;
    }

    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  },

  /**
   * Update product
   * @param {string} productId
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  updateProduct: async (productId, productData) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const productIndex = mockProducts.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      mockProducts[productIndex] = {
        ...mockProducts[productIndex],
        ...productData,
        updatedAt: new Date().toISOString()
      };

      return mockProducts[productIndex];
    }

    try {
      const response = await api.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  },

  /**
   * Delete product
   * @param {string} productId
   * @returns {Promise<void>}
   */
  deleteProduct: async (productId) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const productIndex = mockProducts.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        throw new Error("Product not found");
      }

      mockProducts.splice(productIndex, 1);
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
};
