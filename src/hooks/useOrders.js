function useOrders() {
  const columns = [
    { Header: "Order", accessor: "orderNumber" },
    { Header: "Customer", accessor: "customer" },
    { Header: "Date", accessor: "date" },
    { Header: "Total", accessor: "total" },
    { Header: "Status", accessor: "status" }
  ];
  const getStatusVariant = (status) => {
    const variants = {
      delivered: "success",
      processing: "warning",
      shipped: "info",
      pending: "default",
      cancelled: "danger"
    };
    return variants[status] || "default";
  };

  return { columns, getStatusVariant };
}
export default useOrders;
