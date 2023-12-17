import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import { auth } from "@/auth";
import SignOutBtn from "./sign-out-button";

const Header = async () => {
  const session = await auth();

  return (
    <header className="py-5 border-0 border-b border-dark-900">
      <div className="mx-auto max-w-7xl px-4 flex items-center gap-2 justify-between">
        <Link href="/" className="text-2xl font-bold">
          Todo.easy
        </Link>
        <div className="flex items-center gap-2">
          {(session && <SignOutBtn />) || (
            <Link href="/signin">
              <Button variant="default">Sign In</Button>
            </Link>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
