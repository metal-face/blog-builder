import type { DOMPurify } from "dompurify";

const ALLOWED_IFRAME_HOSTS = new Set([
    "youtube.com",
    "www.youtube.com",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
]);

function isAllowedIframeSrc(src: string): boolean {
    try {
        const url = new URL(src);
        return (
            url.protocol === "https:" &&
            ALLOWED_IFRAME_HOSTS.has(url.hostname) &&
            url.pathname.startsWith("/embed/")
        );
    } catch {
        return false;
    }
}

export default function listenForElementSanitization(domPurifyInstance: DOMPurify) {
    domPurifyInstance.addHook("uponSanitizeElement", (node, data) => {
        // `instanceof Element` fails on the server, where nodes come from a jsdom window.
        if (data.tagName === "iframe" && node.nodeType === node.ELEMENT_NODE) {
            if (!isAllowedIframeSrc((node as Element).getAttribute("src") || "")) {
                node.parentNode?.removeChild(node);
            }
        }
    });
}
