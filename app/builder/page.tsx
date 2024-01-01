import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { SetStateAction, useState } from "react";

// TODO figure out wtf is going on here
// @ts-ignore
import * as commands from "@uiw/react-md-editor/commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function BlogBuilder() {
    const [value, setValue] = useState("**Hello world!!!**");

    return (
        <div>
            {/* TODO figure out wtf is going on here */}
            {/* @ts-ignore */}
            <MDEditor value={value} onChange={setValue} />
        </div>
    );
}

export default BlogBuilder;
