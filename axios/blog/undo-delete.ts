import { Axios } from "@/axios/axios";
import type { BlogPosts } from "@/generated/prisma/client";
import type { PatchPostPayload, PatchPostResponse } from "@/models/blog-api";

export async function undoDelete(blogId: string): Promise<BlogPosts> {
    const payload: PatchPostPayload = { blogId, revertDelete: true };
    const res = await Axios.patch<PatchPostResponse>("/blogs", payload);
    return res.data.res;
}
