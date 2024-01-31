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
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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
        mode: "onChange",
        defaultValues: {
            blogTitle: "Add a title!",
            blogPost: "Hello World! 🌎️",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // Sanatize data
        // Send data to server
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-4/5 mx-auto">
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
                <FormField
                    control={form.control}
                    name="blogPost"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Tiptap
                                    blogPost={field.name}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage className="m-0 p-0" />
                        </FormItem>
                    )}
                />
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
