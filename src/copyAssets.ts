import path from "path";
import fs from "fs-extra";

/**
 * Copy Nacara includes to the user folder so it can be easily accessed
 * without having the user create layouts to reference them
//  * @param includesDir Absolute or relative path to the includes folder
 */
export function copyAssetsToUserFolder(args : EleventyBeforeEventArgs) {
    // Compute the destination folder
    const destination = path.join(process.cwd(), args.inputDir, "assets", "nacara");

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
        "assets"
    );
    fs.copySync(nacaraIncludesPath, destination, {
        // Allow to replace the files if they already exist
        // like that if user update the plugin, the files will be updated
        overwrite: true,
    });
    // Add a .gitignore file to the folder so it doesn't get commited
    fs.writeFileSync(path.join(destination, ".gitignore"), "**/*");
}
