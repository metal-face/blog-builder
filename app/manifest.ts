import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Blog Builder App",
        short_name: "Blog Builder",
        description: "An app to build blogs.",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/icon.tsx",
                sizes: "any",
                type: "image/svg",
            },
        ],
    };
}
