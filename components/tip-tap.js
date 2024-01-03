"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "./ui/button";
import {
    FontBoldIcon,
    FontItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "@radix-ui/react-icons";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

Underline.configure({
    HTMLAttributes: {
        class: "my-custom-class",
    },
});

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: "<p>Hello World! 🌎️</p>",
    });

    return (
        <div className="h-screen w-full">
            <div className="w-full h-12 flex justify-start items-center">
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FontBoldIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="">
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <FontItalicIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() => editor.commands.toggleUnderline()}
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <StrikethroughIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="border h-full">
                <EditorContent className="editor" editor={editor} />
            </div>
        </div>
    );
};

export default Tiptap;
