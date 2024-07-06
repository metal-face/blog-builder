"use client";
import { Button } from "@/components/ui/button";
import { Variants } from "@/models/variants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

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
