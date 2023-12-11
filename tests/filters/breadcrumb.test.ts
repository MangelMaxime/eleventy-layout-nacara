import { expect, test } from "@jest/globals";
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../utils/_formatHTML";

test("returns nothing if there is no menu", async () => {
    const elev = new Eleventy(
        "./fixtures/breadcrumb-0/",
        "./fixtures/breadcrumb-0/_site",
        {
            configPath: "./fixtures/breadcrumb-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(``);
});

test("works for one level deep elements", async () => {
    const elev = new Eleventy(
        "./fixtures/breadcrumb-1/",
        "./fixtures/breadcrumb-1/_site",
        {
            configPath: "./fixtures/breadcrumb-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav class="breadcrumb">
    <ul>
        <li class="is-active"><a>Getting started</a></li>
        <li class="is-active"><a>Page</a></li>
    </ul>
</nav>
`
    );
});

test("works for multiple level deep elements", async () => {
    const elev = new Eleventy(
        "./fixtures/breadcrumb-2/",
        "./fixtures/breadcrumb-2/_site",
        {
            configPath: "./fixtures/breadcrumb-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav class="breadcrumb">
    <ul>
        <li class="is-active"><a>Getting started</a></li>
        <li class="is-active"><a>Part 1</a></li>
        <li class="is-active"><a>Part 2</a></li>
        <li class="is-active"><a>Page</a></li>
    </ul>
</nav>
`
    );
});