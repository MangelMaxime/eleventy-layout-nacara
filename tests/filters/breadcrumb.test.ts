import { expect, test } from 'vitest'
import Eleventy from "@11ty/eleventy";
import { formatHTML } from "../utils/_formatHTML.js";

test("returns nothing if there is no menu", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/breadcrumb-0/",
        "./tests/fixtures/breadcrumb-0/_site",
        {
            configPath: "./tests/fixtures/breadcrumb-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("works for one level deep elements", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/breadcrumb-1/",
        "./tests/fixtures/breadcrumb-1/_site",
        {
            configPath: "./tests/fixtures/breadcrumb-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("works for multiple level deep elements", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/breadcrumb-2/",
        "./tests/fixtures/breadcrumb-2/_site",
        {
            configPath: "./tests/fixtures/breadcrumb-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});
