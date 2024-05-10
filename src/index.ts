// import formatDateFilter from "./filters/formatDate";
// import favIconFromEmojiFilter from "./filters/favIconFromEmoji";
// import addContentHash from "./filters/addContentHash";
// import fileToBodyClassFilter from "./filters/fileToBodyClass";
// import layoutToBodyClassFilter from "./filters/layoutToBodyClass";
// import addBaseUrlIfNoProtocol from "./filters/addBaseUrlIfNoProtocol";
// import toIconFilterBuilder, {
//     Options as IconFilterBuilderOptions,
// } from "./filters/toIcon";
// import menuFilter from "./filters/menu";
// import changelogFilter from "./filters/changelog";
// import breadcrumbFilter from "./filters/breadcrumb";
// import navigationFilter from "./filters/navigation";
// // @ts-ignore
// import eleventySass from "eleventy-sass";
// import { copyIncludesToUserFolder } from "./copyIncludes";
// import { copyAssetsToUserFolder } from "./copyAssets";
// import { removeExtension } from "./utils/removeExtension";
// import eleventyComputed from "./eleventyComputed";
// import globalData from "./globalData";
// // import markdownItAnchor from "markdown-it-anchor";
// import markdownItContainer from "markdown-it-container";
// import type MdLib from "markdown-it";
// // @ts-ignore
// import { EleventyRenderPlugin } from "@11ty/eleventy";
// import slugify from 'slugify'
// import { baseUrlRedirect } from "./middlewares/baseUrlRedirect";
// import path from 'node:path';
// import { dirname, filename } from 'dirname-filename-esm';
// import fs from 'node:fs/promises';

// const __dirname = dirname(import.meta);
// const packageJsonPath = path.join(__dirname, "..", 'package.json');
// const packageJson = JSON.parse(await fs.readFile(packageJsonPath).then((buffer) => buffer.toString()));

// export interface Options {
//     iconFilter?: IconFilterBuilderOptions;
//     eleventySass?: any;
//     includesDir?: string;
// }

// const removeInitialDotSlash = (str: string) => {
//     if (str.startsWith("./")) {
//         return str.substring(2);
//     }
//     return str;
// };

// const stemifyMenu = (menu: Menu): Menu => {
//     return menu.map((item) => {
//         if (typeof item === "string") {
//             const normalised = item.replace(/\\/g, "/");
//             return removeInitialDotSlash(removeExtension(normalised));
//         }

//         if (item.type === "section") {
//             return {
//                 ...item,
//                 items: stemifyMenu(item.items),
//             };
//         }

//         // Link are not stemified
//         if (item.type === "link") {
//             return item;
//         }

//         throw new Error("Unknown menu item type");
//     });
// };

// const registerBulmaContainer = (mdLib: MdLib, containerName: string) => {
//     const regex = new RegExp(`^${containerName}\\s*({title="(?<title>.*)"})?$`);

//     mdLib.use(markdownItContainer, containerName, {
//         validate: function (params: string) {
//             return params.trim().match(regex);
//         },
//         render: function (tokens: any, idx: any) {
//             var m: RegExpMatchArray | null = tokens[idx].info.trim().match(regex);

//             if (tokens[idx].nesting === 1) {
//                 if (m && m.groups?.title) {
//                     return `<article class="message is-${containerName}">
//     <div class="message-header">
//     <p>${mdLib.utils.escapeHtml(m.groups?.title)}</p>
//     </div>
//     <div class="message-body">`;
//                 } else {
//                     // opening tag
//                     return `<article class="message is-${containerName}"><div class="message-body">`;
//                 }

//             } else {
//                 // closing tag
//                 return '</div>\n</article>\n';
//             }
//         }
//     });
// }


// function configFunction(eleventyConfig: any, options?: Options) {
//     let isFirstBuild = true;

//     try {
//         eleventyConfig.versionCheck(packageJson["11ty"].compatibility)
//     } catch (e: any) {
//         console.error(`Error: Eleventy Plugin (${packageJson.name})

// Compatibility: ${e.message}`);
//         process.exit(1);
//     }

//     // Cache the last modified date of a file
//     // because invoking git log is expensive
//     const gitCreatedCache = new Map<string, Date>();

//     // Cache the last modified date of a file
//     // because invoking git log is expensive
//     const lastModifiedDateCache = new Map<string, Date | null>();

//     // Work around Eleventy bugs/limitations when run via code and not CLI
//     // See: https://github.com/11ty/eleventy/issues/2793
//     eleventyConfig.on("eleventy.before", async (args: any) => {
//         if (isFirstBuild) {
//             isFirstBuild = false;
//             copyIncludesToUserFolder(args);
//             copyAssetsToUserFolder(args);
//         }
//     });

//     eleventyConfig.addGlobalData(
//         "isDevelopment",
//         process.argv.includes("--serve")
//     );

//     eleventyConfig.addGlobalData(
//         "eleventyComputed.sanitizedTitle",
//         eleventyComputed.sanitizedTitle
//     );
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.baseUrl",
//         eleventyComputed.baseUrl
//     );
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.nacaraSectionDir",
//         eleventyComputed.nacaraSectionDir
//     );
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.nacaraSection",
//         eleventyComputed.nacaraSection
//     );
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.page.absolutePath",
//         eleventyComputed.page.absolutePath
//     );
//     eleventyConfig.addGlobalData("gitRoot", globalData.gitRoot);
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.page.gitLastModified",
//         eleventyComputed.page.gitLastModified(lastModifiedDateCache)
//     );
//     eleventyConfig.addGlobalData(
//         "eleventyComputed.page.gitCreated",
//         eleventyComputed.page.gitCreated(gitCreatedCache)
//     );

//     eleventyConfig.addFilter("fav_icon_from_emoji", favIconFromEmojiFilter);
//     eleventyConfig.addFilter("add_base_url_if_no_protocol", addBaseUrlIfNoProtocol);
//     // eleventyConfig.addFilter("format_date_to_utc", formatDateFilter);
//     // eleventyConfig.addFilter("format_datetime_to_utc", formatDateTimeFilter);
//     eleventyConfig.addFilter("format_date", formatDateFilter);
//     eleventyConfig.addAsyncFilter("add_content_hash", addContentHash);
//     eleventyConfig.addFilter("file_to_body_class", fileToBodyClassFilter);
//     eleventyConfig.addFilter("layout_to_body_class", layoutToBodyClassFilter);
//     eleventyConfig.addAsyncFilter(
//         "to_icon",
//         toIconFilterBuilder(options?.iconFilter)
//     );

//     eleventyConfig.addFilter("nacara_menu", menuFilter);
//     eleventyConfig.addAsyncFilter("nacara_changelog", changelogFilter(eleventyConfig));
//     eleventyConfig.addFilter("nacara_breadcrumb", breadcrumbFilter);
//     eleventyConfig.addFilter(
//         "nacara_previous_next_pagination",
//         navigationFilter
//     );

//     // Register the sass plugin as we provide the styles using SCSS
//     eleventyConfig.addPlugin(eleventySass, options?.eleventySass);
//     eleventyConfig.addPlugin(EleventyRenderPlugin);

//     eleventyConfig.addDataExtension(
//         "menu",
//         (contents: string, filePath: string) => {
//             const parsedMenu = JSON.parse(contents);

//             // If this is an object, we assume this is because user
//             // is using an object to include the JSON schema
//             if (typeof parsedMenu === "object" && parsedMenu.items) {
//                 return {
//                     nacaraMenu: stemifyMenu(parsedMenu.items),
//                 };
//             } else {
//                 throw new Error(`Invalid *.menu file. Expected format is:
// {
//     "$schema": "<path to eleventy-layout-nacara>/schemas/menu-schema.json",
//     "items": [
//         ...
//     ]
// }
// `);
//             }
//         }
//     );

//     let baseUrl = "";

//     eleventyConfig.addDataExtension(
//         "nacara",
//         (contents: string, filePath: string) => {
//             const fileName = path.basename(filePath);
//             const parsed = JSON.parse(contents);

//             switch (fileName) {
//                 case "footer.nacara":
//                     return {
//                         nacara: parsed,
//                     };
//                 case "navbar.nacara":
//                     return {
//                         nacara: parsed,
//                     };
//                 case "metadata.nacara":
//                     // Capture baseUrl to forward it to the middleware
//                     baseUrl = parsed.baseUrl;
//                     return {
//                         nacara: parsed,
//                     };
//                 default:
//                     throw new Error(`Unknown nacara file: ${fileName}`);
//             }
//         }
//     );

//     // Add a markdown-it plugin to add anchors to headings
//     // This is used to generate the table of contents
//     eleventyConfig.amendLibrary("md", (mdLib: MdLib) => {
//         // Naive way of checking if the user is using markdown-it
//         if (mdLib.use !== undefined) {
//             // mdLib.use(markdownItAnchor, {
//             //     permalink: markdownItAnchor.permalink.linkInsideHeader({
//             //         placement: "after",
//             //     }),
//             //     slugify: (s: string) => slugify(s)
//             // });

//             registerBulmaContainer(mdLib, "primary");
//             registerBulmaContainer(mdLib, "info");
//             registerBulmaContainer(mdLib, "success");
//             registerBulmaContainer(mdLib, "warning");
//             registerBulmaContainer(mdLib, "danger");
//         }
//     });

//     eleventyConfig.serverOptions.setup = async () => {
//         return {
//             middleware: [
//                 baseUrlRedirect(baseUrl)
//             ],
//         };
//     }

//     eleventyConfig.addPassthroughCopy("assets");
// }

// module.exports = {
//     initArguments: {},
//     configFunction: configFunction,
// };

type Options = any

function configFunction(eleventyConfig: any, options?: Options) {
}

export default {
    initArguments: {},
    configFunction: configFunction,
};
