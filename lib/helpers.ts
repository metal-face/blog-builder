import { BlogPosts } from "@prisma/client";

export async function fetchBlogById(blogId: string): Promise<BlogPosts | Error> {
    if (!blogId) {
        return new Error("No blogId passed in!");
    }

    const res = await fetch(`/api/blogs/${blogId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const payload = await res.json();

    return payload.data as BlogPosts;
}
