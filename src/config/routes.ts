const routes = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
  stores: "/stores",
  products: "/products",
  checkout: "/checkout",
};

const dashboardRoutes = {
  dashboard: routes.dashboard,
  products: `${routes.dashboard}/products`,
  addProduct: `${routes.dashboard}/products/add`,
  stores: `${routes.dashboard}/stores`,
  settings: `${routes.dashboard}/settings`,
  customers: `${routes.dashboard}/customers`,
  payments: `${routes.dashboard}/payments`,
  myOrders: `${routes.dashboard}/my-orders`,
  orders: `${routes.dashboard}/orders`,
};

export { dashboardRoutes, routes };
