import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
/**
 * BarChart Component
 *
 * A reusable responsive bar chart wrapper built on top of Recharts.
 * Designed for simple categorical → numeric data visualization.
 *
 * @component
 *
 * @param {Array<Object>} data
 *  Array of data objects used to render the chart.
 *  Each object should contain:
 *   - a categorical field (for the X-axis)
 *   - a numeric field (for the bar values)
 *
 *  Example:
 *  [
 *    { name: "Jan", value: 400 },
 *    { name: "Feb", value: 300 }
 *  ]
 *
 * @param {string} dataKey
 *  Key in each data object that contains the numeric value
 *  to be visualized as bars.
 *
 * @param {string} xAxisKey
 *  Key in each data object used to label the X-axis categories.
 *
 * @param {string} title
 *  Optional title displayed above the chart.
 *  If falsy, the title will not be rendered.
 *
 * @param {string} color
 *  Fill color for the bars.
 *  Accepts any valid CSS color value.
 *
 * @param {number} height
 *  Height of the chart container in pixels.
 *  Width is always responsive (100%).
 *
 * @returns {JSX.Element}
 *  A responsive bar chart with grid, axes, tooltip, and styled bars.
 */
function BarChart({
  data = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "MAR", value: 300 },
    { name: "APR", value: 400 },
    { name: "MAY", value: 500 },
    { name: "JUNE", value: 600 },
    { name: "JULY", value: 700 },
    { name: "AUG", value: 800 }
  ],
  dataKey = "value",
  xAxisKey = "name",
  title = "Bar Chart",
  color = "#ff4455",
  height = 300
}) {
  return (
    <div className="w-full">
      {/* Chart title */}
      {title && (
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      )}

      {/* Responsive wrapper ensures the chart adapts to container width */}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBar data={data}>
          {/* Background grid lines between bars */}
          <CartesianGrid stroke="#e5e7eb" />

          {/* X-axis displaying category labels */}
          <XAxis
            dataKey={xAxisKey}
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />

          {/* Y-axis displaying numeric scale */}
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />

          {/* Tooltip shown when hovering over a bar */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          />

          {/* 
            Individual bars:
            Each bar represents one data entry.
            The bar height corresponds to the value at `dataKey`.
          */}
          <Bar dataKey={dataKey} fill={color} />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}
export default BarChart;
