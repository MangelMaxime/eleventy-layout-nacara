import { expect, test } from 'vitest'
import layoutToBodyClass from "../../src/filters/layoutToBodyClass.js";

test("returns 'layout--' followed by the path to the layout snakified", async () => {
    const className = layoutToBodyClass("nacara/layouts/docs.njk");
    expect(className).toBe("layout--nacara_layouts_docs");
});
