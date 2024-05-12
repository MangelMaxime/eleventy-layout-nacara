import { expect, test } from 'vitest'
import Eleventy from "@11ty/eleventy";
import { formatHTML } from "../utils/_formatHTML.js";
import { exec } from 'teen_process';
import fs from "fs/promises";

test("known categories are rendered in a fixed order", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-0/",
        "./tests/fixtures/changelog-0/_site",
        {
            configPath: "./tests/fixtures/changelog-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("unknown categories are rendered in alphabetical order", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-1/",
        "./tests/fixtures/changelog-1/_site",
        {
            configPath: "./tests/fixtures/changelog-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("unknown categories are rendered after known categories", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-2/",
        "./tests/fixtures/changelog-2/_site",
        {
            configPath: "./tests/fixtures/changelog-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("all the versions are rendered", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-3/",
        "./tests/fixtures/changelog-3/_site",
        {
            configPath: "./tests/fixtures/changelog-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("body of a category is rendered convert from markdown to HTML", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-4/",
        "./tests/fixtures/changelog-4/_site",
        {
            configPath: "./tests/fixtures/changelog-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});

test("additional Markdown plugins are supported when rendering the markdown content", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/changelog-5/",
        "./tests/fixtures/changelog-5/_site",
        {
            configPath: "./tests/fixtures/changelog-5/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );

    // const formattedResult = await formatHTML(fileContent);
    const formattedResult = await formatHTML(result.content);

    expect(formattedResult).toMatchSnapshot();
});
