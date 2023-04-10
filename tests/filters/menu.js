"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const _formatHTML_1 = require("../utils/_formatHTML");
const Eleventy = require("@11ty/eleventy");
(0, ava_1.default)("returns nothing if there is not nacaraMenu provided", async (t) => {
    const elev = new Eleventy("./fixtures/menu-0/", "./fixtures/menu-0/_site", {
        configPath: "./fixtures/menu-0/.eleventy.js",
    });
    const json = await elev.toJSON();
    t.is(json[0].content, `
`);
});
(0, ava_1.default)("supports nacaraMenu with a Section", async (t) => {
    const elev = new Eleventy("./fixtures/menu-1/", "./fixtures/menu-1/_site", {
        configPath: "./fixtures/menu-1/.eleventy.js",
    });
    const json = await elev.toJSON();
    const page1Json = json.find((item) => item.url === "/docs/getting-started/page1/");
    const page1FormattedResult = (0, _formatHTML_1.formatHTML)(page1Json.content);
    const page2Json = json.find((item) => item.url === "/docs/getting-started/page2/");
    const page2FormattedResult = (0, _formatHTML_1.formatHTML)(page2Json.content);
    t.is(page1FormattedResult, `<div class="menu-container">
    <aside class="menu">
        <p class="menu-label">Getting started</p>
        <ul class="menu-list">
            <li>
                <a
                    href="/Nacara//docs/getting-started/page1/"
                    class="is-active"
                >
                    Page 1
                </a>
            </li>
            <li>
                <a href="/Nacara//docs/getting-started/page2/" class="">
                    Page 2
                </a>
            </li>
        </ul>
    </aside>
</div>
`);
    t.is(page2FormattedResult, `<div class="menu-container">
    <aside class="menu">
        <p class="menu-label">Getting started</p>
        <ul class="menu-list">
            <li>
                <a href="/Nacara//docs/getting-started/page1/" class="">
                    Page 1
                </a>
            </li>
            <li>
                <a
                    href="/Nacara//docs/getting-started/page2/"
                    class="is-active"
                >
                    Page 2
                </a>
            </li>
        </ul>
    </aside>
</div>
`);
});
(0, ava_1.default)("crash if the menu contains nested sections", async (t) => {
    const elev = new Eleventy("./fixtures/menu-2/", "./fixtures/menu-2/_site", {
        configPath: "./fixtures/menu-2/.eleventy.js",
    });
    const error = await t.throwsAsync(async () => {
        await elev.toJSON();
    });
    t.is(
    // @ts-ignore
    error?.originalError?.message, `(./fixtures/menu-2/_includes/menu.njk)
  Nested sections are not supported yet by the menu of eleventy-layout-nacara`);
});
