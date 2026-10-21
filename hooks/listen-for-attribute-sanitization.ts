import type { DOMPurify } from "dompurify";

export default function listenForAttributeSanitization(
    allowedStyles: string[],
    domPurifyInstance: DOMPurify
) {
    domPurifyInstance.addHook("uponSanitizeAttribute", (_node, data) => {
        if (data.attrName === "style") {
            const styles = data.attrValue
                .split(";")
                .map((style) => style.trim())
                .filter((style) => style);

            const safeStyles = styles.filter((style) => {
                const [property] = style.split(":").map((item) => item.trim());
                return allowedStyles.includes(property);
            });

            data.attrValue = safeStyles.join("; ");
        }
    });
}
