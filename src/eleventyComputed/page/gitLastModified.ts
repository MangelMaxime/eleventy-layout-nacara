import spawn from "cross-spawn";
import path from "path";

async function lastModifiedDateFromGit(cwd : string, fileName: string) {
    try {
        const res = spawn.sync("git", [
            "--no-pager",
            "log",
            "-2", // We don't need the full history
            "--follow",
            "--format=%at",
            "--",
            fileName,
        ], { cwd: cwd });

        const stdout = res.stdout.toString("utf-8");

        // 1. Remove the trailing newline
        // 2. Replace \r with \n (in case we are on Windows)
        // 3. Split the string into an array of lines
        const lines = stdout.trimEnd().replace(/\r/g, "\n").split("\n");

        // If there is more than one line, it means that the file has been
        // modified at least once (created + modified)
        if (lines.length > 1) {
            const epoch = parseInt(lines[0]) * 1000;
            return new Date(epoch);
        }

        // The file has only been created
        return null;
    } catch (e: any) {
        // If there is an error, this is probably because this is a new file
        // that has not been committed yet.
        // In this case, we return the current date
        throw new Error(
            `Error while trying to get the last modified date of ${fileName}.\nOriginal error: ${e.message}`
        );
    }
}

export default function gitLastModified(
    lastModifiedDateCache: Map<string, Date | null>
) {
    // Not pretty, but this is what Eleventy expects
    // We provide the cache as an argument to the function
    // so that if several instances of the plugin are used,
    // they don't share the same cache
    return async function () {
        return async (data: any) => {
            const relativePathFromGitRoot = path.relative(
                data.gitRoot,
                data.page.absolutePath
            );

            const cachedValue = lastModifiedDateCache.get(
                relativePathFromGitRoot
            );

            if (cachedValue) {
                return cachedValue;
            } else {
                const lastModifiedDate = await lastModifiedDateFromGit(
                    data.gitRoot,
                    relativePathFromGitRoot
                );
                lastModifiedDateCache.set(
                    relativePathFromGitRoot,
                    lastModifiedDate
                );
                return lastModifiedDate;
            }
        };
    };
}
