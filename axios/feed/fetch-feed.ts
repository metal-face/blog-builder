import { Axios } from "@/axios/axios";
import type { BlogPosts } from "@/generated/prisma/client";
import type { FeedResponse, PaginationParams } from "@/models/blog-api";

export async function fetchFeed({ page, take }: PaginationParams): Promise<BlogPosts[]> {
    const res = await Axios.get<FeedResponse>("/feed", { params: { page, take } });
    return res.data.blogs;
}
