"use client";
import { useEffect, useState } from "react";
import { TypographyH4 } from "@/components/typography/typography-h4";

export function Clock() {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());

    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  if (!time) return null;

  return (
    <div className="m-1 flex items-center justify-center">
      <TypographyH4 text={time.toLocaleTimeString()} />
    </div>
  );
}
