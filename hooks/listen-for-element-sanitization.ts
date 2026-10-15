import type { DOMPurify } from "dompurify";

export default function listenForElementSanitization(domPurifyInstance: DOMPurify) {
    domPurifyInstance.addHook("uponSanitizeElement", (node, data) => {
        if (data.tagName === "iframe" && node instanceof Element) {
            const src = node.getAttribute("src") || "";

            if (src.startsWith("https://youtu.be") || src.startsWith("https://youtube.com")) {
                node.parentNode?.removeChild(node);
            }
        }
    });
}
