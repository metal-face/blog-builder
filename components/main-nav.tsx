"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function MainNav() {
  const pathname = usePathname(); 

  return (
    <div className="border">
      <Link href="/">
        <span>Login</span>
      </Link>
    </div>
  )
}
