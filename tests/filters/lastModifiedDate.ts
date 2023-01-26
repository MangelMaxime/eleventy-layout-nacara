import test from "ava";
import lastModifiedDateFilter from "../../src/filters/lastModifiedDate";
import fs from "fs-extra";

test("returns the last modified date of a file based on the Git history", async (t) => {
    const lastModifiedDate = await lastModifiedDateFilter(
        "./fixtures/file1.txt"
    );
    t.is(lastModifiedDate instanceof Date, true);
    t.is(lastModifiedDate.toUTCString(), "Tue, 27 Dec 2022 09:51:08 GMT");
});

test("throws an error if the file doesn't exist on the disk", async (t) => {
    // const lastModifiedDate = await lastModifiedDateFilter("./fixtures/file2.txt");
    const error = await t.throwsAsync(
        async () => {
            await lastModifiedDateFilter("./fixtures/file2.txt");
        },
        { instanceOf: Error }
    );

    t.is(
        error?.message,
        `Error while trying to get the last modified date of ./fixtures/file2.txt.
Original error: Command failed: git --no-pager log -1 --format=%cd ./fixtures/file2.txt
fatal: ambiguous argument './fixtures/file2.txt': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
`
    );
});

test("returns now if the file is not yet committed", async (t) => {
    // Create a temporary file, to mimic a new file created by the user
    // that is not yet committed
    const now = new Date();
    const time = now.getTime();
    const fileName = `./fixtures/temp/${time}.txt`;
    await fs.remove(fileName);
    await fs.createFile(fileName);
    const lastModifiedDate = await lastModifiedDateFilter(
        fileName
    );
    t.is(lastModifiedDate instanceof Date, true);
    t.is(lastModifiedDate.toUTCString(), new Date().toUTCString());

    // Remove temporary file
    await fs.remove(fileName);
});
