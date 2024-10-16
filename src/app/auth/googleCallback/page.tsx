"use client";

import { AUTH_TOKEN_KEY } from "@/config";
import authService from "@/services/authService";
import { setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function GoogleCallbackContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const effectRan = useRef(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (effectRan.current) return;
    const handleGoogleCallback = async () => {
      if (!code) {
        setStatus("error");
        return;
      }

      try {
        const response = await authService.handleGoogleCallback(code);

        if (response.status === 200) {
          // Set the access token in an HTTP-only cookie
          setCookie(AUTH_TOKEN_KEY, response.data.token.accessToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });

          dispatch(setUser(response.data.user));

          setStatus("success");
          // Redirect to home page after successful authentication
          setTimeout(() => router.push("/"), 2000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error handling Google callback:", error);
        setStatus("error");
      }
    };

    handleGoogleCallback();

    return () => {
      effectRan.current = true;
    };
  }, [code, router, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "loading" && <p>Verifying your Google authentication...</p>}
      {status === "success" && <p>Authentication successful! Redirecting...</p>}
      {status === "error" && (
        <p>Error during authentication. Please try again or contact support.</p>
      )}
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
