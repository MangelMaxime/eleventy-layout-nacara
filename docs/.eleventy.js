const eleventyLayoutNacara = require("../dist/index.js");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const loadLanguages = require("prismjs/components/");

loadLanguages("fsharp");

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {

    // Add the layout plugin
    eleventyConfig.addPlugin(eleventyLayoutNacara);
    eleventyConfig.addPlugin(syntaxHighlight, {
        init: function ({ Prism }) {
            Prism.languages.fs = Prism.languages.fsharp;
        }
    });

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
