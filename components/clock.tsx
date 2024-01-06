"use client";
import { useEffect, useState } from "react";
import { TypographyH4 } from "@/components/typography/typography-h4";

export default function Clock() {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    if (!time) return null;

    return (
        <div className="ml-2 flex items-center justify-start">
            <TypographyH4 text={time} />
        </div>
    );
}
