"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const BuilderButton = () => {
    const currentPath = usePathname();
    return currentPath !== "/builder" ? (
        <>
            <Button variant="outline" className="ml-1">
                Blog 🛠️
            </Button>
        </>
    ) : null;
};

export default BuilderButton;
