import Link from "next/link";
import type { Session } from "next-auth";
import type { ReactElement } from "react";
import { auth } from "@/auth/auth";
import LikeDislikeButton from "@/components/blogs/like-dislike-button";
import Tiptap from "@/components/editor/tip-tap";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { prisma } from "@/lib/prisma";
import type { BlogPostWithRelatedPosts } from "@/models/blog-api";

interface SearchParams {
    ip: string | undefined;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page(props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}): Promise<ReactElement> {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const session: Session | null = await auth();

    if (params.id && searchParams.ip) {
        try {
            const hasViewed = await prisma.viewLog.findFirst({
                where: {
                    postId: params.id,
                    OR: [
                        {
                            ipAddress: searchParams.ip,
                        },
                        {
                            userId: session?.user.id,
                        },
                    ],
                },
            });

            if (!hasViewed) {
                await prisma.viewLog.create({
                    data: {
                        ipAddress: searchParams.ip,
                        postId: params.id,
                        userId: session?.user.id,
                    },
                });

                await prisma.blogPosts.update({
                    where: {
                        id: params.id,
                    },
                    data: {
                        pageViews: {
                            increment: 1,
                        },
                    },
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    const res = await prisma.blogPosts.findFirst({
        where: { id: params.id, deletedAt: null },
        include: {
            blogsThisBlogReferences: {
                select: {
                    relatedBlog: {
                        select: { id: true, blogTitle: true },
                    },
                },
                orderBy: { createdAt: "desc" },
                where: {
                    relatedBlog: { deletedAt: null },
                },
            },
        },
    });

    const blogPost: BlogPostWithRelatedPosts | null = res
        ? (({ blogsThisBlogReferences, ...blog }) => ({
              ...blog,
              relatedPosts: blogsThisBlogReferences.map((r) => r.relatedBlog),
          }))(res)
        : null;

    if (!blogPost?.blogPost || !blogPost?.blogTitle || !searchParams.ip) {
        return (
            <div className="h-[calc(100vh-5rem)] w-full flex justify-center">
                <TypographyH1 text={"Oops! We couldn't find your blog"} />
            </div>
        );
    }

    let hasDisliked = null;

    const hasLiked = await prisma.likeLog.findFirst({
        where: {
            postId: params.id,
            ipAddress: searchParams.ip,
            userId: session?.user.id,
        },
    });

    if (!hasLiked) {
        hasDisliked = await prisma.dislikeLog.findFirst({
            where: {
                ipAddress: searchParams.ip,
                postId: params.id,
                userId: session?.user.id,
            },
        });
    }

    return (
        <div
            className={"h-[calc(100vh-5rem)] w-full sm:w-11/12 mx-auto flex flex-col max-w-[80ch]"}
        >
            <div className="mx-auto my-3">
                <TypographyH1 text={blogPost.blogTitle} />
            </div>
            <div className={"text-left "}>
                {session && (
                    <div className={"flex justify-end items-center"}>
                        <LikeDislikeButton
                            initialLikes={blogPost.likes}
                            blogPostId={blogPost.id}
                            ipAddress={searchParams.ip}
                            userId={session?.user.id || ""}
                            likeStatus={!!hasLiked}
                            dislikeStatus={!!hasDisliked}
                        />
                    </div>
                )}
            </div>
            <Tiptap
                editable={false}
                blogPost={blogPost.blogPost}
                showPrivateToggle={false}
                showWordCounter={false}
            />
            <div>
                {blogPost.relatedPosts.length > 0 && <p className="text-sm">Related Posts:</p>}
                {blogPost.relatedPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="text-xs text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {post.blogTitle}
                    </Link>
                ))}
            </div>
        </div>
    );
}
