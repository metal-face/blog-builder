import { Axios } from "@/axios/axios";
import type { FetchBlogsResponse, PaginationParams } from "@/models/blog-api";

export async function fetchAllBlogs({ page, take }: PaginationParams): Promise<FetchBlogsResponse> {
    const res = await Axios.get<FetchBlogsResponse>("/blogs", { params: { take, page } });
    return res.data;
}
