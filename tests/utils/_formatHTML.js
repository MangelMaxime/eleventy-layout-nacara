"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHTML = void 0;
const prettier_1 = __importDefault(require("prettier"));
function formatHTML(html) {
    return prettier_1.default.format(html, {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
        tabWidth: 4,
    });
}
exports.formatHTML = formatHTML;
