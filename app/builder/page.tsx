"use client";

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
import * as z from "zod";
import Tiptap from "@/components/editor/tip-tap";
import DOMPurify from "dompurify";
import BlogTitle from "@/components/editor/blog-title";

export default function BlogBuilder() {
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

    const [editable, setEditable] = useState(true);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        DOMPurify.sanitize(data.blogPost, { USE_PROFILES: { html: true } });
        console.log(data.blogPost);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {editable ? (
                    <div className="w-4/5 my-2 mx-auto flex h-fit">
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="ml-1">
                            <Button
                                variant={"outline"}
                                onClick={() => setEditable(!editable)}
                            >
                                <Check />
                            </Button>
                        </div>
                    </div>
                ) : null}
                {!editable ? (
                    <div
                        onClick={() => setEditable(true)}
                        className="w-4/5 mx-auto cursor-pointer my-2"
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
                                <FormControl>
                                    <Tiptap
                                        blogPost={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage className="m-0 p-0" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-4/5 mx-auto">
                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full py-1"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
