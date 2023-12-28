"use client";

import { useEffect, useState } from "react";
import { TypographyH2 } from "./typography/typography-h2";

export function Clock() {
  function updateTime() {
    setTime(new Date());
  }
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className="m-2 flex items-center justify-center">
      <TypographyH2 props={{ text: time.toLocaleTimeString() }} />
    </div>
  );
}
