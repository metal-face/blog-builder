import { DOMPurifyI } from "dompurify";

export default function listenForElementSanitization(domPurifyInstance: DOMPurifyI) {
    domPurifyInstance.addHook("uponSanitizeElement", (node, data) => {
        if (data.tagName === "iframe") {
            const src = node.getAttribute("src") || "";

            if (src.startsWith("https://youtu.be") || src.startsWith("https://youtube.com")) {
                node.parentNode?.removeChild(node);
            }
        }
    });
}
