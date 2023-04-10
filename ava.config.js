// Ensure the timezone used by Node.js,
// because we don't know what is the timezone of the user or the CI
// See: https://github.com/avajs/ava/issues/3027
process.env.TZ = "UTC";

/* @type {import('ava').} */
module.exports = {
    extensions: [
        "ts",
        "tsx"
    ],
    require: [
        "ts-node/register"
    ],
    files: [
        "tests/**/*.ts",
        "!**/*.d.ts",
        "!**/_site/**"
    ],
    ignoredByWatcher: [
        "tests/fixtures/**/_includes/nacara/**",
        "tests/fixtures/**/assets/nacara/**",
        "tests/fixtures/temp/**"
    ],
    match: [
        // If you want to focus on a specific test,
        // you can specify some matching rules below
        // Examples:
        // - "*Date*"
        // - "works for Date based in a zone time"
        //
        // IMPORTANT: Remove your rules before commiting
    ]
}
