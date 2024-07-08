"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";

interface Props {
    visible: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete: Dispatch<SetStateAction<boolean>>;
}

function ResponsiveDialog({ visible, setVisibility, setTriggerDelete }: Props) {
    const isDesktop: boolean = useMediaQuery("(min-width: 768px)");

    function handleButtonClick() {
        setTriggerDelete(true);
        setVisibility(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={visible} onOpenChange={setVisibility}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you would like to delete this blog?
                        </DialogDescription>
                    </DialogHeader>
                    <Button variant={"destructive"} size={"lg"} onClick={handleButtonClick}>
                        Delete
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Drawer open={visible} onOpenChange={setVisibility}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Confirm Delete</DrawerTitle>
                    <DrawerDescription>
                        Are you sure you would like to delete this blog?
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button variant={"destructive"} size={"lg"} onClick={handleButtonClick}>
                        Delete
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default ResponsiveDialog;
