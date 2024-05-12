import { expect, test } from 'vitest';
import Eleventy from "@11ty/eleventy";

test('minimal', async () => {
    console.log(process.cwd())
    const elev = new Eleventy(
        "./tests/fixtures/_minimal/",
        "./tests/fixtures/_minimal/_site",
        {
            configPath: "./tests/fixtures/_minimal/.eleventy.js"
        }
    );

    console.log(Eleventy.getVersion())

    const json = await elev.toJSON();

    console.log(json);

    expect(1).toBe(1)

})
