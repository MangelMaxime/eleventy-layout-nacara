import { promisify } from "util";
const execFile = promisify(require("child_process").execFile);
import path from "path";

// Cache the last modified date of a file
// because invoking git log is expensive
const lastModifiedDateCache = new Map();

async function lastModifiedDateFromGit(fileName: string) {
    try {
        const { stdout } = await execFile("git", [
            "--no-pager",
            "log",
            "-1",
            "--format=%at",
            fileName,
        ]);

        if (stdout) {
            const epoch = parseInt(stdout) * 1000;
            return new Date(epoch);
        }

        throw new Error(`Error while trying to get the last modified date of ${fileName}`);
    } catch (e: any) {
        // If there is an error, this is probably because this is a new file
        // that has not been committed yet.
        // In this case, we return the current date
        return new Date();
    }
}

export default async function gitLastModified() {
    return async (data: any) => {
        const relativePathFromGitRoot = path.relative(
            data.gitRoot,
            data.page.absolutePath
        );

        const cachedValue = lastModifiedDateCache.get(relativePathFromGitRoot);

        if (cachedValue) {
            return cachedValue;
        } else {
            const lastModifiedDate = await lastModifiedDateFromGit(relativePathFromGitRoot);
            lastModifiedDateCache.set(relativePathFromGitRoot, lastModifiedDate);
            return lastModifiedDate;
        }
    };
}

module.exports = gitLastModified;
