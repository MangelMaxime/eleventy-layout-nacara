import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML.js";
import Eleventy from "@11ty/eleventy";

test("returns nothing if there is not nacaraMenu provided", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-0/", "./tests/fixtures/menu-0/_site", {
        configPath: "./tests/fixtures/menu-0/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("supports nacaraMenu with a Section", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-1/", "./tests/fixtures/menu-1/_site", {
        configPath: "./tests/fixtures/menu-1/.eleventy.js",
    });

    const json = await elev.toJSON() as any [];
    const page1Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page1/"
    );
    const page1FormattedResult = await formatHTML(page1Json.content);
    const page2Json = json.find(
        (item: any) => item.url === "/docs/getting-started/page2/"
    );
    const page2FormattedResult = await formatHTML(page2Json.content);

    expect(page1FormattedResult).toMatchSnapshot();
    expect(page2FormattedResult).toMatchSnapshot();
});

// Disabled because it pollutes the console output too much...
// I don't understand why I can make it work using normal expect / toThrow API
// test("crash if the menu contains nested sections", async () => {
//     const elev = new Eleventy("./tests/fixtures/menu-2/", "./tests/fixtures/menu-2/_site", {
//         configPath: "./tests/fixtures/menu-2/.eleventy.js",
//     });
//     try {
//         await elev.toJSON() as any[];
//     } catch (e: any) {
//         expect(e.originalError.message).toContain(`(./fixtures/menu-2/_includes/menu.njk)
//   Nested sections are not supported by eleventy-layout-nacara`)
//     }
// });

test("returns a menu with a TOC containing only h2 headers if no toc data is provided", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-3/", "./tests/fixtures/menu-3/_site", {
        configPath: "./tests/fixtures/menu-3/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("returns a menu with a TOC containing headers respecting the provided toc config", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-4/", "./tests/fixtures/menu-4/_site", {
        configPath: "./tests/fixtures/menu-4/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("returns a menu with no TOC if it has been disabled via the config", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-5/", "./tests/fixtures/menu-5/_site", {
        configPath: "./tests/fixtures/menu-5/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("works with a global data permalink", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-6/", "./tests/fixtures/menu-6/_site", {
        configPath: "./tests/fixtures/menu-6/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});

test("works with a directory data permalink", async () => {
    const elev = new Eleventy("./tests/fixtures/menu-7/", "./tests/fixtures/menu-7/_site", {
        configPath: "./tests/fixtures/menu-7/.eleventy.js",
    });

    const json = await elev.toJSON() as any[];
    const formattedResult = await formatHTML(json[0].content);

    expect(formattedResult).toMatchSnapshot();
});
