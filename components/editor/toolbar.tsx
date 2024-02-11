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
import TextDropdown from "@/components/editor/text-dropdown";
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
        <div className="w-full rounded-bl-none rounded-br-none h-auto dark:bg-transparent bg-zinc-200 rounded flex flex-nowrap justify-start items-center">
            <TextDropdown editor={editor} />

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
