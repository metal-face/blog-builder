import { useEffect } from "react";
import { useBlogStore } from "@/lib/zustand";

export function useLocalPersistence() {
    const blogTitle = useBlogStore((state) => state.blogTitle);
    const blogPost = useBlogStore((state) => state.blogPost);

    useEffect(() => {
        localStorage.setItem("blogTitle", blogTitle);
        localStorage.setItem("blogPost", blogPost);
    }, [blogTitle, blogPost]);
}
