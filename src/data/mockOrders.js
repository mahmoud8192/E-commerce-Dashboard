export const mockOrders = [
  {
    id: "ord_001",
    orderNumber: "ORD-2026-001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2026-02-02T10:30:00Z",
    total: 249.99,
    status: "delivered",
    items: 3,
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
    products: [
      { name: "Wireless Headphones Pro", quantity: 1, price: 99.99 },
      { name: "Phone Case", quantity: 2, price: 75.0 }
    ]
  },
  {
    id: "ord_002",
    orderNumber: "ORD-2026-002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2026-02-02T09:15:00Z",
    total: 189.5,
    status: "processing",
    items: 2,
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    products: [{ name: "Smart Watch Series 5", quantity: 1, price: 189.5 }]
  },
  {
    id: "ord_003",
    orderNumber: "ORD-2026-003",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2026-02-01T15:45:00Z",
    total: 449.0,
    status: "shipped",
    items: 5,
    paymentMethod: "Credit Card",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    products: [
      { name: "Laptop Stand", quantity: 2, price: 49.99 },
      { name: "USB-C Hub", quantity: 3, price: 116.01 }
    ]
  },
  {
    id: "ord_004",
    orderNumber: "ORD-2026-004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2026-02-01T11:20:00Z",
    total: 129.99,
    status: "pending",
    items: 1,
    paymentMethod: "Debit Card",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    products: [{ name: "Bluetooth Speaker", quantity: 1, price: 129.99 }]
  },
  {
    id: "ord_005",
    orderNumber: "ORD-2026-005",
    customer: "David Wilson",
    email: "dwilson@example.com",
    date: "2026-01-31T14:30:00Z",
    total: 379.5,
    status: "delivered",
    items: 4,
    paymentMethod: "Credit Card",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
    products: [
      { name: "Mechanical Keyboard", quantity: 1, price: 149.99 },
      { name: "Gaming Mouse", quantity: 1, price: 79.99 },
      { name: "Mouse Pad", quantity: 2, price: 74.76 }
    ]
  },
  {
    id: "ord_006",
    orderNumber: "ORD-2026-006",
    customer: "Jennifer Taylor",
    email: "jtaylor@example.com",
    date: "2026-01-31T08:45:00Z",
    total: 599.99,
    status: "cancelled",
    items: 2,
    paymentMethod: "PayPal",
    shippingAddress: "987 Cedar Ln, Philadelphia, PA 19101",
    products: [{ name: "Tablet 10 inch", quantity: 1, price: 599.99 }]
  },
  {
    id: "ord_007",
    orderNumber: "ORD-2026-007",
    customer: "Robert Anderson",
    email: "randerson@example.com",
    date: "2026-01-30T16:20:00Z",
    total: 89.99,
    status: "delivered",
    items: 1,
    paymentMethod: "Credit Card",
    shippingAddress: "147 Birch Ave, San Antonio, TX 78201",
    products: [{ name: "Wireless Charger", quantity: 1, price: 89.99 }]
  },
  {
    id: "ord_008",
    orderNumber: "ORD-2026-008",
    customer: "Lisa Martinez",
    email: "lmartinez@example.com",
    date: "2026-01-30T13:10:00Z",
    total: 279.99,
    status: "processing",
    items: 3,
    paymentMethod: "Debit Card",
    shippingAddress: "258 Spruce St, San Diego, CA 92101",
    products: [
      { name: "Fitness Tracker", quantity: 2, price: 119.98 },
      { name: "Water Bottle", quantity: 1, price: 39.99 }
    ]
  },
  {
    id: "ord_009",
    orderNumber: "ORD-2026-009",
    customer: "James Thomas",
    email: "jthomas@example.com",
    date: "2026-01-29T12:30:00Z",
    total: 159.99,
    status: "shipped",
    items: 2,
    paymentMethod: "Credit Card",
    shippingAddress: "369 Willow Way, Dallas, TX 75201",
    products: [
      { name: "Phone Screen Protector", quantity: 2, price: 39.98 },
      { name: "Car Phone Mount", quantity: 1, price: 29.99 }
    ]
  },
  {
    id: "ord_010",
    orderNumber: "ORD-2026-010",
    customer: "Patricia Garcia",
    email: "pgarcia@example.com",
    date: "2026-01-29T09:50:00Z",
    total: 519.99,
    status: "delivered",
    items: 4,
    paymentMethod: "PayPal",
    shippingAddress: "741 Ash Blvd, San Jose, CA 95101",
    products: [
      { name: "Noise Cancelling Headphones", quantity: 1, price: 299.99 },
      { name: "Headphone Case", quantity: 1, price: 29.99 },
      { name: "Audio Cable", quantity: 2, price: 95.0 }
    ]
  }
];
