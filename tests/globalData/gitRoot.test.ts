import { expect, test } from 'vitest'
import globalData from "../../src/globalData";

test("should returns a non empty string", async () => {
    const gitRoot = await globalData.gitRoot();

    // Simply check that the returned value is not empty
    // We cannot check for a specific value, because the path
    // will be different on each machine
    expect(gitRoot).not.toBe("");
});
