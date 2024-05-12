import { expect, test } from 'vitest'
import Eleventy from "@11ty/eleventy";

import { formatHTML } from "../../utils/_formatHTML.js";
import path from "path";

test("returns the absolutePath of the file", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/absolute-path-0/",
        "./tests/fixtures/absolute-path-0/_site",
        {
            configPath: "./tests/fixtures/absolute-path-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    const expected = path.resolve(
        "./tests/fixtures/absolute-path-0/docs/getting-started/page1.md"
    );

    expect(formattedResult.trim().replace(/&#92;/g, "\\")).toBe(expected);
});
