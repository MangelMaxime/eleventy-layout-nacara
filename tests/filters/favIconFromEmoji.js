"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const favIconFromEmoji_1 = __importDefault(require("../../src/filters/favIconFromEmoji"));
(0, ava_1.default)("returns the correct emoji", (t) => {
    const result = (0, favIconFromEmoji_1.default)("🐶");
    t.is(result, `<link type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%90%B6%3C%2Ftext%3E%3C%2Fsvg%3E" rel="icon" />`);
});
