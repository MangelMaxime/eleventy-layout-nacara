import { expect, test } from 'vitest'
const Eleventy = require("@11ty/eleventy");
import { formatHTML } from "../utils/_formatHTML";

test("categories are rendered in a fixed order", async () => {
    const elev = new Eleventy(
        "./fixtures/changelog-0/",
        "./fixtures/changelog-0/_site",
        {
            configPath: "./fixtures/changelog-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    console.log(formattedResult);

    expect(formattedResult).toBe(`<h1 id="changelog" tabindex="-1">
    Changelog
    <a class="header-anchor" href="#changelog">#</a>
</h1>
<p>All notable changes to this project will be documented in this file.</p>
<p>
    The format is based on
    <a href="https://keepachangelog.com/en/1.0.0/">Keep a Changelog</a>
    , and this project adheres to
    <a href="https://semver.org/spec/v2.0.0.html">Semantic Versioning</a>
    .
</p>
<h2 id="unreleased" tabindex="-1">
    Unreleased
    <a class="header-anchor" href="#unreleased">#</a>
</h2>
<h2 id="1.0.0-beta-001---2021-07-29" tabindex="-1">
    1.0.0-beta-001 - 2021-07-29
    <a class="header-anchor" href="#1.0.0-beta-001---2021-07-29">#</a>
</h2>
<h3 id="deprecated" tabindex="-1">
    Deprecated
    <a class="header-anchor" href="#deprecated">#</a>
</h3>
<h3 id="removed" tabindex="-1">
    Removed
    <a class="header-anchor" href="#removed">#</a>
</h3>
<h3 id="security" tabindex="-1">
    Security
    <a class="header-anchor" href="#security">#</a>
</h3>
<h3 id="changed" tabindex="-1">
    Changed
    <a class="header-anchor" href="#changed">#</a>
</h3>
<h3 id="fixed" tabindex="-1">
    Fixed
    <a class="header-anchor" href="#fixed">#</a>
</h3>
<h3 id="added" tabindex="-1">
    Added
    <a class="header-anchor" href="#added">#</a>
</h3>
`);
});
