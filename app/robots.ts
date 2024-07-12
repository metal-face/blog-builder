import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Googlebot",
                allow: ["/"],
                disallow: "/private/",
            },
            {
                userAgent: ["Applebot", "Bingbot"],
                disallow: ["/"],
            },
            {
                userAgent: "*",
                allow: "/api/og/*",
            },
        ],
        sitemap: "https://acme.com/sitemap.xml",
    };
}
