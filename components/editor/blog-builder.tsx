"use client";

import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogPosts } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";
import TipTap from "@/components/editor/tip-tap";

interface Props {
    blog?: BlogPosts;
}

export default function BlogBuilder({ blog }: Props) {
    const [editable, setEditable] = useState<boolean>(false);
    const { toast } = useToast();
    const router: AppRouterInstance = useRouter();

    const schema = z.object({
        blogTitle: z
            .string()
            .min(4, { message: "Title must be at least 4 characters" })
            .max(32, { message: "Title must be less than 32 characters" }),
        blogPost: z
            .string()
            .min(20, { message: "Blog post must be at least 20 characters" })
            .max(20000)
            .trim(),
    });

    const form = useForm<z.infer<typeof schema>>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            blogTitle: blog?.blogTitle || "Write a Blog Title!",
            blogPost: blog?.blogPost || "Hello World 🌎",
        },
    });

    // Define a list of allowed CSS properties
    const allowedStyles = [
        "color",
        "text-align",
        "background-color",
        "font-size",
        "font-weight",
        "font-style",
        "font-family",
        "padding",
        "margin",
        "border",
        "border-radius",
        "width",
        "height",
        "display",
        "align-items",
        "justify-content",
    ];

    async function onSubmit(data: z.infer<typeof schema>) {
        DOMPurify().addHook("uponSanitizeElement", (node, data) => {
            if (data.tagName === "iframe") {
                const src = node.getAttribute("src") || "";

                if (src.startsWith("https://youtu.be") || src.startsWith("https://youtube.com")) {
                    node.parentNode?.removeChild(node);
                }
            }
        });

        DOMPurify().addHook("uponSanitizeAttribute", (node, data) => {
            if (data.attrName === "style") {
                const styles = data.attrValue
                    .split(";")
                    .map((style) => style.trim())
                    .filter((style) => style);

                const safeStyles = styles.filter((style) => {
                    const [property] = style.split(":").map((item) => item.trim());
                    return allowedStyles.includes(property);
                });

                data.attrValue = safeStyles.join("; ");
            }
        });

        const sanitizedPost = DOMPurify.sanitize(data.blogPost, {
            FORBID_TAGS: ["script", "svg"],
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "style"],
        });

        console.log("balls");

        if (blog) {
            const res: Response = await fetch("/api/blogs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogId: blog.id,
                    blogPost: data.blogPost,
                    blogTitle: data.blogTitle,
                }),
            });

            if (res.ok) {
                toast({
                    title: "Success!",
                    description: "You have successfully saved your blog 🚀",
                    className: "bg-[#6cc070]",
                });
            }

            if (!res.ok) {
                toast({
                    title: "Oops!",
                    description: "Something went wrong!",
                    variant: "destructive",
                });
            }

            return router.push("/blogs");
        }

        if (!blog) {
            const res: Response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogTitle: data.blogTitle,
                    blogPost: sanitizedPost,
                }),
            });

            if (res.ok) {
                toast({
                    title: "Success!",
                    description: "You have successfully saved your blog 🚀",
                    className: "bg-[#6cc070]",
                });
            }

            if (!res.ok) {
                toast({
                    title: "Oops!",
                    description: "Something went wrong!",
                    variant: "destructive",
                });
            }
            return router.push("/blogs");
        }
    }

    function handleTitleClick(): void {
        const watcher: string = form.watch("blogTitle");

        if (watcher.length < 4) {
            return;
        }

        setEditable(!editable);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {editable ? (
                    <div className="sm:w-3/5 w-5/5 my-3 sm:mx-auto mx-4 flex h-fit">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="blogTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter a blog title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="ml-2">
                            <Button variant={"outline"} onClick={handleTitleClick}>
                                <Check />
                            </Button>
                        </div>
                    </div>
                ) : null}
                {!editable ? (
                    <div
                        onClick={() => setEditable(true)}
                        className="sm:w-2/5 w-5/5 h-fit my-4 sm:mx-auto mx-4 cursor-pointer hover:outline outline-1 outline-offset-8 outline-zinc-800 rounded"
                    >
                        <BlogTitle blogTitle={form.getValues().blogTitle} />
                    </div>
                ) : null}
                <div className="w-full sm:w-11/12  sm:mx-auto mx-2">
                    <FormField
                        control={form.control}
                        name="blogPost"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <TipTap
                                        editable={true}
                                        blogPost={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-right" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full sm:w-11/12 mx-auto flex justify-end items-center">
                    <Button
                        size={"lg"}
                        type="submit"
                        variant="secondary"
                        className="py-1 text-white hover:bg-green-400 hover:text-black"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
