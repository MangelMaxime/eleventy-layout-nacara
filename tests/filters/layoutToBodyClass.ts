import test from "ava";
import layoutToBodyClass from "../../src/filters/layoutToBodyClass";

test("returns 'layout--' followed by the path to the layout snakified", async (t) => {
    const className = layoutToBodyClass("nacara/layouts/docs.njk");
    t.is(className, "layout--nacara_layouts_docs");
});
