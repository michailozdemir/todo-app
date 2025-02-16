"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

const SignOutBtn = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      setIsSigningOut(false);
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Button variant="default" onClick={handleSignOut} disabled={isSigningOut}>
      {isSigningOut ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Out"}
    </Button>
  );
};

export default SignOutBtn;
