"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./ReduxProvider";
import SwrProvider from "./SwrProvider";
const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <Toaster />
        {children}
      </SwrProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
