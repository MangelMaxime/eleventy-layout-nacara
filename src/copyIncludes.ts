import path from "path";
import fs from "fs-extra";
import { dirname } from 'dirname-filename-esm';

const __dirname = dirname(import.meta);

/**
 * Copy Nacara includes to the user folder so it can be easily accessed
 * without having the user create layouts to reference them
 */
export function copyIncludesToUserFolder(args : EleventyBeforeEventArgs) {
    // Note: It would be better to have a way to access the data.eleventy
    // information but it seems that it is not available at this point
    // So we try to mimic the behavior of eleventy and in case that's not
    // enough allow the user to provide the includesDir
    // includesDir = includesDir || "_includes";
    const includesDir = args.dir.includes;

    // Compute the destination folder
    let destination;

    // If user provided an absolute path, use it as is
    if (path.isAbsolute(includesDir)) {
        destination = includesDir;
    // Otherwise, use the path relative to the current working directory
    } else {
        const inputDir = path.isAbsolute(args.inputDir) ? args.inputDir : path.join(process.cwd(), args.inputDir);
        destination = path.join(inputDir, includesDir, "nacara");
    }

    // If the folder already exists, remove it
    // This is an easy way to make sure if a file doesn't exist anymore
    // in the plugin, it will be removed from the user folder
    if (fs.existsSync(destination)) {
        fs.rmSync(destination, { recursive: true });
    }

    fs.ensureDirSync(destination);

    const nacaraIncludesPath = path.join(
        __dirname,
        "..",
        "files",
        "includes"
    );
    fs.copySync(nacaraIncludesPath, destination, {
        // Allow to replace the files if they already exist
        // like that if user update the plugin, the files will be updated
        overwrite: true,
    });
    // Add a .gitignore file to the folder so it doesn't get commited
    fs.writeFileSync(path.join(destination, ".gitignore"), "**/*");
}
