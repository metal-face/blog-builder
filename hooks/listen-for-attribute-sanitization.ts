import { DOMPurifyI } from "dompurify";

export default function listenForAttributeSanitization(
    allowedStyles: string[],
    domPurifyInstance: DOMPurifyI
) {
    domPurifyInstance.addHook("uponSanitizeAttribute", (node, data) => {
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
