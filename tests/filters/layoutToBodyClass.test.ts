import { expect, test } from "@jest/globals";
import layoutToBodyClass from "../../src/filters/layoutToBodyClass";

test("returns 'layout--' followed by the path to the layout snakified", async () => {
    const className = layoutToBodyClass("nacara/layouts/docs.njk");
    expect(className).toBe("layout--nacara_layouts_docs");
});
