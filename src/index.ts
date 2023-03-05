import formatDateFilter from "./filters/formatDate";
import lastModifiedDateFilter from "./filters/lastModifiedDate";
import favIconFromEmojiFilter from "./filters/favIconFromEmoji";
import addContentHash from "./filters/addContentHash";
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
import path from "path";
import { removeExtension } from "./utils/removeExtension";
import eleventyComputed from "./eleventyComputed";
import globalData from "./globalData";

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
    eleventyConfig.addGlobalData("gitRoot",
       globalData.gitRoot
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.page.gitLastModified",
        eleventyComputed.page.gitLastModified
    );
    eleventyConfig.addGlobalData(
        "eleventyComputed.page.gitCreated",
        eleventyComputed.page.gitCreated
    );

    eleventyConfig.addFilter("fav_icon_from_emoji", favIconFromEmojiFilter);
    eleventyConfig.addAsyncFilter("last_modified_date", lastModifiedDateFilter);
    eleventyConfig.addFilter("format_date_to_utc", formatDateFilter);
    // eleventyConfig.addFilter("format_datetime_to_utc", formatDateTimeFilter);
    eleventyConfig.addFilter("date", formatDateFilter);
    eleventyConfig.addAsyncFilter("add_content_hash", addContentHash);
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
