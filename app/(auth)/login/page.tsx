"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import React, { useEffect } from "react";
import googeLogo from "@/public/socialGoogle.svg";
import facebookLogo from "@/public/socialFacebook.svg";
import appleLogo from "@/public/socialApple.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { socialLoginApi } from "@/common/api/auth/auth.api";
import { clientauth } from "@/helpers/firebase";
import { isUserAuthenticated } from "@/common/api";

const LoginPage = () => {
  const router = useRouter();
  const handleSignUpWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(clientauth, googleProvider);
  };
  const handleSignUpWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(clientauth, facebookProvider);
  };
  const handleSignupWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    await signInWithPopup(clientauth, provider);
  };

  if (isUserAuthenticated()) {
    router.back();
  }

  useEffect(() => {
    onAuthStateChanged(clientauth, async (user) => {
      if (
        user?.email &&
        user?.displayName &&
        user.providerId &&
        !Cookies.get("Authentication")
      ) {
        const data = await socialLoginApi({
          email: user?.email,
          name: user?.displayName,
          uid: user?.uid,
        });
        Cookies.set("Authentication", data.token);
        router.back();
      }
    });
  });
  return (
    <div className="flex justify-center mt-10 pb-10">
      <div className="w-[400px]">
        <Card className="border p-2">
          <CardTitle className="text-center">Login User</CardTitle>
          <CardContent className="my-5">
            <div>
              <button
                className="flex mb-4 items-center justify-center gap-4 w-full border text-white py-2  bg-blue-700 rounded-full"
                onClick={() => handleSignUpWithFacebook()}
              >
                <Image src={facebookLogo} alt="Facebook" width="19" />
                Connect with facebook
              </button>
              <Button
                variant={"outline"}
                className="flex mb-4 items-center justify-center gap-4 w-full border border-black rounded-full text-xl"
                onClick={() => handleSignUpWithGoogle()}
              >
                <Image src={googeLogo} alt="Google" width="19" />
                Connect with google
              </Button>
              <Button
                className="rounded-full w-full mb-4"
                onClick={handleSignupWithApple}
              >
                <p className="SocialBtn AppleBtn   flex items-center gap-4 justify-center">
                  <Image src={appleLogo} alt="Apple" width="19" />
                  Connect with apple
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
