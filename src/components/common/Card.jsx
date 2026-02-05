/**
 * Reusable Card Component
 *
 * A flexible container used to group related content.
 * Supports optional header (title, subtitle), actions, and configurable padding.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content of the card
 * @param {string} [props.title="Card"] - Card header title
 * @param {string} [props.subtitle="Sub title"] - Optional subtitle displayed under the title
 * @param {React.ReactNode} [props.action] - Optional action element (e.g. button, menu) shown in the header
 * @param {boolean} [props.padding=true] - Whether to apply padding to the card body
 * @param {string} [props.className=""] - Additional Tailwind / custom classes for the card container
 *
 * @example
 * <Card
 *   title="Users"
 *   subtitle="Active users list"
 *   action={<Button size="sm">Add</Button>}
 * >
 *   <UserTable />
 * </Card>
 */
function Card({
  children,
  title = "Card",
  subtitle = "Sub title",
  action,
  padding = true,
  className = ""
}) {
  return (
    <div className={`bg-white rounded-lg shadow-card ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding ? "p-4" : ""}>{children}</div>
    </div>
  );
}

export default Card;
