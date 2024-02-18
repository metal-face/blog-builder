"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form as ReactForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import * as z from "zod";
import Tiptap from "@/components/editor/tip-tap";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";

export default function BlogBuilder() {
    const { toast } = useToast();

    const FormSchema = z.object({
        blogTitle: z
            .string()
            .min(4, { message: "Title must be at least 4 characters" })
            .max(100, { message: "Title must be less than 100 characters" }),
        blogPost: z
            .string()
            .min(20, { message: "Blog post must be at least 20 characters" })
            .trim(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    const blogPostErrors = form.formState.errors.blogPost?.message;
    const blogTitleErrors = form.formState.errors.blogTitle?.message;

    useEffect(() => {
        if (!blogPostErrors) return;
        toast({
            variant: "destructive",
            description: blogPostErrors,
        });
    }, [blogPostErrors, toast]);

    useEffect(() => {
        if (!blogTitleErrors) return;
        toast({
            variant: "destructive",
            description: blogTitleErrors,
        });
    }, [blogTitleErrors, toast]);

    const [editable, setEditable] = useState(false);

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
                userId: "",
            }),
        });
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
                    <div className="w-3/5 my-3 mx-auto flex h-fit">
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
                        className="w-4/5 mx-auto cursor-pointer my-3"
                    >
                        <BlogTitle blogTitle={form.getValues().blogTitle} />
                    </div>
                ) : null}
                <div className="w-4/5 mx-auto">
                    <FormField
                        control={form.control}
                        name="blogPost"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl onError={() => toast("")}>
                                    <Tiptap
                                        blogPost={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
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
