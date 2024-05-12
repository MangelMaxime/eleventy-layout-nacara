import { lex } from "./lexer.js";
import type * as Lex from "./lexer.js";
import type * as Category from "./categories.js";
import { categoryFromText } from "./categories.js";

export type Version = {
    title: string;
    version: string | undefined;
    date: string | undefined;
    categories: Map<Category.Category, string>;
    isYanked: boolean;
};

export type Changelog = {
    title: string | undefined;
    description: string | undefined;
    versions: Version[];
};

function parseCategoryBody(
    tokens: Lex.Tokens[],
    body: string
): { unparsedTokens: Lex.Tokens[]; body: string } {
    const [head, ...tail] = tokens;

    if (head === undefined) {
        return {
            unparsedTokens: tail,
            body: body,
        };
    }

    switch (head.kind) {
        case "markdown-text":
            const rawTextResult = eatRawText(tail, [head.text]);

            return parseCategoryBody(
                rawTextResult.unparsedTokens,
                body + "\n" + rawTextResult.rawText
            );
        default:
            // Reach end of the category body
            return {
                unparsedTokens: tokens,
                body: body,
            };
    }
}

function eatRawText(
    tokens: Lex.Tokens[],
    captured: string[]
): {
    unparsedTokens: Lex.Tokens[];
    rawText: string;
} {
    const [head, ...tail] = tokens;

    if (head === undefined) {
        return {
            unparsedTokens: tail,
            rawText: captured.join("\n").trim(),
        };
    }

    switch (head.kind) {
        case "markdown-text":
            return eatRawText(tail, [...captured, head.text]);
        default:
            // Reach end of the category body
            return {
                unparsedTokens: tokens,
                rawText: captured.join("\n").trim(),
            };
    }
}

function fromTokens(changelog: Changelog, tokens: Lex.Tokens[]): Changelog {
    const [head, ...tail] = tokens;

    if (head === undefined) {
        return changelog;
    }

    switch (head.kind) {
        case "title":
            if (changelog.title === undefined) {
                changelog.title = head.text;
            } else {
                throw new Error(
                    "Title already set, please check that your changelog only has one title: `# Title`"
                );
            }

            return fromTokens(changelog, tail);
        case "version":
            const newVersion = {
                title: head.text,
                version: head.version,
                date: head.date,
                categories: new Map(),
                isYanked: head.isYanked,
            };

            changelog.versions.push(newVersion);

            return fromTokens(changelog, tail);

        case "category":
            const categoryType = categoryFromText(head.text);
            const subParserResult = parseCategoryBody(tail, "");

            const currentVersion =
                changelog.versions[changelog.versions.length - 1];

            if (currentVersion === undefined) {
                throw new Error(`Error while parsing the following item:
---
${head.text}
---

Category should always be inside a version

Example:

## 1.0.0

### Added`);
            }

            // Create current category content if it doesn't exist
            if (!currentVersion.categories.has(categoryType)) {
                currentVersion.categories.set(categoryType, "");
            }

            // Get current category body state or create a new one
            // @ts-ignore - We made sure that the category exists
            let categoryBody: Category.Body[] =
                currentVersion.categories.get(categoryType);

            // Add new content to category body
            // categoryBody = [...categoryBody, ...subParserResult.body];

            currentVersion.categories.set(categoryType, subParserResult.body);

            return fromTokens(changelog, subParserResult.unparsedTokens);

        case "markdown-text":
            // If we didn't reach the version yet, we consider the raw text
            // as part of the description
            if (changelog.versions.length === 0) {
                // Capture all the lines of the text block
                const rawTextResult = eatRawText(tail, [head.text]);

                changelog.description = rawTextResult.rawText;

                return fromTokens(changelog, rawTextResult.unparsedTokens);
            } else {
                // Otherwise, if we have some raw text, in the main body of the
                // tokenization, we ignore it
                // Note:
                // 1. keepachangelog doesn't support description at the description level
                // 2. raw-text for list-item is handled in the list-item case directly
                return fromTokens(changelog, tail);
            }

        default:
            // Force exhaustive check from TypeScript
            const _exhaustiveCheck: never = head;
            throw _exhaustiveCheck;
    }
}

export function parse(text: string): Changelog {
    const lines = text.split(/\r\n|\r|\n/);
    const tokens: Lex.Tokens[] = lex(lines);

    return fromTokens(
        {
            title: undefined,
            description: undefined,
            versions: [],
        },
        tokens
    );
}
