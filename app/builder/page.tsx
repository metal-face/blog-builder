"use client";
import Tiptap from "@/components/editor/tip-tap";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function BlogBuilder() {
    const FormSchema = z.object({
        blogTitle: z
            .string()
            .min(4, { message: "Title must be at least 4 characters" }),
        blogPost: z
            .string()
            .min(20, { message: "Blog post must be at least 20 characters" })
            .trim(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="blogTitle"
                    render={({ field }) => {
                        <FormItem>
                            <FormLabel>Blog Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a blog title" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>;
                    }}
                />
                <FormField
                    control={form.control}
                    name="blogPost"
                    render={({ field }) => {
                        <FormItem>
                            <FormControl>
                                <Tiptap
                                    blogPost={field.name}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>;
                    }}
                />
                <Button type="submit" variant="outline">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
