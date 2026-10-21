import { Axios } from "@/axios/axios";
import type { PostsCountResponse } from "@/models/blog-api";

export async function fetchPostsCount(): Promise<PostsCountResponse> {
    const res = await Axios.get<PostsCountResponse>("/blogs/count");
    return res.data;
}
