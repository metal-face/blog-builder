"use client";

import rehypeSanitize from "rehype-sanitize";
import SlateEditor from "./slate-editor";

function BlogBuilder() {
    return (
        <div>
            {/* TODO - figure out why I need app bar here */}
            <div className="h-full">
                <SlateEditor></SlateEditor>
            </div>
        </div>
    );
}

export default BlogBuilder;
