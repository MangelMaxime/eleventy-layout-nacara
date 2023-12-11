import { expect, test } from "@jest/globals";
import addContentHash from "../../src/filters/addContentHash";

test("returns the provided path suffixed with the hash of the file content", async () => {
    const hashedResult = await addContentHash("fixtures/file1.txt");
    expect(hashedResult).toBe("fixtures/file1.txt?hash=d9340d0991");
});
