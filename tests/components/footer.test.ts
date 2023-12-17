import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML";
const Eleventy = require("@11ty/eleventy");

test("render nothing if footer.nacara is not provided", async () => {
    const elev = new Eleventy(
        "./fixtures/footer-0/",
        "./fixtures/footer-0/_site",
        {
            configPath: "./fixtures/footer-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot()
});

test("is rendered if only the text is provided", async () => {
    const elev = new Eleventy(
        "./fixtures/footer-1/",
        "./fixtures/footer-1/_site",
        {
            configPath: "./fixtures/footer-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot()
});

test("is rendered if only copyright is provided", async () => {
    const elev = new Eleventy(
        "./fixtures/footer-2/",
        "./fixtures/footer-2/_site",
        {
            configPath: "./fixtures/footer-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("is rendered if only the sitemapSections is provided", async () => {
    const elev = new Eleventy(
        "./fixtures/footer-3/",
        "./fixtures/footer-3/_site",
        {
            configPath: "./fixtures/footer-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("is rendered with all the information provided", async () => {
    const elev = new Eleventy(
        "./fixtures/footer-4/",
        "./fixtures/footer-4/_site",
        {
            configPath: "./fixtures/footer-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});
