import test from "ava";
import fileToBodyClass from "../../src/filters/fileToBodyClass";

test("returns 'page--' followed by the path to the page snakified", async (t) => {
    const className = fileToBodyClass("nacara/pages/index.njk");
    t.is(className, "page--nacara_pages_index");
});
