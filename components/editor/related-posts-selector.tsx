"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBlogTitles } from "@/axios/blogs/fetch-all-blog-names";
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/ui/combobox";

interface Props {
    value: string[];
    onValueChange: (val: string[]) => void;
}

export function RelatedPostsSelector({ value, onValueChange }: Props) {
    const { data } = useQuery({
        queryKey: ["blogPostInfo"],
        queryFn: async () => await getAllBlogTitles(),
    });

    const blogSet = new Map();
    data?.data.blogPosts.forEach((post) => {
        blogSet.set(post.id, post.blogTitle);
    });

    return (
        <Combobox items={data?.data.blogPosts} multiple onValueChange={onValueChange} value={value}>
            <ComboboxChips>
                <ComboboxValue>
                    {value.map((item) => (
                        <ComboboxChip key={item}>{blogSet.get(item)}</ComboboxChip>
                    ))}
                </ComboboxValue>
                <ComboboxChipsInput placeholder="Related posts" />
            </ComboboxChips>
            <ComboboxContent>
                <ComboboxEmpty>No other posts found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem value={item.id} key={item.id}>
                            {item.blogTitle}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
