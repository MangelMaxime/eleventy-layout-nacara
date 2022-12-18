import { promisify } from "util";
const execFile = promisify(require("child_process").execFile);

// Cache the last modified date of a file
// because invoking git log is expensive
const lastModifiedDateCache = new Map();

async function lastModifiedDateFromGit(fileName: string) {
    try {
        const { stdout } = await execFile("git", [
            "--no-pager",
            "log",
            "-1",
            "--format=%cd",
            fileName,
        ]);

        if (stdout) {
            return new Date(stdout);
        }

        return new Date();
    } catch (e: any) {
        console.error(e.message);
        return new Date();
    }
}

export default async function lastModifiedDateFilter (
    fileName: string
) {
    const cachedValue = lastModifiedDateCache.get(fileName);

    if (cachedValue) {
        return cachedValue;
    } else {
        const lastModifiedDate = await lastModifiedDateFromGit(fileName)
        lastModifiedDateCache.set(fileName, lastModifiedDate);
        return lastModifiedDate;
    }
};

module.exports = lastModifiedDateFilter;
