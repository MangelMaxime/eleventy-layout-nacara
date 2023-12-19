---
title: Changelog
layout: nacara/layouts/docs.njk
---

This layouts extends [base layout](docs/layouts/base/) providing a layout for rendering changelogs.

## Usage

```yaml
---
title: Changelog
layout: nacara/layouts/changelog.njk
changelog_path: ./../CHANGELOG.md
---
```

## Configuration

You can configure the layout by adding the following properties to the front-matter of your page:

### `changelog_path`

**Required**

Relative path to the changelog file.

:::info

Remember to add your changelog file to the watch files in your configuration file.

This will allows you to change the orignal changelog file and see the changes on the fly.

```js
/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {
    // ...
    eleventyConfig.addWatchTarget("./../CHANGELOG.md");
    // ...
};
```
