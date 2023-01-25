import path from "path";

export function removeExtension(fileName: string): string {
    const parsedPath = path.parse(fileName);
    return path.join(parsedPath.dir, parsedPath.name);
}
