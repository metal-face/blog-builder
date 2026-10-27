"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { Check, Save } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TipTap from "@/components/editor/tip-tap";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePost } from "@/functions/blog/create-post";
import { useUpdatePost } from "@/functions/blog/update-post";
import listenForAttributeSanitization from "@/hooks/listen-for-attribute-sanitization";
import listenForElementSanitization from "@/hooks/listen-for-element-sanitization";
import { allowedStyles } from "@/models/allowed-styles";
import type { BlogPostWithRelatedPosts } from "@/models/blog-api";
import { RelatedPostsSelector } from "./related-posts-selector";

interface Props {
    blog?: BlogPostWithRelatedPosts;
}

export default function BlogBuilder({ blog }: Props) {
    const [editable, setEditable] = useState<boolean>(false);
    const createPostMutation = useCreatePost();
    const updatePostMutation = useUpdatePost();
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
        isPrivate: z.boolean(),
        relatedBlogPosts: z
            .array(z.string().min(1))
            .max(20, { error: "You cannot have more than 20 related posts." }),
    });

    const form = useForm<z.infer<typeof schema>>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            blogTitle: blog?.blogTitle ?? "Write a Blog Title!",
            blogPost: blog?.blogPost ?? "Hello World 🌎",
            isPrivate: blog?.private ?? false,
            relatedBlogPosts: blog?.relatedPosts.map((r) => r.id) ?? [],
        },
    });

    async function onSubmit(data: z.infer<typeof schema>, isDraft: boolean) {
        const sanitizedPost = DOMPurify.sanitize(data.blogPost, {
            FORBID_TAGS: ["script", "svg"],
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "style"],
        });

        listenForAttributeSanitization(allowedStyles, DOMPurify());
        listenForElementSanitization(DOMPurify());

        if (blog) {
            await updatePostMutation.mutateAsync({
                blogId: blog.id,
                blogTitle: data.blogTitle,
                blogPost: sanitizedPost,
                isDraft: isDraft,
                isPrivate: data.isPrivate,
                relatedPosts: data.relatedBlogPosts,
            });

            if (updatePostMutation.isError) {
                return;
            }

            return router.push("/blogs");
        }

        if (!blog) {
            await createPostMutation.mutateAsync({
                blogTitle: data.blogTitle,
                blogPost: sanitizedPost,
                isDraft: isDraft,
                isPrivate: data.isPrivate,
                relatedPosts: data.relatedBlogPosts,
            });

            if (createPostMutation.isError) {
                return;
            }

            return router.push("/blogs");
        }
    }

    function handleTitleClick(): void {
        const watcher = form.watch("blogTitle");

        if (watcher.length < 4) {
            return;
        }

        setEditable(!editable);
    }

    const isPrivate = form.watch("isPrivate");
    const relatedPosts = form.watch("relatedBlogPosts");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))} id={"blogForm"}>
                {editable && (
                    <div className="w-200  my-3 sm:mx-auto mx-4 flex h-fit">
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
                            <Button
                                variant={"outline"}
                                className="cursor-pointer"
                                onClick={handleTitleClick}
                            >
                                <Check />
                            </Button>
                        </div>
                    </div>
                )}
                {!editable && (
                    <div className="w-200 mx-auto">
                        <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() => setEditable(true)}
                            className="w-200 h-fit my-4 cursor-pointer text-3xl"
                        >
                            {form.getValues("blogTitle")}
                        </Button>
                    </div>
                )}
                <div className="w-200 max-w-full sm:mx-auto mx-2">
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
                                        showPrivateToggle={true}
                                        isPrivate={isPrivate}
                                        onPrivateChange={(val) => {
                                            form.setValue("isPrivate", val);
                                        }}
                                        showWordCounter
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-right" />
                            </FormItem>
                        )}
                    />
                </div>

                <div
                    className={"mt-4 flex items-center justify-between space-x-2 w-200 sm:mx-auto"}
                >
                    <RelatedPostsSelector
                        value={relatedPosts}
                        onValueChange={(val) => form.setValue("relatedBlogPosts", val)}
                    />
                    <div className="space-x-2">
                        <Button
                            type="button"
                            onClick={async () => await onSubmit(form.getValues(), true)}
                            size={"sm"}
                            variant={"secondary"}
                        >
                            Save Draft
                            <Save className={"ml-2"} />
                        </Button>
                        <Button
                            form={"blogForm"}
                            size={"sm"}
                            type="submit"
                            variant="secondary"
                            className="py-1 text-green-700 bg-green-500/20 dark:text-white hover:bg-green-400 hover:text-black"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
