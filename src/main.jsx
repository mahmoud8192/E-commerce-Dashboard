import ReactDOM from "react-dom/client"; // Correct import for React 18
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Adjust based on your actual import
import { DashboardProvider } from "./context/DashboardContext"; // Adjust based on your actual import
import React from "react";
import Table from "./components/Tables/Table";
import { Eye } from "lucide-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>
);
