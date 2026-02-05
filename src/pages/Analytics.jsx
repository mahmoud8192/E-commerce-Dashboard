import { useEffect, useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Card from "../components/common/Card";
import Select from "../components/common/Select";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import Spinner from "../components/common/Spinner";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye
} from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/formatters";

/**
 * Analytics Page Component
 */
const Analytics = () => {
  const { analyticsData, fetchAnalytics } = useDashboard();
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics(timeRange);
  }, [timeRange]);

  const loadAnalytics = async (range) => {
    setLoading(true);
    await fetchAnalytics(range);
    setLoading(false);
  };

  const timeRangeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  // Calculate totals from analytics data
  const totalRevenue =
    analyticsData?.revenue?.reduce((sum, item) => sum + item.value, 0) || 0;
  const totalOrders =
    analyticsData?.orders?.reduce((sum, item) => sum + item.value, 0) || 0;
  const totalVisitors =
    analyticsData?.visitors?.reduce((sum, item) => sum + item.value, 0) || 0;
  const conversionRate =
    totalVisitors > 0 ? ((totalOrders / totalVisitors) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track your store performance and insights
          </p>
        </div>

        <Select
          options={timeRangeOptions}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalRevenue)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  12.5%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <DollarSign className="text-primary-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(totalOrders)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-sm text-green-600 font-medium">8.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(totalVisitors)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown size={14} className="text-red-500" />
                <span className="text-sm text-red-600 font-medium">3.1%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {conversionRate}%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-sm text-green-600 font-medium">5.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue & Orders Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trend" className="h-full">
          <LineChart
            data={analyticsData?.revenue || []}
            dataKey="value"
            xAxisKey="date"
            color="#0ea5e9"
            height={300}
          />
        </Card>

        <Card title="Orders Trend" className="h-full">
          <BarChart
            data={analyticsData?.orders || []}
            dataKey="value"
            xAxisKey="date"
            color="#10b981"
            height={300}
          />
        </Card>
      </div>

      {/* Visitors & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Visitor Traffic" className="h-full">
          <LineChart
            data={analyticsData?.visitors || []}
            dataKey="value"
            xAxisKey="date"
            color="#8b5cf6"
            height={300}
          />
        </Card>

        <Card title="Sales by Category" className="h-full">
          <PieChart
            data={analyticsData?.categoryBreakdown || []}
            dataKey="value"
            nameKey="name"
            height={300}
            colors={["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]}
          />
        </Card>
      </div>

      {/* Top Metrics Table */}
      <Card title="Performance Metrics">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Average Order Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(totalRevenue / (totalOrders || 1))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatCurrency(85.5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      7.3%
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Customer Lifetime Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(1547.8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatCurrency(1432.5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      8.1%
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Cart Abandonment Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  68.4%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  72.1%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <TrendingDown size={14} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      5.1%
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Return Customer Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  35.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  32.4%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      10.2%
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
