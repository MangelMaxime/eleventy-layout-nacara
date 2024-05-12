import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML.js";
import Eleventy from "@11ty/eleventy";

test("minimal navbar is generated if no navbar.nacara data is provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navbar-0/",
        "./tests/fixtures/navbar-0/_site",
        {
            configPath: "./tests/fixtures/navbar-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("supports simple link elements in the start section", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navbar-1/",
        "./tests/fixtures/navbar-1/_site",
        {
            configPath: "./tests/fixtures/navbar-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("pinned simple link elements are always displayed on mobile", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navbar-2/",
        "./tests/fixtures/navbar-2/_site",
        {
            configPath: "./tests/fixtures/navbar-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("navbar endItems are rendered using their icons on desktop only and rendered using their label in the mobile menu", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navbar-3/",
        "./tests/fixtures/navbar-3/_site",
        {
            configPath: "./tests/fixtures/navbar-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});
