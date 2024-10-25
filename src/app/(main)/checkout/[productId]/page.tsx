import { AUTH_TOKEN_KEY } from "@/config";
import axiosInstance, { BASE_URL } from "@/utils/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutFormClient from "./client";

const CheckoutForm = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  let userData;
  try {
    const { data: user } = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${cookies().get(AUTH_TOKEN_KEY)?.value}`,
      },
    });
    userData = user;
  } catch (error) {
    userData = null;
  }

  if (!userData) {
    redirect("/");
  }
  let clientSecret: string | null;

  try {
    const clientSecretResponse = await fetch(
      BASE_URL + "/stripe" + "/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get(AUTH_TOKEN_KEY)?.value}`,
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
