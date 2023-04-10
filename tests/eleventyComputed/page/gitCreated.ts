import test from "ava";
import gitCreated from "../../../src/eleventyComputed/page/gitCreated";
import fs from "fs-extra";
import globalData from "../../../src/globalData";

test("returns now if the file has not been committed yet", async (t) => {
    const gitRoot = await globalData.gitRoot();
    const gitCreatedFunc = await gitCreated(new Map())();

    // Create a temporary file, to mimic a new file created by the user
    // that is not yet committed
    const now = new Date();
    const time = now.getTime();
    const fileName = `./fixtures/temp/gitCreated-${time}.txt`;
    await fs.remove(fileName);
    await fs.createFile(fileName);

    const absolutePath = await fs.realpath(fileName);

    const gitCreatedDate = await gitCreatedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: absolutePath,
        },
    });

    t.is(gitCreatedDate instanceof Date, true);
    t.is(gitCreatedDate.toUTCString(), new Date().toUTCString());

    // Remove temporary file
    await fs.remove(fileName);
});

test("returns the created date of a file based on the Git history", async (t) => {
    const gitRoot = await globalData.gitRoot();
    const gitCreatedFunc = await gitCreated(new Map())();

    const gitCreatedDate = await gitCreatedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: "./fixtures/file1.txt",
        },
    });

    t.is(gitCreatedDate instanceof Date, true);
    t.is(gitCreatedDate.toUTCString(), "Tue, 27 Dec 2022 09:51:08 GMT");
});
