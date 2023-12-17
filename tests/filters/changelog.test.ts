import { expect, test } from 'vitest'
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../utils/_formatHTML";

test("known categories are rendered in a fixed order", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-0/",
        "./fixtures/changelog-0/_site",
        {
            configPath: "./fixtures/changelog-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("unknown categories are rendered in alphabetical order", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-1/",
        "./fixtures/changelog-1/_site",
        {
            configPath: "./fixtures/changelog-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("unknown categories are rendered after known categories", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-2/",
        "./fixtures/changelog-2/_site",
        {
            configPath: "./fixtures/changelog-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("all the versions are rendered", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-3/",
        "./fixtures/changelog-3/_site",
        {
            configPath: "./fixtures/changelog-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("body of a category is rendered convert from markdown to HTML", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-4/",
        "./fixtures/changelog-4/_site",
        {
            configPath: "./fixtures/changelog-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});
