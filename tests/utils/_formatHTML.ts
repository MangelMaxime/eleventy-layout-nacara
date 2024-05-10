import prettier from "prettier";

export async function formatHTML (html: string) {
    return await prettier.format(html, {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
        tabWidth: 4,
    });
}
