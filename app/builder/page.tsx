"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";
import TipTap from "@/components/editor/tip-tap";
import { useRouter } from "next/navigation";

export default function BlogBuilder() {
    const [editable, setEditable] = useState(false);
    const router = useRouter();

    const FormSchema = z.object({
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

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const sanitizedPost = DOMPurify.sanitize(data.blogPost, {
            USE_PROFILES: { html: true },
        });
        const response = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blogTitle: data.blogTitle,
                blogPost: sanitizedPost,
            }),
        });
        console.log(response);

        router.push("/");
    }

    function handleTitleClick() {
        const watcher = form.watch("blogTitle");
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
                            <Button
                                variant={"outline"}
                                onClick={handleTitleClick}
                            >
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
                                    <TipTap
                                        blogPost={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-right" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-4/5 mx-auto flex justify-end items-center">
                    <Button type="submit" variant="secondary" className=" py-1">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
