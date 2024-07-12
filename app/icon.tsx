import { ImageResponse } from "next/og";
import { Hammer } from "lucide-react";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/svg";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="yellow"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-hammer"
            >
                <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
                <path d="m18 15 4-4" />
                <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
            </svg>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
