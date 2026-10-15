"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { Variants } from "@/models/variants";

interface Props {
    name?: string;
    path: string;
    classes?: string;
    variant: Variants | undefined | null;
    children?: ReactNode;
    visible: boolean;
}

export default function ConditionalButton({
    name,
    path,
    classes,
    variant,
    children,
    visible,
}: Props) {
    const currentPath = usePathname();

    return path !== currentPath && visible ? (
        <div>
            <Link href={path}>
                <Button variant={variant ? variant : "default"} className={classes}>
                    {name ? name : null}
                    {children}
                </Button>
            </Link>
        </div>
    ) : null;
}
