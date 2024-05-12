export default async function nacaraSection() {
    return async (data: any) => {
        // Normalize the path, so we can split using the path separator
        // const normalizedInputPath = path.normalize(data.page.inputPath);
        // Extract all the segments of the path
        // const inputPathSegments = normalizedInputPath.split(path.sep);

        // Use the filePathStem instead of the inputPath
        // because when using the programmatic API + Ava for the tests
        // the inputPath is not what we would expect.
        // This is because the inputPath is relative to where Eleventy is executed
        // and with Ava I can't make the process change the directory.
        //
        // One solution would be:
        // - Use the chdir function
        // - Disable the worker-threads in Ava
        // - Use one file per test
        //
        // I think having to use one file per test is not a great experience
        // so for now, we will use this workaround
        //
        // Additionally benefits of using the filePathStem is that we
        // don't have to deal with path normalization
        const inputPathSegments = data.page.filePathStem
            .substring(1)
            .split("/");

        // Build the section direction, which consist of the root + the first segment of the path
        return inputPathSegments[0];
    }
}
