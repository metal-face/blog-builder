import { Axios } from "@/axios/axios";
import type { BlogPostInfoResponse } from "@/models/blog-api";

export async function getAllBlogTitles() {
    return await Axios<BlogPostInfoResponse>({
        method: "GET",
        url: "/blogs/info",
    });
}
