import {
    Heading1,
    Heading2,
    Heading3,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Subscript,
    Superscript,
    Link,
    Image as ImageIcon,
    ListTodo,
    Minus,
} from "lucide-react";

import { useCallback } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-bl-none rounded-br-none h-auto dark:bg-transparent bg-zinc-200 rounded flex flex-nowrap justify-center items-center">
            {/* HEADING 1 */}
            <Toggle
                size="sm"
                aria-label="Toggle Heading 1"
                className={
                    editor.isActive("heading", { level: 1 })
                        ? "is-active rounded-tl rounded-bl rounded-tr-none rounded-br-none"
                        : "rounded-tr-none rounded-br-none rounded-bl rounded-tl"
                }
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
            >
                <Heading1 />
            </Toggle>
            {/* HEADING 2 */}
            <Toggle
                size={"sm"}
                aria-label="Toggle Heading 2"
                pressed={editor.isActive("heading", {
                    level: 2,
                })}
                className={
                    editor.isActive("heading", { level: 2 })
                        ? "is-active rounded-none"
                        : "rounded-none"
                }
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
            >
                <Heading2 />
            </Toggle>
            {/* HEADING 3 */}
            <Toggle
                size={"sm"}
                aria-label="Toggle Heading 3"
                pressed={editor.isActive("heading", {
                    level: 3,
                })}
                className={
                    editor.isActive("heading", { level: 3 })
                        ? "is-active rounded-none"
                        : "rounded-none"
                }
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
            >
                <Heading3 />
            </Toggle>
            {/* BOLD */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Bold"
                pressed={editor.isActive("bold")}
                onPressedChange={() => {
                    editor.chain().focus().toggleBold().run();
                }}
            >
                <Bold />
            </Toggle>
            {/* ITALIC */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Italic"
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                    editor.chain().focus().toggleItalic().run();
                }}
            >
                <Italic />
            </Toggle>
            {/* UNDERLINE */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Underline"
                pressed={editor.isActive("underline")}
                onPressedChange={() => {
                    editor.chain().focus().toggleUnderline().run();
                }}
            >
                <Underline />
            </Toggle>
            {/* BULLET LIST */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Bullet List"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => {
                    editor.chain().focus().toggleBulletList().run();
                }}
            >
                <List />
            </Toggle>
            {/* NUMBER LIST */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Number List"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => {
                    editor.chain().focus().toggleOrderedList().run();
                }}
            >
                <ListOrdered />
            </Toggle>
            {/* TASK LIST */}
            <Toggle
                size="sm"
                className="rounded-none"
                aria-label="Toggle Task List"
                pressed={editor.isActive("taskList")}
                onPressedChange={() => {
                    editor.chain().focus().toggleTaskList().run();
                }}
            >
                <ListTodo />
            </Toggle>
            <Toggle
                size="sm"
                className="rounded-none"
                aria-label="Toggle Horizontal Rule"
                pressed={editor.isActive("horizontalRule")}
                onPressedChange={() => {
                    editor.chain().focus().setHorizontalRule().run();
                }}
            >
                <Minus />
            </Toggle>
            {/* STRIKETHROUGH */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Strikethrough"
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                    editor.chain().focus().toggleStrike().run();
                }}
            >
                <Strikethrough />
            </Toggle>
            {/* SUBSCRIPT */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Subscript"
                pressed={editor.isActive("subscript")}
                onPressedChange={() => {
                    editor.chain().focus().toggleSubscript().run();
                }}
            >
                <Subscript />
            </Toggle>
            {/* SUPERSCRIPT */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Superscript"
                pressed={editor.isActive("superscript")}
                onPressedChange={() => {
                    editor.chain().focus().toggleSuperscript().run();
                }}
            >
                <Superscript />
            </Toggle>
            {/* LINK */}
            <Toggle
                size={"sm"}
                className="rounded-none"
                aria-label="Toggle Link"
                pressed={editor.isActive("link")}
                onPressedChange={setLink}
            >
                <Link />
            </Toggle>
            {/* IMAGE */}
            <Toggle
                size={"sm"}
                className="rounded-bl-none rounded-tl-none rounded-tr rounded-br"
                aria-label="Toggle Image"
                onPressedChange={addImage}
            >
                <ImageIcon />
            </Toggle>
        </div>
    );
}
