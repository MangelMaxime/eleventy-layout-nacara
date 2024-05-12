import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML.js";
import Eleventy from "@11ty/eleventy";

test("render nothing if footer.nacara is not provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/footer-0/",
        "./tests/fixtures/footer-0/_site",
        {
            configPath: "./tests/fixtures/footer-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot()
});

test("is rendered if only the text is provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/footer-1/",
        "./tests/fixtures/footer-1/_site",
        {
            configPath: "./tests/fixtures/footer-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot()
});

test("is rendered if only copyright is provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/footer-2/",
        "./tests/fixtures/footer-2/_site",
        {
            configPath: "./tests/fixtures/footer-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("is rendered if only the sitemapSections is provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/footer-3/",
        "./tests/fixtures/footer-3/_site",
        {
            configPath: "./tests/fixtures/footer-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("is rendered with all the information provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/footer-4/",
        "./tests/fixtures/footer-4/_site",
        {
            configPath: "./tests/fixtures/footer-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});
