import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML.js";
import Eleventy from "@11ty/eleventy";

test("returns nothing if there is not nacaraMenu provided", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-0/",
        "./tests/fixtures/navigation-0/_site",
        {
            configPath: "./tests/fixtures/navigation-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("returns the Previous button marked as invisible and the second button normal if this is the first page", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-1/",
        "./tests/fixtures/navigation-1/_site",
        {
            configPath: "./tests/fixtures/navigation-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page1Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page1/"
    );
    const formattedResult = await formatHTML(page1Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("returns the Next button marked as invisible and the first button normal if this is the last page", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-2/",
        "./tests/fixtures/navigation-2/_site",
        {
            configPath: "./tests/fixtures/navigation-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("the Next button include the section title page is inside a section", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-3/",
        "./tests/fixtures/navigation-3/_site",
        {
            configPath: "./tests/fixtures/navigation-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("the Previous button include the section title page is inside a section", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-4/",
        "./tests/fixtures/navigation-4/_site",
        {
            configPath: "./tests/fixtures/navigation-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page1/"
    );
    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("both buttons are present if the page is between 2 valid element in the menu", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-5/",
        "./tests/fixtures/navigation-5/_site",
        {
            configPath: "./tests/fixtures/navigation-5/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("the Next button is empty if the next menu element is a link", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-6/",
        "./tests/fixtures/navigation-6/_site",
        {
            configPath: "./tests/fixtures/navigation-6/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );

    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});

test("the Previous button is empty if the previous menu element is a link", async () => {
    const elev = new Eleventy(
        "./tests/fixtures/navigation-7/",
        "./tests/fixtures/navigation-7/_site",
        {
            configPath: "./tests/fixtures/navigation-7/.eleventy.js",
        }
    );

    const json = await elev.toJSON() as any[];
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const formattedResult = await formatHTML(page2Json.content);

    expect(formattedResult).toMatchSnapshot();
});
