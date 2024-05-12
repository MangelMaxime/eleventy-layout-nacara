// import eleventyLayoutNacara from "../../../dist/index.js";
import { dirname, filename } from 'dirname-filename-esm';
import fs from 'node:fs/promises';

const __dirname = dirname(import.meta);

// When running tests via the programmatic API, we need to provide the absolute path to the input directory
// But testing with eleventy CLI, we need to provide the relative path otherwise
// subscequent runs will generates files from the _site directory
const input = process.env.VITEST_WORKER_ID ? __dirname : ".";

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
export default function (eleventyConfig) {

    // Add the layout plugin
    // eleventyConfig.addPlugin(eleventyLayoutNacara);
    console.log('hello from eleventfdfffyLayoutNacara');

    // Configure Eleventy options to your liking
    return {
        dir: {
            input: input,
            output: "_site",
        },
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
};
