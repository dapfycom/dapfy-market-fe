import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export function LoadingSkeleton() {
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

export function ErrorMessage() {
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

export function SuccessMessage({ email }: { email: string }) {
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

export function FailureMessage() {
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
