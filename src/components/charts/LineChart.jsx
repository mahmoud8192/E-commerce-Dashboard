import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

/**
 * LineChart Component
 *
 * A reusable, responsive line chart built on top of Recharts.
 * Designed to visualize trends over time or across ordered categories.
 *
 * @component
 *
 * @param {Array<Object>} data
 *  Array of data points used to render the chart.
 *  Each object represents one point on the line.
 *
 *  Example:
 *  [
 *    { date: "Jan", value: 100 },
 *    { date: "Feb", value: 200 }
 *  ]
 *
 * @param {string} dataKey
 *  Key in each data object that contains the numeric value
 *  plotted along the Y-axis.
 *
 * @param {string} xAxisKey
 *  Key in each data object used for the X-axis labels
 *  (e.g. month, date, category).
 *
 * @param {string} title
 *  Optional title displayed above the chart.
 *  If omitted or falsy, the title is not rendered.
 *
 * @param {string} color
 *  Stroke color of the line and fill color of data point dots.
 *  Accepts any valid CSS color value.
 *
 * @param {number} height
 *  Height of the chart container in pixels.
 *  Width is always responsive (100%).
 *
 * @returns {JSX.Element}
 *  A responsive line chart with grid, axes, tooltip, and animated points.
 */
const LineChart = ({
  data = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 }
  ],
  dataKey = "value",
  xAxisKey = "name",
  title,
  color = "#0ea5e9",
  height = 300
}) => {
  return (
    <div className="w-full">
      {/* Chart title */}
      {title && (
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      )}

      {/* Responsive wrapper to adapt chart width */}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLine data={data}>
          {/* Background grid for visual guidance */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* X-axis displaying category or time labels */}
          <XAxis
            dataKey={xAxisKey}
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />

          {/* Y-axis displaying numeric scale */}
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />

          {/* Tooltip displayed on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              boxShadow: "0 4px 6px -1px #121245 "
            }}
          />

          {/* Line representing the data trend */}
          <Line
            type="monotoneX"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
