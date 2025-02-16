import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

import Link from "next/link";
import { auth } from "@/auth";
import SignOutBtn from "../sign-out-button";
import { LogIn } from "lucide-react";

const Header = async () => {
  const session = await auth();

  return (
    <div className="h-16 mt-8">
      <header className="fixed top-8 left-[16px] right-[16px] w-[calc(100%-32px)] py-3 px-6 border border-foreground/10 max-w-7xl mx-auto flex items-center justify-between rounded-xl bg-white dark:bg-neutral-900 backdrop-blur-sm z-50">
        <Link href="/" className="text-2xl font-extrabold">
          Todo.easy
        </Link>
        <div className="flex items-center gap-2">
          {session ? (
            <SignOutBtn />
          ) : (
            <Link href="/signin">
              <Button variant="default" size="icon">
                <LogIn className="w-4 h-4" />
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </header>
    </div>
  );
};

export default Header;
