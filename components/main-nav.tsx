"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function MainNav() {
  return (
    <div className="h-12 flex items-center justify-end">
      <ThemeToggle />
      <Button variant="outline" className="m-2">
        Login
        <GitHubLogoIcon className="h-4 w-4 m-2" />
      </Button>
    </div>
  );
}
