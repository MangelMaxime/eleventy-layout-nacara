import formatDateFilter from "./filters/formatDate";
import lastModifiedDateFilter from "./filters/lastModifiedDate";
import favIconFromEmojiFilter from "./filters/favIconFromEmoji";
import addHashFilter from "./filters/addContentHash";
import fileToBodyClassFilter from "./filters/fileToBodyClass";
import layoutToBodyClassFilter from "./filters/layoutToBodyClass";
import toIconFilterBuilder, {
    Options as IconFilterBuilderOptions,
} from "./filters/toIcon";
import menuFilter from "./filters/menu";
import breadcrumbFilter from "./filters/breadcrumb";
import navigationFilter from "./filters/navigation";
// @ts-ignore
import eleventySass from "eleventy-sass";
import { copyIncludesToUserFolder } from "./copyIncludes";
import fs from "fs-extra";
import path from "path";

export interface Options {
    iconFilter?: IconFilterBuilderOptions;
    eleventySass?: any;
    includesDir?: string;
}

// Default eleventyComputed required by the layout plugin
const defaultEleventyComputed = {
    baseUrl: async (data: any) => {
        if (data.isDevelopment) {
            return "";
        }

        if (data.nacaraMetadata == undefined) {
            throw new Error(
                "eleventy-layout-nacara: Please provide the metadata information by creating a _data/nacaraMetadata.json file."
            );
        }

        return data.nacaraMetadata.baseUrl;
    },
    sectionDir: async (data: any) => {
        // Find the root of the project
        // Data doesn't contains the eleventyConfig.dir information
        // If needed, we can make the plugin expose it in the data
        const root = data.eleventy.env.root;

        //  Normal the path, so we can split using the path separator
        const normalizedInputPath = path.normalize(data.page.inputPath);
        // Extract all the segments of the path
        const inputPathSegments = normalizedInputPath.split(path.sep);
        // Build the section direction, which consist of the root + the first segment of the path
        const sectionDir = path.join(root, inputPathSegments[0])
        // Build the nacaraMenu.json expected path
        return sectionDir;
    },
    nacaraSection: async (data: any) => {
        //  Normal the path, so we can split using the path separator
        const normalizedInputPath = path.normalize(data.page.inputPath);
        // Extract all the segments of the path
        const inputPathSegments = normalizedInputPath.split(path.sep);
        // Build the section direction, which consist of the root + the first segment of the path
        return inputPathSegments[0]
    },
    nacaraMenu: async (data : any) => {
        const menuFilepath = path.join(data.sectionDir, 'nacaraMenu.json');
        // If the nacaraMenu.json file exists, read it and expose
        if (fs.existsSync(menuFilepath)) {
            const menuBuffer = await fs.readFile(menuFilepath);
            const menu = menuBuffer.toString();
            const parsedMenu = JSON.parse(menu);

            // If this is an object, we assume this is because user
            // is using an object to include the JSON schema
            if (typeof parsedMenu === 'object' && parsedMenu.items) {
                return parsedMenu.items;
            } else {
                throw new Error(`Invalid nacaraMenu.json file. Expected format is:
{
    "$schema": "./../../schemas/menu-schema.json",
    "items": [
        ...
    ]
}
`);
            }
        }

        // Otherwise, return null
        return null
    }
};

function configFunction(eleventyConfig: any, options?: Options) {
    console.log("Nacara plugin loaded");

    copyIncludesToUserFolder(options?.includesDir);

    eleventyConfig.addGlobalData(
        "isDevelopment",
        process.argv.includes("--serve")
    );

    // Merge the default eleventyComputed with the one provided by the user
    // This make it possible to keep user defined eleventyComputed
    // instead of overriding them
    // Conflicts can still happen if the user defined a key that is defined
    // in the plugin but for now we consider it as an edge case
    // Kind of like you have the data cascade in eleventy
    const mergedEleventyComputed = {
        ...defaultEleventyComputed,
        ...eleventyConfig.eleventyComputed,
    };

    eleventyConfig.addGlobalData("eleventyComputed", mergedEleventyComputed);

    eleventyConfig.addFilter("fav_icon_from_emoji", favIconFromEmojiFilter);
    eleventyConfig.addAsyncFilter("last_modified_date", lastModifiedDateFilter);
    eleventyConfig.addFilter("format_date", formatDateFilter);
    eleventyConfig.addAsyncFilter("add_content_hash", addHashFilter);
    eleventyConfig.addFilter("file_to_body_class", fileToBodyClassFilter);
    eleventyConfig.addFilter("layout_to_body_class", layoutToBodyClassFilter);
    eleventyConfig.addAsyncFilter(
        "to_icon",
        toIconFilterBuilder(options?.iconFilter)
    );

    eleventyConfig.addFilter("nacara_menu", menuFilter);
    eleventyConfig.addFilter("nacara_breadcrumb", breadcrumbFilter);
    eleventyConfig.addFilter("nacara_navigation", navigationFilter);

    // Register the sass plugin as with provide the styles using SCSS
    eleventyConfig.addPlugin(eleventySass, options?.eleventySass);
}

module.exports = {
    initArguments: {},
    configFunction: configFunction,
};
