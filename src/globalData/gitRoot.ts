import { promisify } from "util";
const execFile = promisify(require("child_process").execFile);

export default async function gitRoot() {
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
        // console.error(e.message);
        // return new Date();
        throw new Error(`Error while trying to get the git root.
Original error: ${e.message}`);
    }
}

module.exports = gitRoot;
