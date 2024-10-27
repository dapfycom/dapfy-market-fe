import { AUTH_TOKEN_KEY } from "@/config";
import { BASE_URL } from "@/utils/axios";
import { cookies } from "next/headers";
import CheckoutFormClient from "./client";

const CheckoutForm = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  let clientSecret: string | null;

  try {
    const authToken = cookies().get(AUTH_TOKEN_KEY)?.value;

    const clientSecretResponse = await fetch(
      BASE_URL + "/stripe" + "/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          productID: productId,
        }),
      }
    );

    const data = await clientSecretResponse.json();

    clientSecret = data.clientSecret;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col h-full bg-blue-50 text-gray-800 w-full max-w-screen-md mx-auto px-md md:px-lg ">
      {/* @ts-ignore */}
      <CheckoutFormClient clientSecret={clientSecret || null} />
    </div>
  );
};

export default CheckoutForm;
