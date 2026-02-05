import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

/**
 * PieChart Component
 *
 * A reusable, responsive pie chart built on top of Recharts.
 * Used to visualize proportional / percentage-based data.
 *
 * @component
 *
 * @param {Array<Object>} data
 *  Array of data objects used to render pie slices.
 *  Each object represents one slice.
 *
 *  Example:
 *  [
 *    { name: "Jan", value: 40 },
 *    { name: "Feb", value: 60 }
 *  ]
 *
 * @param {string} dataKey
 *  Key in each data object that contains the numeric value
 *  used to determine slice size.
 *
 * @param {string} nameKey
 *  Key in each data object that contains the label
 *  displayed in the legend and slice label.
 *
 * @param {string} title
 *  Optional title displayed above the chart.
 *  If falsy, the title is not rendered.
 *
 * @param {number} height
 *  Height of the chart container in pixels.
 *  Width is always responsive (100%).
 *
 * @param {string[]} colors
 *  Array of colors used for pie slices.
 *  If the number of slices exceeds the number of colors,
 *  colors are reused cyclically using modulo indexing.
 *
 * @returns {JSX.Element}
 *  A responsive pie chart with tooltip, legend, and labeled slices.
 */
const PieChart = ({
  data = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 }
  ],
  dataKey = "value",
  nameKey = "name",
  title,
  height = 300,
  colors = ["#0ea5e9", "#10b981", "#f59e0b"]
}) => {
  return (
    <div className="w-full">
      {/* Chart title */}
      {title && (
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      )}

      {/* Responsive wrapper ensures chart scales with container */}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPie>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry[nameKey]}: ${entry[dataKey]}%`}
          >
            {/* 
              Assign colors to slices.
              Uses modulo (%) to safely cycle through the colors array,
              ensuring a valid color index regardless of data length.
            */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Tooltip displayed on slice hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          />

          {/* Legend displaying slice labels */}
          <Legend />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
