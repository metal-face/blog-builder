import type { MetadataRoute } from "next";

const URL = "https://blog-builder.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${URL}/`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/builder`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/blogs`,
            lastModified: new Date(),
        },
        {
            url: `${URL}/login`,
            lastModified: new Date(),
        },
    ];
}
