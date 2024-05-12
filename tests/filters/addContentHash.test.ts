import { expect, test } from 'vitest'
import addContentHash from "../../src/filters/addContentHash.js";

test("returns the provided path suffixed with the hash of the file content", async () => {
    const hashedResult = await addContentHash("tests/fixtures/file1.txt");
    expect(hashedResult).toBe("tests/fixtures/file1.txt?hash=d9340d0991");
});
