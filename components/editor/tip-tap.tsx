"use client";

import "@/app/builder/style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Toolbar from "@/components/editor/toolbar";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

export default function Tiptap() {
    const form = useForm({
        mode: "onChange",
        defaultValues: {
            title: "Blog Title",
            content: "Hello World 🌎️",
        },
    });
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
                heading: {
                    levels: [1, 2, 3],
                },
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
        ],
        editorProps: {
            attributes: {
                class: "editor overflow-y-auto w-4/5 h-64 mx-auto rounded border border-gray-800 focus:outline-none  p-2",
            },
        },
        content: "Hello World! 🌎️",
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="custom-container flex justify-center flex-col">
            {/* TOOLBAR */}
            <Toolbar editor={editor} />
            {/* EDITOR */}
            <EditorContent editor={editor} />
        </div>
    );
}
