import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    ListTodo,
    List,
    ListOrdered,
    Minus,
} from "lucide-react";
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
            <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 1 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    Heading 1
                    <DropdownMenuShortcut>
                        <Heading1 />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 2 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    Heading 2
                    <DropdownMenuShortcut>
                        <Heading2 />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("heading", { level: 3 })}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    Heading 3
                    <DropdownMenuShortcut>
                        <Heading3 />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("taskList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleTaskList().run()
                    }
                >
                    Check List
                    <DropdownMenuShortcut>
                        <ListTodo />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("bulletList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet List
                    <DropdownMenuShortcut>
                        <List />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("orderedList")}
                    onCheckedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    Numbered List
                    <DropdownMenuShortcut>
                        <ListOrdered />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={editor.isActive("horizontalRule")}
                    onCheckedChange={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal Line
                    <DropdownMenuShortcut>
                        <Minus />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
