export type Title = {
    kind: "title";
    text: string;
};

export type MardownText = {
    kind: "markdown-text";
    text: string;
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

export type Tokens = Title | Version | Category | MardownText;

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
                text: line.substring(1).trim(),
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

        // If no parser captures the line, we capture it as markdown text
        return {
            kind: "markdown-text",
            text: line,
        };
    });

    return tokens;
}
