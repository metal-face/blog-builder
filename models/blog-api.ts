import type { BlogPosts } from "@/generated/prisma/client";

// Request bodies

export interface CreatePostPayload {
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
    relatedPosts: string[];
}

export interface UpdatePostPayload extends CreatePostPayload {
    blogId: string;
}

export interface PatchPostPayload {
    blogId: string;
    revertDelete?: boolean;
}

export interface PaginationParams {
    page: number;
    take: number;
}

// Response bodies

export type CreatePostResponse = Record<string, never>;

export interface UpdatePostResponse {
    data: BlogPosts;
}

export interface PatchPostResponse {
    res: BlogPosts;
}

export interface FetchBlogsResponse {
    blogs: BlogPosts[];
    count: number;
}

export interface FeedResponse {
    blogs: BlogPosts[];
}

export interface BlogPostInfo {
    id: string;
    blogTitle: string | null;
}

export interface BlogPostInfoResponse {
    blogPosts: BlogPostInfo[];
}
