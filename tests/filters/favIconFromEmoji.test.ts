import { expect, test } from 'vitest'
import favIconFromEmoji from "../../src/filters/favIconFromEmoji.js";

test("returns the correct emoji", () => {
    const result = favIconFromEmoji("🐶");

   expect(result).toBe(`<link type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%90%B6%3C%2Ftext%3E%3C%2Fsvg%3E" rel="icon" />`);
});
