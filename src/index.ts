import formatDateFilter from "./filters/formatDate";
import favIconFromEmojiFilter from "./filters/favIconFromEmoji";
import addContentHash from "./filters/addContentHash";
import fileToBodyClassFilter from "./filters/fileToBodyClass";
import layoutToBodyClassFilter from "./filters/layoutToBodyClass";
import toIconFilterBuilder, {
    Options as IconFilterBuilderOptions,
} from "./filters/toIcon";
import menuFilter from "./filters/menu";
import changelogFilter from "./filters/changelog";
import breadcrumbFilter from "./filters/breadcrumb";
import navigationFilter from "./filters/navigation";
// @ts-ignore
import eleventySass from "eleventy-sass";
import { copyIncludesToUserFolder } from "./copyIncludes";
import { copyAssetsToUserFolder } from "./copyAssets";
import path from "path";
import { removeExtension } from "./utils/removeExtension";
import eleventyComputed from "./eleventyComputed";
import globalData from "./globalData";
import markdownItAnchor from "markdown-it-anchor";
import type MdLib from "markdown-it";

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

function configFunction(eleventyConfig: any, options?: Options) {
    let isFirstBuild = true;

    // Cache the last modified date of a file
    // because invoking git log is expensive
    const gitCreatedCache = new Map<string, Date>();

    // Cache the last modified date of a file
    // because invoking git log is expensive
    const lastModifiedDateCache = new Map<string, Date | null>();

    // Work around Eleventy bugs/limitations when run via code and not CLI
    // See: https://github.com/11ty/eleventy/issues/2793
    eleventyConfig.on("eleventy.before", async (args: any) => {
        if (isFirstBuild) {
            isFirstBuild = false;
            copyIncludesToUserFolder(args);
            copyAssetsToUserFolder(args);
        }
    });

    eleventyConfig.addGlobalData(
        "isDevelopment",
        process.argv.includes("--serve")
    );

    eleventyConfig.addGlobalData(
        "eleventyComputed.sanitizedTitle",
        eleventyComputed.sanitizedTitle
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.baseUrl",
        eleventyComputed.baseUrl
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.nacaraSectionDir",
        eleventyComputed.nacaraSectionDir
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.nacaraSection",
        eleventyComputed.nacaraSection
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.page.absolutePath",
        eleventyComputed.page.absolutePath
    );
    eleventyConfig.addGlobalData("gitRoot", globalData.gitRoot);
    eleventyConfig.addGlobalData(
        "eleventyComputed.page.gitLastModified",
        eleventyComputed.page.gitLastModified(lastModifiedDateCache)
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.page.gitCreated",
        eleventyComputed.page.gitCreated(gitCreatedCache)
    );

    eleventyConfig.addFilter("fav_icon_from_emoji", favIconFromEmojiFilter);
    // eleventyConfig.addFilter("format_date_to_utc", formatDateFilter);
    // eleventyConfig.addFilter("format_datetime_to_utc", formatDateTimeFilter);
    eleventyConfig.addFilter("format_date", formatDateFilter);
    eleventyConfig.addAsyncFilter("add_content_hash", addContentHash);
    eleventyConfig.addFilter("file_to_body_class", fileToBodyClassFilter);
    eleventyConfig.addFilter("layout_to_body_class", layoutToBodyClassFilter);
    eleventyConfig.addAsyncFilter(
        "to_icon",
        toIconFilterBuilder(options?.iconFilter)
    );

    eleventyConfig.addFilter("nacara_menu", menuFilter);
    eleventyConfig.addAsyncFilter("nacara_changelog", changelogFilter);
    eleventyConfig.addFilter("nacara_breadcrumb", breadcrumbFilter);
    eleventyConfig.addFilter(
        "nacara_previous_next_pagination",
        navigationFilter
    );

    // Register the sass plugin as we provide the styles using SCSS
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
                        nacara: parsed,
                    };
                case "navbar.nacara":
                    return {
                        nacara: parsed,
                    };
                case "metadata.nacara":
                    return {
                        nacara: parsed,
                    };
                default:
                    throw new Error(`Unknown nacara file: ${fileName}`);
            }
        }
    );

    // Add a markdown-it plugin to add anchors to headings
    // This is used to generate the table of contents
    eleventyConfig.amendLibrary("md", (mdLib: MdLib) => {
        mdLib.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.linkInsideHeader({
                placement: "after",
            }),
        });
    });

    eleventyConfig.addPassthroughCopy("assets");
}

module.exports = {
    initArguments: {},
    configFunction: configFunction,
};
