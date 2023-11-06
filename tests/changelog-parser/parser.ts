import test from "ava";
import { parse } from "../../src/changelog-parser/parser";
import type { Changelog } from "../../src/changelog-parser/parser";

test("parses title", (t) => {
    const text = `# Title`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: "Title",
        versions: [],
        description: undefined,
    });
});

test("parses description", (t) => {
    const text = `This line is a description

And this one too`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: undefined,
        versions: [],
        description: `This line is a description

And this one too`,
    });
});

test("parses version", (t) => {
    const text = `## 1.0.0 - 2020-01-01`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0 - 2020-01-01",
                version: "1.0.0",
                categories: new Map(),
                date: "2020-01-01",
                isYanked: false,
            },
        ],
    });
});

test("parses version without date", (t) => {
    const text = `## 1.0.0`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map(),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses version without date and yanked", (t) => {
    const text = `## 1.0.0 [YANKED]`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0 [YANKED]",
                version: "1.0.0",
                categories: new Map(),
                date: undefined,
                isYanked: true,
            },
        ],
    });
});

test("parses version with date and yanked", (t) => {
    const text = `## 1.0.0 - 2020-01-01 [YANKED]`;

    const changelog = parse(text);

    t.deepEqual(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0 - 2020-01-01 [YANKED]",
                version: "1.0.0",
                categories: new Map(),
                date: "2020-01-01",
                isYanked: true,
            },
        ],
    });
});

test("throw an exception if a category is not inside a version", (t) => {
    const text = `### Added`;

    const error = t.throws(() => parse(text));

    t.is(
        error?.message,
        `Error while parsing the following item:
---
Added
---

Category should always be inside a version

Example:

## 1.0.0

### Added`
    );
});

test("throw an exception if list-item is not inside a category", (t) => {
    const text = `- List item`;

    const error = t.throws(() => parse(text));

    t.is(
        error?.message,
        `Error while parsing the following item:
---
List item
---

List item should always be inside a category

Example:

## 1.0.0

### Added

- Added a new feature`
    );
});

test("parses a Added category", (t) => {
    const text = `## 1.0.0

### Added

- Added a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "added" },
                        [
                            {
                                kind: "list-item",
                                text: "Added a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Changed category", (t) => {
    const text = `## 1.0.0

### Changed

- Changed a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "changed" },
                        [
                            {
                                kind: "list-item",
                                text: "Changed a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Deprecated category", (t) => {
    const text = `## 1.0.0

### Deprecated

- Deprecated a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "deprecated" },
                        [
                            {
                                kind: "list-item",
                                text: "Deprecated a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Removed category", (t) => {
    const text = `## 1.0.0

### Removed

- Removed a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "removed" },
                        [
                            {
                                kind: "list-item",
                                text: "Removed a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Fixed category", (t) => {
    const text = `## 1.0.0

### Fixed

- Fixed a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "fixed" },
                        [
                            {
                                kind: "list-item",
                                text: "Fixed a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Security category", (t) => {
    const text = `## 1.0.0

### Security

- Security a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "security" },
                        [
                            {
                                kind: "list-item",
                                text: "Security a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Unknown category", (t) => {
    const text = `## 1.0.0

### Unknown1

- Unknown a new feature`;

    const changelog = parse(text);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "unknown", name: "Unknown1" },
                        [
                            {
                                kind: "list-item",
                                text: "Unknown a new feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a complex changelog", (t) => {
    const text = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

* New feature

## 1.6.0 - 2022-03-25

### Added

* New feature with additional text below

    This is the additional line n°1
    This is the additional line n°2

    This is the additional line n°3
`;

    const changelog = parse(text);

    console.log(changelog.versions[1].categories);

    t.deepEqual<Changelog, Changelog>(changelog, {
        title: "Changelog",
        description: `All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).`,
        versions: [
            {
                title: "Unreleased",
                version: undefined,
                categories: new Map([
                    [
                        { kind: "added" },
                        [
                            {
                                kind: "list-item",
                                text: "New feature",
                            },
                        ],
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
            {
                title: "1.6.0 - 2022-03-25",
                version: "1.6.0",
                categories: new Map([
                    [
                        { kind: "added" },
                        [
                            {
                                kind: "list-item",
                                text: "New feature with additional text below",
                            },
                            {
                                kind: "text",
                                text: `This is the additional line n°1
    This is the additional line n°2

    This is the additional line n°3`,
                            }
                        ],
                    ],
                ]),
                date: "2022-03-25",
                isYanked: false,
            },
        ],
    });
});
