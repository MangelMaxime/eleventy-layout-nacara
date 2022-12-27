"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const addContentHash_1 = __importDefault(require("../../src/filters/addContentHash"));
(0, ava_1.default)("addHash returns the provided path suffixed with the hash of the file content", async (t) => {
    const hashedResult = await (0, addContentHash_1.default)("tests/fixtures/file1.txt");
    t.is(hashedResult, "tests/fixtures/file1.txt?hash=d9340d0991");
});
