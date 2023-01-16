import test from "ava";
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../utils/_formatHTML";

test("returns nothing if there are no menu", async (t) => {
    const elev = new Eleventy("./breadcrumb-0/", "./breadcrumb-0/_site", {
        configPath: "./breadcrumb-0/.eleventy.js",
    });

    const json = await elev.toJSON();

    t.is(
        `
`,
        json[0].content
    );
});

test("works for one level deep elements", async (t) => {
    const elev = new Eleventy("./breadcrumb-1/", "./breadcrumb-1/_site", {
        configPath: "./breadcrumb-1/.eleventy.js",
    });

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        `<nav class="breadcrumb">
    <ul>
        <li class="is-active"><a>Getting started</a></li>
        <li class="is-active"><a>Page</a></li>
    </ul>
</nav>
`
    );
});
