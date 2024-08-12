import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import BlogCard from "@/components/blogs/blog-card";

export default async function Page() {
    const session: Session | null = await auth();

    if (!session) {
        redirect("/login");
    }

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        where: {
            private: false,
        },
    });

    if (blogs.length === 0) {
        return (
            <div className={"h-full w-full flex justify-center items-center"}>
                <h1>Oops, looks like no blogs</h1>
            </div>
        );
    }

    return (
        <div className={"w-full flex flex-col items-center"}>
            {blogs.map((blog) => (
                <div className={"w-full sm:w-7/8 md:w-1/2 lg:w-1/3 mx-auto m-0 p-0"} key={blog.id}>
                    <BlogCard blog={blog} />
                </div>
            ))}
        </div>
    );
}
