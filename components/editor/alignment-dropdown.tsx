import type { Editor } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    editor: Editor | null;
};

export default function AlignmentDropdown({ editor }: Props) {
    if (!editor) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <AlignCenter />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive({ textAlign: "left" })}
                    onCheckedChange={() => {
                        editor.chain().focus().setTextAlign("left").run();
                    }}
                >
                    Left
                    <DropdownMenuShortcut>
                        <AlignLeft />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive({ textAlign: "center" })}
                    onCheckedChange={() => {
                        editor.chain().focus().setTextAlign("center").run();
                    }}
                >
                    Center
                    <DropdownMenuShortcut>
                        <AlignCenter />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive({ textAlign: "right" })}
                    onCheckedChange={() => {
                        editor.chain().focus().setTextAlign("right").run();
                    }}
                >
                    Right
                    <DropdownMenuShortcut>
                        <AlignRight />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
