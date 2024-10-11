"use client";

import { AUTH_TOKEN_KEY } from "@/config";
import authService from "@/services/authService";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyMagicLinkContent() {
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus("error");
        return;
      }

      try {
        const response = await authService.verifyMagicLink(token);

        if (response.status === 200) {
          setCookie(AUTH_TOKEN_KEY, response.data.token.accessToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
          dispatch(setUser(response.data.user));

          setVerificationStatus("success");
          // Redirect to dashboard or home page after successful verification
          setTimeout(() => router.push("/"), 2000);
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        console.error("Error verifying magic link:", error);
        setVerificationStatus("error");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {verificationStatus === "loading" && <p>Verifying your magic link...</p>}
      {verificationStatus === "success" && (
        <p>Magic link verified successfully! Redirecting...</p>
      )}
      {verificationStatus === "error" && (
        <p>
          Error verifying magic link. Please try again or request a new link.
        </p>
      )}
    </div>
  );
}

export default function VerifyMagicLink() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyMagicLinkContent />
    </Suspense>
  );
}
