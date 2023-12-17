import { expect, test } from 'vitest'
import { lex } from "../../src/changelog-parser/lexer";

test("captures title ", () => {
    const lines = [
        "# Title",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "title",
            text: "Title",
        }
    ]);
});

test("captures raw text", () => {
    const lines = [
        "Line 1",
        "Line 2",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "markdown-text",
            text: "Line 1",
        },
        {
            kind: "markdown-text",
            text: "Line 2",
        },
    ]);
});

test("captures Unrelesaed version", () => {
    const lines = [
        "## Unreleased",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "version",
            text: "Unreleased",
            version: undefined,
            date: undefined,
            isYanked: false,
        },
    ]);
})

test("captures version with date", () => {
    const lines = [
        "## 1.0.0 - 2020-01-01",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "version",
            text: "1.0.0 - 2020-01-01",
            version: "1.0.0",
            date: "2020-01-01",
            isYanked: false,
        },
    ]);
})

test("captures without date", () => {
    const lines = [
        "## 1.0.0",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "version",
            text: "1.0.0",
            version: "1.0.0",
            date: undefined,
            isYanked: false,
        },
    ]);
})

test("captures yanked version", () => {
    const lines = [
        "## 1.0.0 - 2020-01-01 [YANKED]",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "version",
            text: "1.0.0 - 2020-01-01 [YANKED]",
            version: "1.0.0",
            date: "2020-01-01",
            isYanked: true,
        },
    ]);
})

test("captures category", () => {
    const lines = [
        "### Added",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "category",
            text: "Added",
        },
    ]);
})

test("captures list item marked with a -", () => {
    const lines = [
        "- This is a list item",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "markdown-text",
            text: "- This is a list item",
        },
    ]);
})

test("captures list item marked with a *", () => {
    const lines = [
        "* This is a list item",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "markdown-text",
            text: "* This is a list item",
        },
    ]);
})

test("works for a full changelog", () => {
    const lines = [
        "# Changelog",
        "All notable changes to this project will be documented in this file.",
        "",
        "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),",
        "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).",
        "",
        "## Unreleased",
        "## 1.0.0 - 2020-01-01",
        "### Added",
        "- This is a list item",
        "",
        "### Changed",
        "- This is a list item",
        "",
        "   This a block of text under the previous list item",
    ];

    const tokens = lex(lines);

    expect(tokens).toStrictEqual([
        {
            kind: "title",
            text: "Changelog",
        },
        {
            kind: "markdown-text",
            text: "All notable changes to this project will be documented in this file.",
        },
        {
            kind: "markdown-text",
            text: "",
        },
        {
            kind: "markdown-text",
            text: "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),",
        },
        {
            kind: "markdown-text",
            text: "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).",
        },
        {
            kind: "markdown-text",
            text: "",
        },
        {
            kind: "version",
            text: "Unreleased",
            version: undefined,
            date: undefined,
            isYanked: false,
        },
        {
            kind: "version",
            text: "1.0.0 - 2020-01-01",
            version: "1.0.0",
            date: "2020-01-01",
            isYanked: false,
        },
        {
            kind: "category",
            text: "Added",
        },
        {
            kind: "markdown-text",
            text: "- This is a list item",
        },
        {
            kind: "markdown-text",
            text: "",
        },
        {
            kind: "category",
            text: "Changed",
        },
        {
            kind: "markdown-text",
            text: "- This is a list item",
        },
        {
            kind: "markdown-text",
            text: "",
        },
        {
            kind: "markdown-text",
            text: "   This a block of text under the previous list item",
        },
    ]);
})
