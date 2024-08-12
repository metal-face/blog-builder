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
            <DropdownMenuTrigger
                asChild
                className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-xl"
            >
                <Button className="text-xs" variant={"ghost"} size={"sm"}>
                    Text <ChevronDown className="ml-1" size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuLabel className="text-xs">Elements</DropdownMenuLabel>
                {/* HEADING 1 */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive("heading", { level: 1 })}
                    onCheckedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().toggleTaskList().run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().toggleBulletList().run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    onSelect={(e) => e.preventDefault()}
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
                    onCheckedChange={() => editor.chain().focus().setHorizontalRule().run()}
                    onSelect={(e) => e.preventDefault()}
                >
                    Horizontal Line
                    <DropdownMenuShortcut>
                        <Minus />
                    </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs">Positioning</DropdownMenuLabel>
                {/* LEFT ALIGN */}
                <DropdownMenuCheckboxItem
                    className="text-xs"
                    checked={editor.isActive({ textAlign: "left" })}
                    onCheckedChange={() => {
                        editor.chain().focus().setTextAlign("left").run();
                    }}
                    onSelect={(e) => e.preventDefault()}
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
                    onSelect={(e) => e.preventDefault()}
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
                    onSelect={(e) => e.preventDefault()}
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
