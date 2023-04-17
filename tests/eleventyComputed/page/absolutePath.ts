import test from "ava";
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../../utils/_formatHTML";
import path from "path";

test("returns the absolutePath of the file", async (t) => {
    const elev = new Eleventy("./fixtures/absolute-path-0/", "./fixtures/absolute-path-0/_site", {
        configPath: "./fixtures/absolute-path-0/.eleventy.js",
    });

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    const expected = path.resolve("./fixtures/absolute-path-0/docs/getting-started/page1.md");

    t.is(
        formattedResult.trim(), // Remove the trailing newline
        expected
    );
});
