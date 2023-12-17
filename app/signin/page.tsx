"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

const Page = () => {
  return (
    <section className="py-32 max-w-2xl w-full">
      <div className="py-10 px-4 bg-black bg-opacity-5 rounded-xl text-center dark:bg-white dark:bg-opacity-5">
        <h3 className="text-3xl font-bold">Sign in to Task.easy</h3>
        <p className="mt-2 font-regular text-zinc-500">Continue with any of the provided options below</p>

        <div className="mt-8 grid gap-2 place-items-center">
          <Button variant="default" onClick={() => signIn("google", { callbackUrl: "/todos" })}>
            <Icons.google className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
          <Button variant="outline" onClick={() => signIn("github", { callbackUrl: "/todos" })}>
            <Icons.gitHub className="mr-2 h-4 w-4" /> Sign in with GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
