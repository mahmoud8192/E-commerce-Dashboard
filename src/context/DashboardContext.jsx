import { createContext, useContext, useState } from "react";
import { dashboardService } from "../services/dashboardService";
import { ordersService } from "../services/orderService";
import { productsService } from "../services/productService";
import { customersService } from "../services/customService";
import toast from "react-hot-toast";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  // Dashboard Stats
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // Orders
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Products
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Customers
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(false);

  // Analytics
  const [analyticsData, setAnalyticsData] = useState(null);

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const data = await dashboardService.getStats();
      setStats(data.stats);
      setRecentOrders(data.recentOrders);
      setTopProducts(data.topProducts);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Orders CRUD
  const fetchOrders = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await ordersService.getOrders(filters);
      setOrders(data);
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const updatedOrder = await ordersService.updateStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
      toast.success("Order status updated");
      return { success: true };
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Products CRUD
  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await productsService.getProducts(filters);
      setProducts(data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    setLoading(true);
    try {
      const newProduct = await productsService.createProduct(productData);
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      toast.success("Product created successfully");
      return { success: true, product: newProduct };
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData) => {
    setLoading(true);
    try {
      const updatedProduct = await productsService.updateProduct(
        productId,
        productData
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );
      toast.success("Product updated successfully");
      return { success: true, product: updatedProduct };
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await productsService.deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast.success("Product deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Customers CRUD
  const fetchCustomers = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await customersService.getCustomers(filters);
      setCustomers(data);
      return data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Analytics
  const fetchAnalytics = async (timeRange = "7d") => {
    setLoading(true);
    try {
      const data = await dashboardService.getAnalytics(timeRange);
      setAnalyticsData(data);
      return data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // Dashboard
    stats,
    recentOrders,
    topProducts,
    fetchDashboardStats,

    // Orders
    orders,

    fetchOrders,
    updateOrderStatus,

    // Products
    products,

    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,

    // Customers
    customers,
    fetchCustomers,

    // Analytics
    analyticsData,
    fetchAnalytics,

    // General
    loading
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
