import { expect, test } from "@jest/globals";
import { formatHTML } from "../utils/_formatHTML";
const Eleventy = require("@11ty/eleventy");

test("returns nothing if there is not nacaraMenu provided", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-0/",
        "./fixtures/navigation-0/_site",
        {
            configPath: "./fixtures/navigation-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(``);
});

test("returns the Previous button marked as invisible and the second button normal if this is the first page", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-1/",
        "./fixtures/navigation-1/_site",
        {
            configPath: "./fixtures/navigation-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page1Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page1/"
    );
    const formattedResult = formatHTML(page1Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a class="button navigate-to-previous is-invisible"></a>
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-next"
        href="/Nacara//docs/getting-started/page2/"
    >
        <span class="is-hidden-mobile">
            <em></em>
            <strong>Page 2</strong>
        </span>
        <i>→</i>
    </a>
</div>
`
    );
});

test("returns the Next button marked as invisible and the first button normal if this is the last page", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-2/",
        "./fixtures/navigation-2/_site",
        {
            configPath: "./fixtures/navigation-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-prev"
        href="/Nacara//docs/getting-started/page1/"
    >
        <i>←</i>
        <span class="is-hidden-mobile">
            <em></em>
            <strong>Page 1</strong>
        </span>
    </a>
    <a class="button navigate-to-next is-invisible"></a>
</div>
`
    );
});

test("the Next button include the section title page is inside a section", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-3/",
        "./fixtures/navigation-3/_site",
        {
            configPath: "./fixtures/navigation-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-prev"
        href="/Nacara//docs/getting-started/page1/"
    >
        <i>←</i>
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 1</strong>
        </span>
    </a>
    <a class="button navigate-to-next is-invisible"></a>
</div>
`
    );
});

test("the Previous button include the section title page is inside a section", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-4/",
        "./fixtures/navigation-4/_site",
        {
            configPath: "./fixtures/navigation-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page1/"
    );
    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a class="button navigate-to-previous is-invisible"></a>
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-next"
        href="/Nacara//docs/getting-started/page2/"
    >
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 2</strong>
        </span>
        <i>→</i>
    </a>
</div>
`
    );
});

test("both buttons are present if the page is between 2 valid element in the menu", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-5/",
        "./fixtures/navigation-5/_site",
        {
            configPath: "./fixtures/navigation-5/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-prev"
        href="/Nacara//docs/getting-started/page1/"
    >
        <i>←</i>
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 1</strong>
        </span>
    </a>
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-next"
        href="/Nacara//docs/getting-started/page3/"
    >
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 3</strong>
        </span>
        <i>→</i>
    </a>
</div>
`
    );
});

test("the Next button is empty if the next menu element is a link", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-6/",
        "./fixtures/navigation-6/_site",
        {
            configPath: "./fixtures/navigation-6/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );

    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-prev"
        href="/Nacara//docs/getting-started/page1/"
    >
        <i>←</i>
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 1</strong>
        </span>
    </a>
    <a class="button navigate-to-next is-invisible"></a>
</div>
`
    );
});

test("the Previous button is empty if the previous menu element is a link", async () => {
    const elev = new Eleventy(
        "./fixtures/navigation-7/",
        "./fixtures/navigation-7/_site",
        {
            configPath: "./fixtures/navigation-7/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = formatHTML(page2Json.content);

    expect(formattedResult).toBe(
        `<div class="section bd-docs-pagination bd-pagination-links">
    <a class="button navigate-to-previous is-invisible"></a>
    <a
        class="button bd-fat-button is-primary is-light bd-pagination-next"
        href="/Nacara//docs/getting-started/page3/"
    >
        <span class="is-hidden-mobile">
            <em>Getting Started</em>
            <strong>Page 3</strong>
        </span>
        <i>→</i>
    </a>
</div>
`
    );
});
