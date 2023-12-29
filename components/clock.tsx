"use client";

import { useEffect, useState } from "react";
import { TypographyH4 } from "./typography/typography-h4";

export function Clock() {
  function updateTime() {
    setTime(new Date());
  }
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalID = setInterval(updateTime, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="m-1 flex items-center justify-center">
      <TypographyH4 props={{ text: time.toLocaleTimeString() }} />
    </div>
  );
}
