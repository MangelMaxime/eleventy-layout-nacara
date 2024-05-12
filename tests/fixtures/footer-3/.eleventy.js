import eleventyLayoutNacara from "../../../dist/index.js";
import { dirname } from 'dirname-filename-esm';

const __dirname = dirname(import.meta);

// When running tests via the programmatic API, we need to provide the absolute path to the input directory
// But testing with eleventy CLI, we need to provide the relative path otherwise
// subscequent runs will generates files from the _site directory
const input = process.env.VITEST_WORKER_ID ? __dirname : ".";

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
export default function (eleventyConfig) {

    // Add the layout plugin
    eleventyConfig.addPlugin(eleventyLayoutNacara);

    // Configure Eleventy options to your liking
    return {
        dir: {
            input: input,
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
};
