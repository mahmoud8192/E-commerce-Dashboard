import { useEffect } from "react";
import { useDashboard } from "../context/DashboardContext";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import Spinner from "../components/common/Spinner";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/formatters";

/**
 * Main Dashboard Page
 */
const Dashboard = () => {
  const {
    stats,
    recentOrders,
    topProducts,
    fetchDashboardStats,
    fetchAnalytics,
    analyticsData
  } = useDashboard();

  useEffect(() => {
    fetchDashboardStats();
    fetchAnalytics("7d");
  }, []);

  if (!stats) {
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue.value)}
          change={stats.totalRevenue.change}
          trend={stats.totalRevenue.trend}
          icon={DollarSign}
          color="primary"
        />

        <StatCard
          title="Total Orders"
          value={formatNumber(stats.totalOrders.value)}
          change={stats.totalOrders.change}
          trend={stats.totalOrders.trend}
          icon={ShoppingBag}
          color="success"
        />

        <StatCard
          title="Total Customers"
          value={formatNumber(stats.totalCustomers.value)}
          change={stats.totalCustomers.change}
          trend={stats.totalCustomers.trend}
          icon={Users}
          color="warning"
        />

        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate.value}%`}
          change={stats.conversionRate.change}
          trend={stats.conversionRate.trend}
          icon={TrendingUp}
          color="primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <LineChart
            title="Revenue Overview (Last 7 Days)"
            data={analyticsData?.revenue || []}
            dataKey="value"
            xAxisKey="date"
            color="#0ea5e9"
            height={300}
          />
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <BarChart
            title="Orders Overview (Last 7 Days)"
            data={analyticsData?.orders || []}
            dataKey="value"
            xAxisKey="date"
            color="#10b981"
            height={300}
          />
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrders} />
        </div>

        <div>
          <TopProducts products={topProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
