import { Axios } from "@/axios/axios";
import type { BlogPosts } from "@/generated/prisma/client";
import type { PatchPostPayload, PatchPostResponse } from "@/models/blog-api";

export async function deletePost(blogId: string): Promise<BlogPosts> {
    const payload: PatchPostPayload = { blogId };
    const res = await Axios.patch<PatchPostResponse>("/blogs", payload);
    return res.data.res;
}
