"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useToast } from "@/components/ui/use-toast";
import { BlogPosts } from "@prisma/client";
import { Check } from "lucide-react";
import { fetchBlogById } from "@/lib/helpers";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";
import TipTap from "@/components/editor/tip-tap";

export default function BlogBuilder({ params }: { params: { id: string } }): ReactElement {
    const [mounted, setMounted] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);
    const [blogTitleState, setBlogTitleState] = useState("");
    const [blogPostState, setBlogPostState] = useState("");
    const { toast } = useToast();
    const router: AppRouterInstance = useRouter();
    const editorRef: MutableRefObject<Element | null> = useRef(null);

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
            blogTitle: "Write a Blog Title!",
            blogPost: "Hello World 🌎",
        },
    });

    useEffect(() => {
        if (mounted) {
            editorRef.current = document.getElementsByClassName("editor")[0];
        }
    }, [mounted]);

    useEffect(() => {
        if (params.id && mounted) {
            fetchBlogById(params.id[0])
                .then((res) => {
                    const blogPost: BlogPosts = res as BlogPosts;

                    if (blogPost.blogTitle && blogPost.blogPost) {
                        setBlogTitleState(blogPost.blogTitle);
                        setBlogPostState(blogPost.blogPost);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast({
                        title: "Oops!",
                        description: "Something went wrong!",
                        variant: "destructive",
                    });
                });
        }
    }, [mounted, params.id, toast]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (blogTitleState) {
            form.setValue("blogTitle", blogTitleState);
        }

        if (editorRef.current && blogPostState) {
            editorRef.current.innerHTML = blogPostState;
        }
    }, [blogPostState, blogTitleState, form]);

    async function onSubmit(data: z.infer<typeof schema>) {
        const sanitizedPost = DOMPurify.sanitize(data.blogPost, {
            USE_PROFILES: { html: true },
        });

        if (params.id) {
            const res: Response = await fetch("/api/blogs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogId: params.id[0],
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

        if (!params.id) {
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
                <div className="w-5/5 sm:w-4/5 sm:mx-auto mx-2">
                    <FormField
                        control={form.control}
                        name="blogPost"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <TipTap blogPost={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage className="text-xs text-right" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-4/5 mx-auto flex justify-end items-center">
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
