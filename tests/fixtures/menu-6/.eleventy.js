const eleventyLayoutNacara = require("../../../dist/index.js");

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {

    // Add the layout plugin
    eleventyConfig.addPlugin(eleventyLayoutNacara);

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
