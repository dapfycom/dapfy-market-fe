"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutFormClient = ({
  clientSecret,
}: {
  clientSecret: string | null;
}) => {
  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="mb-6">
          We couldn&apos;t process your checkout at this time.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div
      id="checkout"
      className="flex w-full items-center justify-center min-h-screen"
    >
      <div className="w-full ">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default CheckoutFormClient;
