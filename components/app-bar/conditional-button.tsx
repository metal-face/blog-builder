"use client";
import { Button } from "@/components/ui/button";
import { Variants } from "@/models/variants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    name?: string;
    path: string;
    classes?: string;
    variant: Variants | undefined | null;
    children?: ReactNode;
}

export default function ConditionalButton({ name, path, classes, variant, children }: Props) {
    const currentPath = usePathname();

    return path !== currentPath ? (
        <Button variant={variant ? variant : "default"} className={classes}>
            {name ? name : null}
            {children}
        </Button>
    ) : null;
}
