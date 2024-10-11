"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import stripeServices, {
  SessionStatusResponse,
} from "@/services/stripeServices";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Return() {
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

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

function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

function ErrorMessage() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-red-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-red-600">
          <XCircle className="inline-block mr-2" />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-red-600">
          We couldn&apos;t process your request. Please try again or contact
          support.
        </p>
      </CardContent>
    </Card>
  );
}

function SuccessMessage({ email }: { email: string }) {
  return (
    <div className="text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <p className="mb-4">
        We appreciate your purchase! A confirmation email will be sent to{" "}
        <span className="font-semibold">{email}</span>.
      </p>
      <p className="mb-4">
        If you have any questions, please email{" "}
        <a
          href="mailto:hello@dapfy.com"
          className="text-blue-600 hover:underline"
        >
          hello@dapfy.com
        </a>
        .
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

function FailureMessage() {
  return (
    <div className="text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <p className="mb-4">
        There was an issue processing your payment. Please try again or contact
        our support team for assistance.
      </p>
      <p>
        For help, email{" "}
        <a
          href="mailto:support@dapfy.com"
          className="text-blue-600 hover:underline"
        >
          support@dapfy.com
        </a>
        .
      </p>
    </div>
  );
}

export default Return;
