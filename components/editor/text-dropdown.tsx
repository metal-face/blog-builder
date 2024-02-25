import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuSeparator,
    DropdownMenuLabel,
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
    AlignLeft,
    AlignCenter,
    AlignRight,
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
                <DropdownMenuLabel className="text-xs">
                    Elements
                </DropdownMenuLabel>
                {/* HEADING 1 */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* HEADING 2 */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* HEADING 3 */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* CHECKLIST */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* BULLET LIST */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* NUMBERED LIST */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* HORIZONTAL LINE */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs">
                    Positioning
                </DropdownMenuLabel>
                {/* LEFT ALIGN */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* CENTER ALIGN */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
                {/* RIGHT ALIGN */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
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
