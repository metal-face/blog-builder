import { prisma, BlogPosts } from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";
import Tiptap from "@/components/editor/tip-tap";
import { NextRequest } from "next/server";

export default async function Page({ params }: { params: { id: string } }, request: NextRequest) {
    console.log("IP: ", request?.ip);
    try {
        const blogPost: BlogPosts | null = await prisma.blogPosts.findFirst({
            where: { id: params.id },
        });

        if (blogPost && blogPost.blogPost && blogPost.blogTitle) {
            return (
                <div className={"h-4/5 w-full sm:w-11/12 mx-auto flex justify-center flex-col"}>
                    <div className={"text-center mb-2"}>
                        <TypographyH1 text={blogPost.blogTitle} />
                    </div>
                    <Tiptap editable={false} blogPost={blogPost.blogPost} />
                </div>
            );
        }
    } catch {
        return (
            <div className="h-4/5 w-full flex justify-center items-center">
                <TypographyH1 text={"Oops! We couldn't find your blog"} />
            </div>
        );
    }
}
