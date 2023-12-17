import { expect, test } from 'vitest'
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../utils/_formatHTML";

test("known categories are rendered in a fixed order", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-0/",
        "./fixtures/changelog-0/_site",
        {
            configPath: "./fixtures/changelog-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toBe(`<ul class="changelog-list">
    <li class="changelog-list-item is-version">
        <a href="#1.0.0-beta-001-2021-07-29">
            <span class="anchor" id="1.0.0-beta-001-2021-07-29"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                1.0.0-beta-001
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            29 July 2021
        </span>
    </li>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-success"
            >
                Added
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Added - Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                Changed
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Changed - Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-warning"
            >
                Deprecated
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Deprecated - Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-danger"
            >
                Removed
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Removed - Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                Fixed
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Fixed - Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                Security
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Security - Item 1</li>
            </ul>
        </li>
    </div>
</ul>
`);

});

test("unknown categories are rendered in alphabetical order", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-1/",
        "./fixtures/changelog-1/_site",
        {
            configPath: "./fixtures/changelog-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toBe(`<ul class="changelog-list">
    <li class="changelog-list-item is-version">
        <a href="#1.0.0-beta-001-2021-07-29">
            <span class="anchor" id="1.0.0-beta-001-2021-07-29"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                1.0.0-beta-001
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            29 July 2021
        </span>
    </li>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                B
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                A
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                Category C
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Item 1</li>
            </ul>
        </li>
    </div>
</ul>
`);

});

test("unknown categories are rendered after known categories", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-2/",
        "./fixtures/changelog-2/_site",
        {
            configPath: "./fixtures/changelog-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toBe(`<ul class="changelog-list">
    <li class="changelog-list-item is-version">
        <a href="#1.0.0-beta-001-2021-07-29">
            <span class="anchor" id="1.0.0-beta-001-2021-07-29"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                1.0.0-beta-001
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            29 July 2021
        </span>
    </li>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-success"
            >
                Added
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Item 1</li>
            </ul>
        </li>
    </div>
    <div>
        <li class="changelog-list-item">
            <span
                class="tag changelog-list-item-category is-medium has-text-weight-bold is-info"
            >
                Category A
            </span>
        </li>
        <li class="changelog-list-item changelog-version-body">
            <ul>
                <li>Item 1</li>
            </ul>
        </li>
    </div>
</ul>
`);
});

test("all the versions are rendered", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-3/",
        "./fixtures/changelog-3/_site",
        {
            configPath: "./fixtures/changelog-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const result =
        json.find(
            (item: any) => item.url === "/docs/changelog/"
        );
    const formattedResult = formatHTML(result.content);

    expect(formattedResult).toBe(`<ul class="changelog-list">
    <li class="changelog-list-item is-version">
        <a href="#2.0.0-2021-07-30">
            <span class="anchor" id="2.0.0-2021-07-30"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                2.0.0
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            30 July 2021
        </span>
    </li>
    <li class="changelog-list-item is-version">
        <a href="#1.1.0-2021-07-28">
            <span class="anchor" id="1.1.0-2021-07-28"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                1.1.0
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            28 July 2021
        </span>
    </li>
    <li class="changelog-list-item is-version">
        <a href="#1.0.0-2021-07-27">
            <span class="anchor" id="1.0.0-2021-07-27"></span>
            <span class="tag is-primary is-large has-text-weight-bold">
                1.0.0
            </span>
        </a>
        <span class="release-date is-uppercase has-text-weight-bold is-size-5">
            27 July 2021
        </span>
    </li>
</ul>
`);
});
