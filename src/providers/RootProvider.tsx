"use client";

import React from "react";
import ReduxProvider from "./ReduxProvider";
import SwrProvider from "./SwrProvider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <SwrProvider>{children}</SwrProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
