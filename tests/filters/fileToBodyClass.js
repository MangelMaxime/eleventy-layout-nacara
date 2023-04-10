"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const layoutToBodyClass_1 = __importDefault(require("../../src/filters/layoutToBodyClass"));
(0, ava_1.default)("returns 'layout--' followed by the path to the layout snakified", async (t) => {
    const className = (0, layoutToBodyClass_1.default)("nacara/layouts/docs.njk");
    t.is(className, "layout--nacara_layouts_docs");
});
