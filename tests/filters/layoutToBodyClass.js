"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const fileToBodyClass_1 = __importDefault(require("../../src/filters/fileToBodyClass"));
(0, ava_1.default)("returns 'page--' followed by the path to the page snakified", async (t) => {
    const className = (0, fileToBodyClass_1.default)("nacara/pages/index.njk");
    t.is(className, "page--nacara_pages_index");
});
