import { lex } from "./lexer";
import type * as Lex from "./lexer";
import type * as Category from "./categories";
import { categoryFromText } from "./categories";

type Version = {
    title: string;
    version: string | undefined;
    date: string | undefined;
    categories: Map<Category.Category, Category.Body[]>;
    isYanked: boolean;
};

type Changelog = {
    title: string;
    description: string | undefined;
    versions: Version[];
};

function parseCategoryBody(
    tokens: Lex.Tokens[],
    body: Category.Body[]
): { unparsedTokens: Lex.Tokens[]; body: Category.Body[] } {
    const [head, ...tail] = tokens;

    if (head === undefined) {
        return {
            unparsedTokens: tail,
            body: body,
        };
    }

    switch (head.kind) {
        case "list-item":
            return parseCategoryBody(tail, [
                ...body,
                { kind: "list-item", text: head.text },
            ]);
        case "raw-text":
            return parseCategoryBody(tail, body);
        default:
            // Reach end of the category body
            return {
                unparsedTokens: tokens,
                body: body,
            };
    }
}

function eatRawText(tokens: Lex.Tokens[], captured : string []): {
    unparsedTokens: Lex.Tokens[];
    rawText: string;
} {
    const [head, ...tail] = tokens;

    if (head === undefined) {
        return {
            unparsedTokens: tail,
            rawText: captured.join("\n"),
        };
    }

    switch (head.kind) {
        case "raw-text":
            return eatRawText(tail, [...captured, head.content]);
        default:
            // Reach end of the category body
            return {
                unparsedTokens: tokens,
                rawText: captured.join("\n"),
            };
    }
}

function fromTokens(changelog: Changelog, tokens: Lex.Tokens[]): Changelog {
    const [head, ...tail] = tokens;

    console.log(head);

    if (head === undefined) {
        return changelog;
    }

    switch (head.kind) {
        case "title":
            if (changelog.title === "") {
                changelog.title = head.content;
            } else {
                throw "Title already set, please check that your changelog only has one title: `# Title`";
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
            const subParserResult = parseCategoryBody(tail, []);

            const currentVersion =
                changelog.versions[changelog.versions.length - 1];

            if (currentVersion === undefined) {
                throw `Category should always be inside a version

Example:

## 1.0.0

### Added`;
            }

            // Create current category content if it doesn't exist
            if (!(currentVersion.categories.has(categoryType))) {
                currentVersion.categories.set(categoryType, []);
            }

            // Get current category body state or create a new one
            // @ts-ignore - We made sure that the category exists
            let categoryBody: Category.Body[] =
                currentVersion.categories.get(categoryType)

            // Add new content to category body
            categoryBody = [...categoryBody, ...subParserResult.body];

            return fromTokens(changelog, tail);
        case "list-item":
            throw `List item should always be inside a category

Example:

### Added

- Added a new feature`;

        case "raw-text":
            // Capture all the lines of the text block
            const rawTextResult = eatRawText(tail, [head.content]);

            changelog.description = rawTextResult.rawText;

            return fromTokens(changelog, rawTextResult.unparsedTokens);

        default:
            // Force exhaustive check from TypeScript
            const _exhaustiveCheck: never = head;
            throw _exhaustiveCheck;
    }
}

export function parse(text: string) {
    const lines = text.split(/\r\n|\r|\n/);
    const tokens: Lex.Tokens[] = lex(lines);

    // console.log(tokens);

    return fromTokens(
        {
            title: "",
            description: undefined,
            versions: [],
        },
        tokens
    );
}
