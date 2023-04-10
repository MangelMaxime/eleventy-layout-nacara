import test from "ava";
import globalData from "../../src/globalData";

test("should returns a non empty string", async (t) => {
    const gitRoot = await globalData.gitRoot();

    // Simply check that the returned value is not empty
    t.not(gitRoot, "");
});
