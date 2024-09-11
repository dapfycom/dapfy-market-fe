import MyOrders from "../components/views/MyOrders";
import DashboardContentLayout from "../dashboard-content-layout";

const DashboardMyOrdersPage = () => {
  return (
    <DashboardContentLayout title="My Orders">
      <MyOrders />
    </DashboardContentLayout>
  );
};

export default DashboardMyOrdersPage;
