import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-700 dark:text-gray-200 tracking-widest">
        404
      </h1>
      <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold md:text-4xl text-gray-800 dark:text-gray-100 mb-4">
          Oops! We can&apos;t find that page.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="group">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
