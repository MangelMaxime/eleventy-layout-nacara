import { expect, test } from 'vitest'
import formatDate from "../../src/filters/formatDate";

test("works for Date based on UTC time", async () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const formattedDate = formatDate(date, "YYYY-MM-DD HH:mm:ss");
    expect(formattedDate).toBe("2020-01-01 00:00:00");
});

test("works for Date based in a zone time", async () => {
    const date = new Date("2020-01-01T00:00:00.000+01:00");
    const formattedDate = formatDate(date, "YYYY-MM-DD HH:mm:ss");
    expect(formattedDate).toBe("2019-12-31 23:00:00");
});
