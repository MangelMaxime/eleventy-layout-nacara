// Ensure the timezone used by Node.js,
// because we don't know what is the timezone of the user or the CI
// See: https://github.com/avajs/ava/issues/3027
process.env.TZ = "UTC";

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    testPathIgnorePatterns: [
        "./fixtures/"
    ],
    watchPathIgnorePatterns: [
        "./fixtures/"
    ],
    globalSetup: "./utils/globalSetup.js"
};
