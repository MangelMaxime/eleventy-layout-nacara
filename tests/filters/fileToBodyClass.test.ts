import { expect, test } from "@jest/globals";
import fileToBodyClass from "../../src/filters/fileToBodyClass";

test("returns 'page--' followed by the path to the page snakified", async () => {
    const className = fileToBodyClass("nacara/pages/index.njk");
    expect(className).toBe("page--nacara_pages_index");
});
