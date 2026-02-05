import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        const { user: userData, token } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);

        toast.success("Welcome back!");
        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      if (response.success) {
        toast.success("Registration successful! Please login.");
        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
