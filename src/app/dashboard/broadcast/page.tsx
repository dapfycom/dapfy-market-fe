import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import DashboardContentLayout from "../commons/dashboard-content-layout";
import { BroadcastForm } from "./components/broadcast-form";

export const metadata: Metadata = {
  title: "Send Broadcast | Dashboard",
  description: "Send marketing emails to your subscriber list",
};

export default function BroadcastPage() {
  return (
    <DashboardContentLayout title="Send Broadcast">
      <Card className="p-6">
        <BroadcastForm />
      </Card>
    </DashboardContentLayout>
  );
}
