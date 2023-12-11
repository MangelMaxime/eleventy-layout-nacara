import { expect, test } from "@jest/globals";
import gitLastModified from "../../../src/eleventyComputed/page/gitLastModified";
import globalData from "../../../src/globalData";
import fs from "fs-extra";

test("returns null if the file has not been committed yet", async () => {
    const gitRoot = await globalData.gitRoot();
    const gitCreatedFunc = await gitLastModified(new Map())();

    // Create a temporary file, to mimic a new file created by the user
    // that is not yet committed
    const now = new Date();
    const time = now.getTime();
    const fileName = `./fixtures/temp/gitLastModified-${time}.txt`;
    await fs.remove(fileName);
    await fs.createFile(fileName);

    const absolutePath = await fs.realpath(fileName);

    const gitLastModifiedDate = await gitCreatedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: absolutePath,
        },
    });

    expect(gitLastModifiedDate).toBe(null);

    // Remove temporary file
    await fs.remove(fileName);
});

test("returns null if the file was only commited once", async () => {
    const gitRoot = await globalData.gitRoot();
    const gitLastModifiedFunc = await gitLastModified(new Map())();

    const gitLastModifiedDate = await gitLastModifiedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: "./fixtures/file2.txt",
        },
    });

    expect(gitLastModifiedDate).toBe(null);
});

test("returns a Date if the file was committed twice", async () => {
    const gitRoot = await globalData.gitRoot();
    const gitLastModifiedFunc = await gitLastModified(new Map())();

    const gitLastModifiedDate = await gitLastModifiedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: "./fixtures/file3.txt",
        },
    });

    expect(gitLastModifiedDate).toBeInstanceOf(Date);
    expect(gitLastModifiedDate?.toUTCString()).toBe("Mon, 10 Apr 2023 14:19:47 GMT");
});

test("returns newest Date in the file history if the file was committed more than twice", async () => {
    const gitRoot = await globalData.gitRoot();
    const gitLastModifiedFunc = await gitLastModified(new Map())();

    const gitLastModifiedDate = await gitLastModifiedFunc({
        gitRoot: gitRoot,
        page: {
            absolutePath: "./fixtures/file4.txt",
        },
    });

    expect(gitLastModifiedDate).toBeInstanceOf(Date);
    expect(gitLastModifiedDate?.toUTCString()).toBe("Mon, 10 Apr 2023 14:20:29 GMT");
});
