import { Suspense } from "react";
import DashboardContentLayout from "../commons/dashboard-content-layout";
import SettingsPage from "./client";

const DashboardSettingsPage = () => {
  return (
    <DashboardContentLayout title="Settings">
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsPage />
      </Suspense>
    </DashboardContentLayout>
  );
};

export default DashboardSettingsPage;
