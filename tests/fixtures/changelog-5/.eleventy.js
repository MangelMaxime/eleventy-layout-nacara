const eleventyLayoutNacara = require("../../../dist/index.js");
const markdownItContainer = require("markdown-it-container");

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {
    // Add the layout plugin
    eleventyConfig.addPlugin(eleventyLayoutNacara);

    eleventyConfig.amendLibrary("md", mdLib => {
        mdLib.use(markdownItContainer, "warning");
    });

    eleventyConfig.ignores.add("./CHANGELOG.md")

    // Configure Eleventy options to your liking
    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
};
