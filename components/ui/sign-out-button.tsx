"use client";

import React from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <Button variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
