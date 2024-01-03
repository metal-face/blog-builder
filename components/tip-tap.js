"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "./ui/button";
import {
    FontBoldIcon,
    FontItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    CodeIcon,
    ColorWheelIcon,
} from "@radix-ui/react-icons";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";

Underline.configure({
    HTMLAttributes: {
        class: "my-custom-class",
    },
});

Code.configure({
    HTMLAttributes: {
        class: "my-custom-class",
    },
});

Highlight.configure({
    multicolor: true,
});

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Code, Highlight],
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
                <div>
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
                <div>
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <StrikethroughIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() => editor.commands.toggleCode()}
                    >
                        <CodeIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.commands.toggleHighlight({
                                color: "#ffcc00",
                            })
                        }
                    >
                        <ColorWheelIcon className="w-4 h-4" />
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
