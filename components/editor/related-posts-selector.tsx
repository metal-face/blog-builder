import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RelatedPostsSelector() {


    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder={"Related posts"}></SelectValue>
            </SelectTrigger>
        </Select>
    );
}
