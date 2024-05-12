import { expect, test } from 'vitest'
import { parse } from "../../src/changelog-parser/parser.js";
import type { Changelog } from "../../src/changelog-parser/parser.js";

test("parses title", () => {
    const text = `# Title`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: "Title",
        versions: [],
        description: undefined,
    });
});

test("parses description", () => {
    const text = `This line is a description

And this one too`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        versions: [],
        description: `This line is a description

And this one too`,
    });
});

test("parses version", () => {
    const text = `## 1.0.0 - 2020-01-01`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
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

test("parses version without date", () => {
    const text = `## 1.0.0`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
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

test("parses version without date and yanked", () => {
    const text = `## 1.0.0 [YANKED]`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
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

test("parses version with date and yanked", () => {
    const text = `## 1.0.0 - 2020-01-01 [YANKED]`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
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

test("throw an exception if a category is not inside a version", () => {
    const text = `### Added`;

    expect(() => parse(text))
        .toThrowError(`Error while parsing the following item:
---
Added
---

Category should always be inside a version

Example:

## 1.0.0

### Added`);
});

test("parses a Added category", () => {
    const text = `## 1.0.0

### Added

- Added a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "added" },
                        `
- Added a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Changed category", () => {
    const text = `## 1.0.0

### Changed

- Changed a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "changed" },
                        `
- Changed a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Deprecated category", () => {
    const text = `## 1.0.0

### Deprecated

- Deprecated a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "deprecated" },
                        `
- Deprecated a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Removed category", () => {
    const text = `## 1.0.0

### Removed

- Removed a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "removed" },
                        `
- Removed a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Fixed category", () => {
    const text = `## 1.0.0

### Fixed

- Fixed a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "fixed" },
                        `
- Fixed a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Security category", () => {
    const text = `## 1.0.0

### Security

- Security a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "security" },
                        `
- Security a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a Unknown category", () => {
    const text = `## 1.0.0

### Unknown1

- Unknown a new feature`;

    const changelog = parse(text);

    expect(changelog).toStrictEqual({
        title: undefined,
        description: undefined,
        versions: [
            {
                title: "1.0.0",
                version: "1.0.0",
                categories: new Map([
                    [
                        { kind: "unknown", name: "Unknown1" },
                        `
- Unknown a new feature`,
                    ],
                ]),
                date: undefined,
                isYanked: false,
            },
        ],
    });
});

test("parses a complex changelog", () => {
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

    expect(changelog).toStrictEqual({
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
                        `
* New feature`,
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
                        `
* New feature with additional text below

    This is the additional line n°1
    This is the additional line n°2

    This is the additional line n°3`,
                    ],
                ]),
                date: "2022-03-25",
                isYanked: false,
            },
        ],
    });
});
