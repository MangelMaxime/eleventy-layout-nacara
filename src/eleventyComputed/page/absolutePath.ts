import path from "node:path";

export default function absolutePath() {
    return (data: any) => {
        // Work around Eleventy bug/limitation when run via code and not CLI
        // See: https://github.com/11ty/eleventy/issues/2793
        if (path.isAbsolute(data.page.inputPath)) {
            return data.page.inputPath;
        }

        return path.resolve(path.join(process.cwd(), data.page.inputPath));
        // It would be better to use this, but it doesn’t work
        // return path.join(data.eleventy.env.root, data.page.inputPath);
    };
}
