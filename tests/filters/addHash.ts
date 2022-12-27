import test from "ava";
import addHash from "../../src/filters/addContentHash";

test("addHash returns the provided path suffixed with the hash of the file content", async (t) => {
    const hashedResult = await addHash("tests/fixtures/file1.txt");
    t.is(hashedResult, "tests/fixtures/file1.txt?hash=d9340d0991");
});
