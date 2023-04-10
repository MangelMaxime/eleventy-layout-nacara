import { promisify } from "util";
const execFile = promisify(require("child_process").execFile);

export default async function gitRoot() : Promise<string> {
    try {
        const { stdout } = await execFile("git", [
            "rev-parse",
            "--show-toplevel",
        ]);

        if (stdout) {
            // Need to trim the trailing newline
            return stdout.trim();
        }

        throw new Error("Git root not found");
    } catch (e: any) {
        throw new Error(`Error while trying to get the git root.
Original error: ${e.message}`);
    }
}

module.exports = gitRoot;
