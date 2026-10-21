import { Axios } from "@/axios/axios";
import type { BlogPosts } from "@/generated/prisma/client";
import type { UpdatePostPayload, UpdatePostResponse } from "@/models/blog-api";

export async function updatePost(payload: UpdatePostPayload): Promise<BlogPosts> {
    const res = await Axios.put<UpdatePostResponse>("/blogs", payload);
    return res.data.data;
}
