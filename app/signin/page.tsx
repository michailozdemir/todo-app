"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Container from "@/components/ui/container";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [isSigningIn, setIsSigningIn] = useState({
    google: false,
    github: false,
  });

  const handleSignIn = async (provider: string) => {
    setIsSigningIn((prev) => ({ ...prev, [provider]: true }));

    await signIn(provider, { callbackUrl: "/todos" });

    setIsSigningIn((prev) => ({ ...prev, [provider]: false }));
  };

  return (
    <section className="py-16 sm:py-32">
      <Container>
        <div className="py-10 px-4 bg-white dark:bg-neutral-900 rounded-xl text-center">
          <h2 className="text-3xl font-bold">Sign in to Task.easy</h2>
          <p className="mt-2 font-regular text-zinc-500">Continue with any of the provided options below</p>

          <div className="mt-8 grid gap-2 place-items-center">
            <Button variant="default" onClick={() => handleSignIn("google")} disabled={isSigningIn.google}>
              {isSigningIn.google ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Icons.google className="mr-2 h-4 w-4" /> Sign in with Google
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => handleSignIn("github")} disabled={isSigningIn.github}>
              {isSigningIn.github ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Icons.gitHub className="w-4 h-4" /> Sign in with GitHub
                </>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Page;
