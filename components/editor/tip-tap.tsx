import "@/app/globals.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import { common, createLowlight } from "lowlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Toolbar from "@/components/editor/toolbar";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import BaseHeading from "@tiptap/extension-heading";
import Typography from "@tiptap/extension-typography";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import YouTube from "@tiptap/extension-youtube";
import WordCounter from "@/components/editor/word-counter";

type Levels = 1 | 2 | 3;

const lowlight = createLowlight(common);

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
import CharacterCount from "@tiptap/extension-character-count";

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
                bulletList: false,
                orderedList: false,
                heading: false,
                codeBlock: false,
                horizontalRule: false,
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal pl-2 ml-2",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc pl-2 ml-2",
                },
            }),
            Link.configure({
                HTMLAttributes: {
                    class: "text-blue-300 cursor-pointer",
                },
                protocols: ["ftp", "mailto"],
                openOnClick: true,
                autolink: false,
                validate: (href) => /^https?:\/\//.test(href),
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "mx-auto m-2 p-2",
                },
            }),
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
            TaskItem.configure({
                nested: true,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            TaskList,
            HorizontalRule,
            Typography,
            TextStyle,
            Color,
            Underline,
            Subscript,
            Superscript,
            CharacterCount,
            YouTube.configure({ inline: false, height: 320 }),
        ],
        editorProps: {
            attributes: {
                class: "editor active:border-gray-300 overflow-y-auto overflow-x-hidden w-full mx-auto rounded border border-gray-300 p-4",
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
            <WordCounter editor={editor} />
        </div>
    );
}
