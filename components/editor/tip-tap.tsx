import "@/app/globals.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Toolbar from "@/components/editor/toolbar";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import BaseHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
};

export const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level: Levels = hasLevel
            ? node.attrs.level
            : this.options.levels[0];

        return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: `${classes[level]}`,
            }),
            0,
        ];
    },
});

export default function Tiptap({
    blogPost,
    onChange,
}: {
    blogPost: string;
    onChange: (richText: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                heading: false,
            }),
            TextStyle,
            Underline,
            Link.configure({
                protocols: ["ftp", "mailto"],
                openOnClick: true,
                autolink: true,
                validate: (href) => /^https?:\/\//.test(href),
            }),
            Image,
            Subscript,
            Superscript,
            Heading.configure({ levels: [1, 2, 3] }).extend({
                renderHTML({ node, HTMLAttributes }) {
                    const level = this.options.levels.includes(node.attrs.level)
                        ? node.attrs.level
                        : this.options.levels[0];
                    const classes = {
                        1: "text-4xl",
                        2: "text-3xl",
                        3: "text-2xl",
                    };
                    return [
                        `h${level}`,
                        mergeAttributes(
                            this.options.HTMLAttributes,
                            HTMLAttributes,
                            {
                                // @ts-ignore
                                class: `${classes[level]}`,
                            }
                        ),
                        0,
                    ];
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: "editor overflow-y-auto overflow-x-hidden w-full mx-auto rounded border border-gray-700 p-4",
            },
        },
        content: blogPost,
        onUpdate({ editor }) {
            onChange(editor?.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="my-2 overflow-x-hidden overflow-y-hidden">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
