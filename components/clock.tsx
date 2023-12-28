"use client";

import { TypographyH2 } from "./typography/typography-h2";
export function Clock() {
  return (
    <div className="flex items-center justify-center">
      <TypographyH2 props={{ text: "11:59pm" }}></TypographyH2>
    </div>
  );
}
