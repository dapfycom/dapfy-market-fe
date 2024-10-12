"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoadingSkeleton } from "./ReturnComponents";
import ReturnContent from "./ReturnContent";

function Return() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ReturnWrapper />
    </Suspense>
  );
}

function ReturnWrapper() {
  const searchParams = useSearchParams();
  return <ReturnContent searchParams={searchParams} />;
}

// ... (rest of the code remains unchanged)

export default Return;
