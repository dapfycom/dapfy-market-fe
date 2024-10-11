import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import stripeServices from "@/services/stripeServices";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import { useEffect, useState } from "react";

export const useStripeConnect = () => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState();
  const { user } = useGetCurrentUser();
  console.log(user);

  const connectedAccountId = user?.stripeAccountId;

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await stripeServices.createAccountSession({
          account: connectedAccountId,
        });

        if (!response.data) {
          // Handle errors on the client side here
          throw new Error("An error occurred: ");
        } else {
          const { client_secret: clientSecret } = response.data;
          return clientSecret;
        }
      };

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          fetchClientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              colorPrimary: "#635BFF",
            },
          },
        }) as any
      );
    }
  }, [connectedAccountId]);

  return { stripeConnectInstance, connectedAccountId };
};

export default useStripeConnect;
