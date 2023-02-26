import path from "path";

export async function nacaraSectionDir() {
    return async (data: any) => {
        // Find the root of the project
        // Data doesn't contains the eleventyConfig.dir information
        // If needed, we can make the plugin expose it in the data
        const root = data.eleventy.env.root;

        const sectionDir = path.join(root, data.nacaraSection);

        return sectionDir;
    };
}
