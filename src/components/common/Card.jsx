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

  padding = true,
  className = ""
}) {
  return (
    <div className={`bg-white rounded-lg shadow-card ${className}`}>
      <div className={padding ? "p-4" : ""}>{children}</div>
    </div>
  );
}

export default Card;
