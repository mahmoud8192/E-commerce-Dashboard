export const mockDashboardStats = {
  totalRevenue: {
    value: 54239.5,
    change: 12.5,
    trend: "up"
  },
  totalOrders: {
    value: 1547,
    change: 8.2,
    trend: "up"
  },
  totalCustomers: {
    value: 892,
    change: -3.1,
    trend: "down"
  },
  conversionRate: {
    value: 3.24,
    change: 5.7,
    trend: "up"
  }
};

export const mockRecentOrders = [
  {
    id: "ord_001",
    orderNumber: "ORD-2026-001",
    customer: "John Smith",
    date: "2026-02-02",
    total: 249.99,
    status: "delivered",
    items: 3
  },
  {
    id: "ord_002",
    orderNumber: "ORD-2026-002",
    customer: "Sarah Johnson",
    date: "2026-02-02",
    total: 189.5,
    status: "processing",
    items: 2
  },
  {
    id: "ord_003",
    orderNumber: "ORD-2026-003",
    customer: "Michael Brown",
    date: "2026-02-01",
    total: 449.0,
    status: "shipped",
    items: 5
  },
  {
    id: "ord_004",
    orderNumber: "ORD-2026-004",
    customer: "Emily Davis",
    date: "2026-02-01",
    total: 129.99,
    status: "pending",
    items: 1
  },
  {
    id: "ord_005",
    orderNumber: "ORD-2026-005",
    customer: "David Wilson",
    date: "2026-01-31",
    total: 379.5,
    status: "delivered",
    items: 4
  }
];

export const mockTopProducts = [
  {
    id: "prod_1",
    name: "Wireless Headphones Pro",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    sales: 234,
    revenue: 23400,
    trend: "up"
  },
  {
    id: "prod_2",
    name: "Smart Watch Series 5",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    sales: 189,
    revenue: 37800,
    trend: "up"
  },
  {
    id: "prod_3",
    name: "Laptop Stand Aluminum",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
    sales: 156,
    revenue: 7800,
    trend: "down"
  },
  {
    id: "prod_4",
    name: "USB-C Hub 7-in-1",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
    sales: 143,
    revenue: 5720,
    trend: "up"
  }
];

export const mockAnalyticsData = {
  "7d": {
    revenue: [
      { date: "2026-01-27", value: 4200 },
      { date: "2026-01-28", value: 5100 },
      { date: "2026-01-29", value: 4800 },
      { date: "2026-01-30", value: 6200 },
      { date: "2026-01-31", value: 5900 },
      { date: "2026-02-01", value: 7300 },
      { date: "2026-02-02", value: 6800 }
    ],
    orders: [
      { date: "2026-01-27", value: 45 },
      { date: "2026-01-28", value: 52 },
      { date: "2026-01-29", value: 48 },
      { date: "2026-01-30", value: 61 },
      { date: "2026-01-31", value: 58 },
      { date: "2026-02-01", value: 73 },
      { date: "2026-02-02", value: 67 }
    ],
    visitors: [
      { date: "2026-01-27", value: 1200 },
      { date: "2026-01-28", value: 1450 },
      { date: "2026-01-29", value: 1320 },
      { date: "2026-01-30", value: 1680 },
      { date: "2026-01-31", value: 1590 },
      { date: "2026-02-01", value: 1920 },
      { date: "2026-02-02", value: 1780 }
    ],
    categoryBreakdown: [
      { name: "Electronics", value: 45 },
      { name: "Accessories", value: 25 },
      { name: "Clothing", value: 15 },
      { name: "Home & Garden", value: 10 },
      { name: "Sports", value: 5 }
    ]
  },
  "30d": {
    revenue: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 0, i + 4).toISOString().split("T")[0],
      value: Math.floor(Math.random() * 3000) + 4000
    })),
    orders: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 0, i + 4).toISOString().split("T")[0],
      value: Math.floor(Math.random() * 30) + 40
    })),
    visitors: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2026, 0, i + 4).toISOString().split("T")[0],
      value: Math.floor(Math.random() * 800) + 1200
    })),
    categoryBreakdown: [
      { name: "Electronics", value: 42 },
      { name: "Accessories", value: 28 },
      { name: "Clothing", value: 18 },
      { name: "Home & Garden", value: 8 },
      { name: "Sports", value: 4 }
    ]
  }
};
