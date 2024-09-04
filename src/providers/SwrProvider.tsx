import React from "react";
import { SWRConfig } from "swr";

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 5,
        // Optionally, you can set a global retry configuration
        shouldRetryOnError: (error) => error.status !== 401,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
