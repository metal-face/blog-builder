import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    letterSpacing: "-.02em",
                    fontWeight: 700,
                    background: "white",
                }}
            >
                <div
                    style={{
                        left: 42,
                        top: 42,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            width: 24,
                            height: 24,
                            background: "black",
                        }}
                    />
                    <span
                        style={{
                            marginLeft: 8,
                            fontSize: 20,
                        }}
                    >
                        blog-builder.com
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-hammer"
                    >
                        <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
                        <path d="m18 15 4-4" />
                        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
                    </svg>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "20px 50px",
                        margin: "0 42px",
                        fontSize: 40,
                        width: "auto",
                        maxWidth: 550,
                        textAlign: "center",
                        backgroundColor: "black",
                        color: "white",
                        lineHeight: 1.4,
                    }}
                >
                    Build Blogs.
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>Totally For Free.</div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
