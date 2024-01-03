"use client";

import Tiptap from "@/components/tip-tap";

function BlogBuilder() {
    return (
        <div>
            {/* TODO - figure out why I need app bar here */}
            <div className="h-full">
                <Tiptap />
            </div>
        </div>
    );
}

export default BlogBuilder;
