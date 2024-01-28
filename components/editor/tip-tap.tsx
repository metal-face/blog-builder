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
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Toolbar from "@/components/editor/toolbar";
import Image from "@tiptap/extension-image";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    FaCode,
    FaLink,
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaHighlighter,
} from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";

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
            Highlight,
            Link.configure({
                protocols: ["ftp", "mailto"],
                openOnClick: true,
                autolink: true,
                validate: (href) => /^https?:\/\//.test(href),
            }),
            Image,
        ],
        editorProps: {
            attributes: {
                class: "editor w-4/5 h-64 mx-auto rounded border border-gray-800 focus:outline-none  p-2",
            },
        },
        content: "Hello World! 🌎️",
    });

    // const addImage = useCallback(() => {
    //     const url = window.prompt("URL");

    //     if (url) {
    //         editor?.chain().focus().setImage({ src: url }).run();
    //     }
    // }, [editor]);

    // const setLink = useCallback(() => {
    //     const previousUrl = editor?.getAttributes("link").href;
    //     const url = window.prompt("URL", previousUrl);

    //     // cancelled
    //     if (url === null) {
    //         return;
    //     }

    //     // empty
    //     if (url === "") {
    //         editor?.chain().focus().extendMarkRange("link").unsetLink().run();

    //         return;
    //     }

    //     // update link
    //     editor
    //         ?.chain()
    //         .focus()
    //         .extendMarkRange("link")
    //         .setLink({ href: url })
    //         .run();
    // }, [editor]);

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
