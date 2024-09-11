import Products from "../components/views/DigitalProducts";
import DashboardContentLayout from "../dashboard-content-layout";

const DashboardProductsPage = () => {
  return (
    <DashboardContentLayout title="Products">
      <Products />
    </DashboardContentLayout>
  );
};

export default DashboardProductsPage;
