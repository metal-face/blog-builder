import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BlogStore = {
    blogTitle: string;
    blogPost: string;
};

type BlogStoreActions = {
    updateBlogTitle: (blogTitle: BlogStore["blogTitle"]) => void;
    updateBlogPost: (blogPost: BlogStore["blogPost"]) => void;
};

export const useBlogStore = create<BlogStore & BlogStoreActions>()(
    persist(
        (set) => ({
            blogTitle: "",
            blogPost: "",
            updateBlogTitle: (blogTitle: string) => set({ blogTitle }),
            updateBlogPost: (blogPost: string) => set({ blogPost }),
        }),
        {
            name: "blog-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
