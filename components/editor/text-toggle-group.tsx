import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    Code,
} from "lucide-react";

type Props = {
    editor: Editor | null;
};

export default function TextToggleGroup({ editor }: Props) {
    if (!editor) return null;

    return (
        <div>
            {/* BOLD */}
            <Toggle
                size={"sm"}
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
                aria-label="Toggle Strikethrough"
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                    editor.chain().focus().toggleStrike().run();
                }}
            >
                <Strikethrough />
            </Toggle>
            <Toggle
                size={"sm"}
                aria-label="Toggle Code Block"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
            >
                <Code />
            </Toggle>
            {/* SUPERSCRIPT */}
            <Toggle
                size={"sm"}
                aria-label="Toggle Superscript"
                pressed={editor.isActive("superscript")}
                onPressedChange={() => {
                    editor.chain().focus().toggleSuperscript().run();
                }}
            >
                <Superscript />
            </Toggle>
        </div>
    );
}
