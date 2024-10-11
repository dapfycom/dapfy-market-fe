"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import stripeServices, {
  SessionStatusResponse,
} from "@/services/stripeServices";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ErrorMessage,
  FailureMessage,
  LoadingSkeleton,
  SuccessMessage,
} from "./ReturnComponents";

interface ReturnContentProps {
  searchParams: ReadonlyURLSearchParams;
}

export default function ReturnContent({ searchParams }: ReturnContentProps) {
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSessionStatus() {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await stripeServices.getSessionStatus(sessionId);
        setSessionStatus(data);
      } catch (error) {
        console.error("Failed to fetch session status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSessionStatus();
  }, [searchParams]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!sessionStatus) {
    return <ErrorMessage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {sessionStatus.status === "complete" ? "Thank You!" : "Oops!"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessionStatus.status === "complete" ? (
            <SuccessMessage email={sessionStatus?.customerEmail || "unknown"} />
          ) : (
            <FailureMessage />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
