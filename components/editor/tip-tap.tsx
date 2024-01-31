"use client";

import "@/app/builder/style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
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

const FormSchema = z.object({
    blogTitle: z
        .string()
        .min(3, { message: "Title must be at least 3 characters" }),
    blogPost: z
        .string()
        .min(20, { message: "Post must be at least 20 characters" }),
});

export default function Tiptap() {
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
            Color,
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
                levels: [1, 2, 3],
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
                class: "editor overflow-y-auto w-4/5 h-64 mx-auto rounded border border-gray-800 p-4",
            },
        },
        content: "Hello World! 🌎️",
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        
    }

    if (!editor) {
        return null;
    }

    return (
        <div className="custom-container flex justify-center flex-col">
            <div className="w-4/5 mx-auto">
                <Input />
            </div>
            {/* TOOLBAR */}
            <Toolbar editor={editor} />
            {/* EDITOR */}
            <EditorContent editor={editor} />
        </div>
    );
}
