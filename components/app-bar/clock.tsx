"use client";
import { useEffect, useMemo, useState } from "react";
import { TypographyH4 } from "@/components/typography/typography-h4";

export default function Clock() {
    const locale: Intl.LocalesArgument = "en-US";

    const options: Intl.DateTimeFormatOptions = useMemo(
        () => ({
            hour: "2-digit",
            minute: "2-digit",
        }),
        []
    );

    const [time, setTime] = useState<string>(
        new Date().toLocaleTimeString(locale, options)
    );

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date().toLocaleTimeString(locale, options));
        }, 1000);

        return () => clearInterval(intervalID);
    }, [options]);

    if (!time) return null;

    return (
        <div className="ml-2 flex items-center justify-start">
            <TypographyH4 text={time} />
        </div>
    );
}
