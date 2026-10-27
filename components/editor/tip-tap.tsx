"use client";

import "@/app/globals.css";
import { mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import BaseHeading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import YouTube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import Toolbar from "@/components/editor/toolbar";
import WordCounter from "@/components/editor/word-counter";

type Levels = 1 | 2 | 3;

const lowlight = createLowlight(all);

const classes: Record<Levels, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
};

export const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

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
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
    blogPost: string;
    onChange?: (richText: string) => void;
    editable: boolean;
    showPrivateToggle: boolean;
    isPrivate?: boolean;
    onPrivateChange?: (val: boolean) => void;
    showWordCounter: boolean;
}

export default function Tiptap({
    blogPost,
    onChange,
    editable,
    showPrivateToggle,
    isPrivate,
    onPrivateChange,
    showWordCounter,
}: Props) {
    const editor = useEditor({
        // Avoid SSR hydration mismatches and keep Tiptap 2's re-render-per-transaction behavior
        // so the toolbar and word counter stay in sync.
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        editable: editable,
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                heading: false,
                codeBlock: false,
                horizontalRule: false,
                // Tiptap 3 bundles these in StarterKit; they're configured separately below.
                link: false,
                underline: false,
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
                        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                            // @ts-expect-error
                            class: `${classes[level]}`,
                        }),
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
                alignments: ["left", "right", "center", "justify"],
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
                class: "editor border overflow-y-auto overflow-x-hidden rounded p-4",
            },
        },
        content: blogPost,
        onUpdate({ editor }) {
            if (onChange) onChange(editor?.getHTML());
        },
    });

    return (
        <div className="my-2 overflow-x-hidden overflow-y-hidden">
            {editable && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
            <div className="w-full flex items-center justify-between">
                {showWordCounter && <WordCounter editor={editor} />}
                {showPrivateToggle && (
                    <div className="flex items-center space-x-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <p>Private</p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>When checked, only you will be able to see this post.</p>
                            </TooltipContent>
                        </Tooltip>
                        <Checkbox
                            disabled={!editable}
                            checked={isPrivate}
                            onCheckedChange={onPrivateChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
