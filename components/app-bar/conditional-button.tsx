"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    name?: string;
    path: string;
    classes?: string;
    children?: ReactNode;
}

export default function ConditionalButton({
    name,
    path,
    classes,
    children,
}: Props) {
    const currentPath = usePathname();

    return path !== currentPath ? (
        <Button variant="outline" className={classes}>
            {name ? name : null}
            {children}
        </Button>
    ) : null;
}
