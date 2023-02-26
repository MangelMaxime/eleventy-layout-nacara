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
import { copyAssetsToUserFolder } from "./copyAssets";
import fs from "fs-extra";
import path from "path";
import { removeExtension } from "./utils/removeExtension";
import { baseUrl as eleventyComputedBaseUrl } from "./eleventyComputed/baseUrl";
import { nacaraSection as eleventyComputedNacaraSection } from "./eleventyComputed/nacaraSection";
import { nacaraSectionDir as eleventyComputedNacaraSectionDir } from "./eleventyComputed/nacaraSectionDir";
import { sanitizedTitle as eleventyComputedSanitizedTitle } from "./eleventyComputed/sanitizedTitle";

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
        eleventyComputedSanitizedTitle
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.baseUrl",
        eleventyComputedBaseUrl
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.nacaraSectionDir",
        eleventyComputedNacaraSectionDir
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.nacaraSection",
        eleventyComputedNacaraSection
    );

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
    eleventyConfig.addFilter(
        "nacara_previous_next_pagination",
        navigationFilter
    );

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

    eleventyConfig.addPassthroughCopy("assets");
}

module.exports = {
    initArguments: {},
    configFunction: configFunction,
};
