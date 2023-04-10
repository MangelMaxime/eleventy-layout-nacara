"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const formatDate_1 = __importDefault(require("../../src/filters/formatDate"));
(0, ava_1.default)("works for Date based on UTC time", async (t) => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const formattedDate = (0, formatDate_1.default)(date, "YYYY-MM-DD HH:mm:ss");
    t.is(formattedDate, "2020-01-01 00:00:00");
});
(0, ava_1.default)("works for Date based in a zone time", async (t) => {
    const date = new Date("2020-01-01T00:00:00.000+01:00");
    const formattedDate = (0, formatDate_1.default)(date, "YYYY-MM-DD HH:mm:ss");
    t.is(formattedDate, "2019-12-31 23:00:00");
});
