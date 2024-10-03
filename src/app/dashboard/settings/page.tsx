import DashboardContentLayout from "../commons/dashboard-content-layout";
import SettingsPage from "./client";

const DashboardSettingsPage = () => {
  return (
    <DashboardContentLayout title="Settings">
      <SettingsPage />
    </DashboardContentLayout>
  );
};

export default DashboardSettingsPage;
