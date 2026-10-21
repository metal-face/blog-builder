import { Axios } from "@/axios/axios";
import type { CreatePostPayload, CreatePostResponse } from "@/models/blog-api";

export async function createPostDraft(payload: CreatePostPayload): Promise<CreatePostResponse> {
    const res = await Axios.post<CreatePostResponse>("/blogs", payload);
    return res.data;
}
