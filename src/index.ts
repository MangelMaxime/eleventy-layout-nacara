import formatDateFilter from "./filters/formatDateToUtc";
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
import { removeExtension } from "./utils/removeExtension";

export interface Options {
    iconFilter?: IconFilterBuilderOptions;
    eleventySass?: any;
    includesDir?: string;
}

const removeInitialDotSlash = (str: string) => {
    if (str.startsWith("./")) {
        return str.substring(2);
    }
    return str;
};

const stemifyMenu = (menu: Menu): Menu => {
    return menu.map((item) => {
        if (typeof item === "string") {
            const normalised = item.replace(/\\/g, "/");
            return removeInitialDotSlash(removeExtension(normalised));
        }

        if (item.type === "section") {
            return {
                ...item,
                items: stemifyMenu(item.items),
            };
        }

        // Link are not stemified
        if (item.type === "link") {
            return item;
        }

        throw new Error("Unknown menu item type");
    });
};

// Default eleventyComputed required by the layout plugin
const defaultEleventyComputed = {
    sanitizedTitle: async (data: any) => {
        // I don't know why but some title are undefined
        if (data.title) {
            return data.title.replace(/(<([^>]+)>)/gi, "");
        } else {
            return "";
        }
    },
    baseUrl: async (data: any) => {
        if (data.isDevelopment) {
            return "";
        }

        if (data.metadata.nacara == undefined) {
            throw new Error(
                "eleventy-layout-nacara: Please provide the metadata information by creating a _data/metadata.nacara file."
            );
        }

        return data.metadata.nacara.baseUrl;
    },
    nacaraSectionDir: async (data: any) => {
        // Find the root of the project
        // Data doesn't contains the eleventyConfig.dir information
        // If needed, we can make the plugin expose it in the data
        const root = data.eleventy.env.root;

        const sectionDir = path.join(root, data.nacaraSection);

        return sectionDir;
    },
    nacaraSection: async (data: any) => {
        // Normalize the path, so we can split using the path separator
        // const normalizedInputPath = path.normalize(data.page.inputPath);
        // Extract all the segments of the path
        // const inputPathSegments = normalizedInputPath.split(path.sep);

        // Use the filePathStem instead of the inputPath
        // because when using the programmatic API + Ava for the tests
        // the inputPath is not what we would expect.
        // This is because the inputPath is relative to where Eleventy is executed
        // and with Ava I can't make the process change the directory.
        //
        // One solution would be:
        // - Use the chdir function
        // - Disable the worker-threads in Ava
        // - Use one file per test
        //
        // I think having to use one file per test is not a great experience
        // so for now, we will use this workaround
        //
        // Additionally benefits of using the filePathStem is that we
        // don't have to deal with path normalization
        const inputPathSegments = data.page.filePathStem
            .substring(1)
            .split("/");

        // Build the section direction, which consist of the root + the first segment of the path
        return inputPathSegments[0];
    }
};

function configFunction(eleventyConfig: any, options?: Options) {
    let isFirstBuild = true;

    eleventyConfig.on("eleventy.before", async (args: any) => {
        if (isFirstBuild) {
            isFirstBuild = false;
            copyIncludesToUserFolder(args);
        }
    });

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
    eleventyConfig.addFilter("format_date_to_utc", formatDateFilter);
    eleventyConfig.addAsyncFilter("add_content_hash", addHashFilter);
    eleventyConfig.addFilter("file_to_body_class", fileToBodyClassFilter);
    eleventyConfig.addFilter("layout_to_body_class", layoutToBodyClassFilter);
    eleventyConfig.addAsyncFilter(
        "to_icon",
        toIconFilterBuilder(options?.iconFilter)
    );

    eleventyConfig.addFilter("nacara_menu", menuFilter);
    eleventyConfig.addFilter("nacara_breadcrumb", breadcrumbFilter);
    eleventyConfig.addFilter("nacara_previous_next_pagination", navigationFilter);

    // Register the sass plugin as with provide the styles using SCSS
    eleventyConfig.addPlugin(eleventySass, options?.eleventySass);

    eleventyConfig.addDataExtension(
        "menu",
        (contents: string, filePath: string) => {
            const parsedMenu = JSON.parse(contents);

            // If this is an object, we assume this is because user
            // is using an object to include the JSON schema
            if (typeof parsedMenu === "object" && parsedMenu.items) {
                return {
                    nacaraMenu: stemifyMenu(parsedMenu.items),
                };
            } else {
                throw new Error(`Invalid *.menu file. Expected format is:
{
    "$schema": "<path to eleventy-layout-nacara>/schemas/menu-schema.json",
    "items": [
        ...
    ]
}
`);
            }
        }
    );

    eleventyConfig.addDataExtension(
        "nacara",
        (contents: string, filePath: string) => {
            const fileName = path.basename(filePath);
            const parsed = JSON.parse(contents);

            switch (fileName) {
                case "footer.nacara":
                    return {
                        nacara: parsed
                    };
                case "navbar.nacara":
                    return {
                        nacara: parsed
                    };
                case "metadata.nacara":
                    return {
                        nacara: parsed
                    };
                default:
                    throw new Error(`Unknown nacara file: ${fileName}`);
            }
        }
    );
}

module.exports = {
    initArguments: {},
    configFunction: configFunction,
};
