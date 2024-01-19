"use client";

import "@/app/builder/style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { Fragment } from "react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Toolbar from "@/components/editor/toolbar";

const Tiptap = () => {
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
            }),
            Color,
            TextStyle,
            Underline,
            Highlight,
        ],
        content: "Hello World! 🌎️",
    });

    if (!editor) {
        return null;
    }

    return (
        <Fragment>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </Fragment>
    );
};

export default Tiptap;
