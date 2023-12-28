"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function MainNav() {
  return (
    <div className="h-12 border flex items-center justify-end">
      <ThemeToggle></ThemeToggle>
      <button className="text-pretty m-4">Login</button>
    </div>
  );
}
