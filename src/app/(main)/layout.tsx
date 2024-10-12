import MainLayout from "@/layouts/MainLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default layout;
