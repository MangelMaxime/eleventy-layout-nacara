---
title: Quickstart
layout: nacara/layouts/docs.njk
---

<ul class="textual-steps">

<li>

Install `eleventy-layout-nacara`

```bash
npm install eleventy-layout-nacara
```

</li>

<li>

Register the plugin in your `.eleventy.js` file

```js
const eleventyLayoutNacara = require("@mangelmaxime/eleventy-layout-nacara");

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {

    // ...

    eleventyConfig.addPlugin(eleventyLayoutNacara);

    // ...

};
```

</li>

<li>

In your Data folder, you need to at least the `nacaraMetadata` file

```js
{
    "$schema": "./../../schemas/metadata-schema.json",
    "url": "https://my-site.github.io",
    "editUrl": "https://github.com/Kaladin/my-site/edit/master/docsrc",
    "baseUrl": "/my-site/",
    "title": "My website",
    "description": "",
    "author": {
        "name": "Kaladin",
        "twitter": "KaladinStormblessed",
    }
}
```

:::info
Don't forget to adapt the differents properties to your needs.
:::

</li>

<li>

You can now use `nacara` features in your pages.

For example, you can create a standard documentation page by using `nacara/layouts/docs.njk`

```md
---
title: Docs
layout: nacara/layouts/docs.njk
---

This is my first page
```

</li>

</ul>
