
export type ListItem = {
    kind: "list-item";
    text: string;
}

export type Text = {
    kind: "text";
    text: string;
}

export type Body =
    | ListItem
    | Text

export type Added = {
    kind: "added";
}

export type Changed = {
    kind: "changed";
}

export type Deprecated = {
    kind: "deprecated";
}

export type Removed = {
    kind: "removed";
}

export type Fixed = {
    kind: "fixed";
}

export type Security = {
    kind: "security";
}

export type Unknown = {
    kind: "unknown";
    name: string;
}

export type Category =
    | Added
    | Changed
    | Deprecated
    | Removed
    | Fixed
    | Security
    | Unknown

export function categoryFromText(text: string): Category {

    switch (text.toLowerCase()) {
    case "added":
        return { kind: "added" };

    case "changed":
        return { kind: "changed" };

    case "deprecated":
        return { kind: "deprecated" };

    case "removed":
        return { kind: "removed" };

    case "fixed":
        return { kind: "fixed" };

    case "security":
        return { kind: "security" };

    default:
        return { kind: "unknown", name: text };
    }
}
