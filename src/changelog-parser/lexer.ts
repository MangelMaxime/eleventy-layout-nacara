export type Title = {
    kind: "title";
    content: string;
};

export type RawText = {
    kind: "raw-text";
    content: string;
};

export type Version = {
    kind: "version";
    text: string;
    version: string | undefined;
    date: string | undefined;
    isYanked: boolean;
};

export type Category = {
    kind: "category";
    text: string;
};

export type Item = {
    kind: "list-item";
    text: string;
};

export type Tokens = Title | Version | Category | Item | RawText;

const versionRegex = /\[?v?([\w\d.-]+\.[\w\d.-]+[a-zA-Z0-9])\]?/;
const dateRegex = /(\d{4}-\d{2}-\d{2})/;
const yankedRegex = /\[YANKED\]/;

export function lex(lines: string[]): Tokens[] {
    const tokens: Tokens[] = lines.map((line) => {

        // If we find a title save it and
        // We check first if we don't have a title already, to avoid
        // running this check on every line
        if (line.match(/^# ?[^#]/)) {
            return {
                kind: "title",
                content: line.substring(1).trim(),
            };
        }

        // Handle version like:
        // ## 1.0.0
        // ## 1.0.0 - 2020-01-01
        if (line.match(/^##? ?[^#]/)) {
            const version = versionRegex.exec(line);
            const date = dateRegex.exec(line);
            const isYanked = yankedRegex.test(line);

            return {
                kind: "version",
                text: line.substring(2).trim(),
                version: version ? version[1] : undefined,
                date: date ? date[1] : undefined,
                isYanked: isYanked,
            };
        }

        // Handle category like:
        // - Added
        // - Changed
        // - etc.
        if (line.match(/^###/)) {
            return {
                kind: "category",
                text: line.substring(3).trim(),
            };
        }

        // Handle list items like:
        // - - This is a list item
        // - * This is another list item
        if (line.match(/^[*-]/)) {
            return {
                kind: "list-item",
                text: line.substring(1).trim(),
            };
        }

        // If not parser captures the line, we capture it as raw text
        return {
            kind: "raw-text",
            content: line,
        };
    });

    return tokens;
}
