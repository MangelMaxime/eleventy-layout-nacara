import spawn from "cross-spawn";
import path from "path";

async function gitCreatedFromGit(cwd: string, fileName: string) {
    try {
        const res = spawn.sync(
            "git",
            [
                "--no-pager",
                "log",
                "--diff-filter=A",
                "--follow",
                "-1",
                "--format=%at",
                "--",
                fileName,
            ],
            { cwd: cwd }
        );

        const stdout = res.stdout.toString("utf-8");

        if (stdout && stdout.length > 0) {
            const epoch = parseInt(stdout) * 1000;
            return new Date(epoch);
        }

        // If there is no stdout, this is probably because this is a new file
        // that has not been committed yet.
        return new Date();
    } catch (e: any) {
        // If there is an error, this is probably because this is a new file
        // that has not been committed yet.
        // In this case, we return the current date
        throw new Error(
            `Error while trying to get the last modified date of ${fileName}.\nOriginal error: ${e.message}`
        );
    }
}

export default function gitCreated(gitCreatedCache: Map<string, Date>) {
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

            const cachedValue = gitCreatedCache.get(relativePathFromGitRoot);

            if (cachedValue) {
                return cachedValue;
            } else {
                const createdDate = await gitCreatedFromGit(
                    data.gitRoot,
                    relativePathFromGitRoot
                );
                gitCreatedCache.set(relativePathFromGitRoot, createdDate);
                return createdDate;
            }
        };
    };
}

module.exports = gitCreated;
