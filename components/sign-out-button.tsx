"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Loader2, LogIn, LogOut } from "lucide-react";

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
    <Button variant="default" size="icon" onClick={handleSignOut} disabled={isSigningOut}>
      {isSigningOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
    </Button>
  );
};

export default SignOutBtn;
