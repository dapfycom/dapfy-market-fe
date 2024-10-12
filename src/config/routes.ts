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
  stripe: `${routes.dashboard}/stripe`,
};

export { dashboardRoutes, routes };
