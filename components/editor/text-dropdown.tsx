import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    editor: Editor | null;
};

export default function TextDropdown({ editor }: Props) {
    if (!editor) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"sm"}>
                    Text <ChevronDown className="ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 1 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    Heading 1
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 2 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    Heading 2
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 3 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    Heading 3
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("taskList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleTaskList().run()
                    }
                >
                    Check List
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("bulletList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet List
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("orderedList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    Numbered List
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("horizontalRule")}
                    onCheckedChange={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal Line
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
