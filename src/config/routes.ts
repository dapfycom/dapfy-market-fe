const routes = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
  stores: "/stores",
  products: "/products",
};

const dashboardRoutes = {
  dashboard: routes.dashboard,
  products: `${routes.dashboard}/products`,
  addProduct: `${routes.dashboard}/products/add`,
  stores: `${routes.dashboard}/stores`,
  memberships: `${routes.dashboard}/memberships`,
  fundraising: `${routes.dashboard}/fundraising`,
  payouts: `${routes.dashboard}/payouts`,
  myOrders: `${routes.dashboard}/my-orders`,
  upgradeToPro: `${routes.dashboard}/upgrade-to-pro`,
  leadMagnet: `${routes.dashboard}/lead-magnet`,
  settings: `${routes.dashboard}/settings`,
};

export { dashboardRoutes, routes };
