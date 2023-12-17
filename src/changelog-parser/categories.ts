export type Added = {
    kind: "added";
};

export type Changed = {
    kind: "changed";
};

export type Deprecated = {
    kind: "deprecated";
};

export type Removed = {
    kind: "removed";
};

export type Fixed = {
    kind: "fixed";
};

export type Security = {
    kind: "security";
};

export type Unknown = {
    kind: "unknown";
    name: string;
};

export type Category =
    | Added
    | Changed
    | Deprecated
    | Removed
    | Fixed
    | Security
    | Unknown;

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

export const added = categoryFromText("added");
export const changed = categoryFromText("changed");
export const deprecated = categoryFromText("deprecated");
export const removed = categoryFromText("removed");
export const fixed = categoryFromText("fixed");
export const security = categoryFromText("security");

export function categoryToText(category: Category): string {
    switch (category.kind) {
        case "added":
            return "Added";
        case "changed":
            return "Changed";
        case "deprecated":
            return "Deprecated";
        case "removed":
            return "Removed";
        case "fixed":
            return "Fixed";
        case "security":
            return "Security";
        case "unknown":
            return category.name;
    }
}
