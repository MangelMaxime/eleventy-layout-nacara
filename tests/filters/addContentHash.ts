import test from "ava";
import addContentHash from "../../src/filters/addContentHash";

test("returns the provided path suffixed with the hash of the file content", async (t) => {
    const hashedResult = await addContentHash("fixtures/file1.txt");
    t.is(hashedResult, "fixtures/file1.txt?hash=d9340d0991");
});
