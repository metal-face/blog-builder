import { Axios } from "@/axios/axios";

export async function fetchRelatedBlogs() {
    return await Axios({
        method: "GET",
        url: "/blogs/related",
    });
}
