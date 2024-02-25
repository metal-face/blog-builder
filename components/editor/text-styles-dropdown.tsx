import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Superscript,
    Code,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    editor: Editor | null;
};

export default function TextStylesDropdown({ editor }: Props) {
    if (!editor) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"sm"}>
                    Styles <ChevronDown className="ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {/* BOLD */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("bold")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    Bold
                    <DropdownMenuShortcut>
                        <Bold />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                {/* ITALIC */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("italic")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    Italic
                    <DropdownMenuShortcut>
                        <Italic />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                {/* UNDERLINE */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("underline")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    Underline
                    <DropdownMenuShortcut>
                        <Underline />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                {/* STRIKETHROUGH */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("strike")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                >
                    Strikethrough
                    <DropdownMenuShortcut>
                        <Strikethrough />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                {/* SUPERSCRIPT */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("superscript")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleSuperscript().run()
                    }
                >
                    Superscript
                    <DropdownMenuShortcut>
                        <Superscript />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                {/* CODE */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("codeBlock")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    Code
                    <DropdownMenuShortcut>
                        <Code />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
