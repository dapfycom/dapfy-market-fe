import DashboardContentLayout from "../commons/dashboard-content-layout";
import Stores from "./components/Stores";

const DashboardStoresPage = () => {
  return (
    <DashboardContentLayout title="Stores">
      <Stores />
    </DashboardContentLayout>
  );
};

export default DashboardStoresPage;
