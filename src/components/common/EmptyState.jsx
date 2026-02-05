import { PackageOpen } from "lucide-react";

/**
 * EmptyState Component
 *
 * Displays a friendly placeholder when there is no data to show.
 * Commonly used for empty lists, tables, or dashboards.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.icon=<PackageOpen size={45} />] - Icon displayed above the message
 * @param {string} [props.title="No data found"] - Main heading text
 * @param {string} [props.message="There are no items to display at the moment"] - Supporting description text
 * @param {React.ReactNode} [props.action] - Optional action element (e.g. button or link)
 *
 * @example
 * <EmptyState
 *   title="No orders yet"
 *   message="Once customers place orders, they will appear here."
 *   action={<Button variant="primary">Create Order</Button>}
 * />
 */
function EmptyState({
  icon = <PackageOpen size={45} />,
  title = "No data found",
  message = "There are no items to display at the moment ",
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-gray-400 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export default EmptyState;
