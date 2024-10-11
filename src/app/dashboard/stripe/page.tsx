"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardRoutes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import stripeServices from "@/services/stripeServices";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  PartyPopper,
  RocketIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStripeConnect } from "./useStripeConnect";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function StripeDashboard() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [onboardingExited, setOnboardingExited] = useState(false);
  const [error, setError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { mutate } = useGetCurrentUser();

  const { stripeConnectInstance, connectedAccountId } = useStripeConnect();

  const handleSignUp = async () => {
    setAccountCreatePending(true);
    setError(false);
    try {
      const { data } = await stripeServices.createAccount();
      mutate();
      console.log(data);
    } catch (err) {
      setError(true);
    } finally {
      setAccountCreatePending(false);
    }
  };

  // Add this effect to trigger and stop the confetti
  useEffect(() => {
    if (connectedAccountId && onboardingExited) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [connectedAccountId, onboardingExited]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4 overflow-y-auto">
      {showConfetti && <ReactConfetti />}
      <Card className="w-full max-w-2xl shadow-xl my-8 overflow-y-auto  max-h-[calc(100vh-80px)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
            <RocketIcon className="h-8 w-8 text-purple-500" />
            <span>CONNECT STRIPE</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 ">
          {!connectedAccountId && (
            <>
              <h2 className="text-2xl font-semibold text-center">
                Get ready for take off
              </h2>
              <p className="text-center text-gray-600">
                Connect your Stripe account with DAPFY.COM to start selling your
                products
              </p>
            </>
          )}

          {connectedAccountId && onboardingExited && (
            <>
              <Alert variant="default" className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <AlertTitle className="text-green-700 font-semibold flex items-center gap-2">
                  <PartyPopper className="h-5 w-5" />
                  Account Onboarded Successfully!
                </AlertTitle>
                <AlertDescription className="text-green-600">
                  Congratulations! Your Stripe account is now connected and
                  onboarded. You can start creating products to sell.
                  <Link
                    href={`${dashboardRoutes.addProduct}`}
                    className="block mt-2 text-blue-600 hover:underline"
                  >
                    Create your first product
                  </Link>
                </AlertDescription>
              </Alert>
            </>
          )}

          {!accountCreatePending && !connectedAccountId && (
            <div className="flex justify-center">
              <Button
                onClick={handleSignUp}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Sign up
              </Button>
            </div>
          )}

          {stripeConnectInstance && (
            <div>
              <ConnectComponentsProvider
                connectInstance={stripeConnectInstance}
              >
                <ConnectAccountOnboarding
                  onExit={() => setOnboardingExited(true)}
                />
              </ConnectComponentsProvider>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong!</AlertDescription>
            </Alert>
          )}

          {(connectedAccountId || accountCreatePending || onboardingExited) && (
            <div className="bg-gray-100 p-4 rounded-lg">
              {connectedAccountId && (
                <p className="text-sm">
                  Your connected account ID is:{" "}
                  <code className="font-bold bg-gray-200 px-1 py-0.5 rounded">
                    {connectedAccountId}
                  </code>
                </p>
              )}
              {accountCreatePending && (
                <p className="text-sm flex items-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating a connected account...
                </p>
              )}
            </div>
          )}

          <Alert>
            <AlertTitle>Why Connect with Stripe?</AlertTitle>
            <AlertDescription>
              Connecting your Stripe account allows you to securely receive
              payments for your products or services. This integration enables
              seamless transactions, detailed financial reporting, and ensures
              compliance with payment regulations. If you need assistance,
              please contact our support team.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
