"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const Eleventy = require("@11ty/eleventy");
const _formatHTML_1 = require("../utils/_formatHTML");
(0, ava_1.default)("returns nothing if there is no menu", async (t) => {
    const elev = new Eleventy("./fixtures/breadcrumb-0/", "./fixtures/breadcrumb-0/_site", {
        configPath: "./fixtures/breadcrumb-0/.eleventy.js",
    });
    const json = await elev.toJSON();
    t.is(json[0].content, `
`);
});
(0, ava_1.default)("works for one level deep elements", async (t) => {
    const elev = new Eleventy("./fixtures/breadcrumb-1/", "./fixtures/breadcrumb-1/_site", {
        configPath: "./fixtures/breadcrumb-1/.eleventy.js",
    });
    const json = await elev.toJSON();
    const formattedResult = (0, _formatHTML_1.formatHTML)(json[0].content);
    t.is(formattedResult, `<nav class="breadcrumb">
    <ul>
        <li class="is-active"><a>Getting started</a></li>
        <li class="is-active"><a>Page</a></li>
    </ul>
</nav>
`);
});
(0, ava_1.default)("works for multiple level deep elements", async (t) => {
    const elev = new Eleventy("./fixtures/breadcrumb-2/", "./fixtures/breadcrumb-2/_site", {
        configPath: "./fixtures/breadcrumb-2/.eleventy.js",
    });
    const json = await elev.toJSON();
    const formattedResult = (0, _formatHTML_1.formatHTML)(json[0].content);
    t.is(formattedResult, `<nav class="breadcrumb">
    <ul>
        <li class="is-active"><a>Getting started</a></li>
        <li class="is-active"><a>Part 1</a></li>
        <li class="is-active"><a>Part 2</a></li>
        <li class="is-active"><a>Page</a></li>
    </ul>
</nav>
`);
});
