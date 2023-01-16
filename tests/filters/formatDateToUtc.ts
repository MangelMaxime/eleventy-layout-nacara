import test from "ava";
import formatDateToUtc from "../../src/filters/formatDateToUtc";

test("works for Date based on UTC time", async (t) => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const formattedDate = formatDateToUtc(date);
    t.is(formattedDate, "2020-01-01 00:00:00");
});

test("works for Date based in a zone time", async (t) => {
    const date = new Date("2020-01-01T00:00:00.000+01:00");
    const formattedDate = formatDateToUtc(date);
    t.is(formattedDate, "2019-12-31 23:00:00");
});
