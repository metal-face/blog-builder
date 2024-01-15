"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface ConditionalButtonProps {
    name: string;
    path: string;
    classes?: string;
    children?: React.ReactNode;
}

export default function ConditionalButton({
    name,
    path,
    classes,
    children,
}: ConditionalButtonProps) {
    const currentPath = usePathname();

    return path !== currentPath ? (
        <Button variant="outline" className={classes}>
            {name}
            {children}
        </Button>
    ) : null;
}
