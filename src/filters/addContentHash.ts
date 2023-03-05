import fs from "fs/promises";
import crypto from "crypto";
import path from "path";

export default async function addContentHash (
    absolutePath: string
) {
    try {
        const content = await fs.readFile(path.join(".", absolutePath), {
            encoding: "utf-8",
        });

        const hash = crypto.createHash("sha256").update(content).digest("hex");

        const resultPath = `${absolutePath}?hash=${hash.slice(0, 10)}`;

        return resultPath;
    } catch (error) {
        throw new Error(`Failed to addHash to '${absolutePath}': ${error}`);
    }
};

module.exports = addContentHash;
