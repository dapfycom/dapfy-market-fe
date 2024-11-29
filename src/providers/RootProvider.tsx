"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./ReduxProvider";
import SwrProvider from "./SwrProvider";
import ViewsTracker from "./ViewsTracker";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <ViewsTracker>
          <Toaster />
          {children}
        </ViewsTracker>
      </SwrProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
