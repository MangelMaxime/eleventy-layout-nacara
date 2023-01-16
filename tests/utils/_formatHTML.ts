import prettier from "prettier";

export function formatHTML (html: string) {
    return prettier.format(html, {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
        tabWidth: 4,
    });
}
