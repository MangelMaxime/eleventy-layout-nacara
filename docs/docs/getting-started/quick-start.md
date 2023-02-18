---
title: Quickstart
layout: nacara/layouts/docs.njk
---

<ul class="textual-steps">

<li>

Install `eleventy-layout-nacara`

```
npm install eleventy-layout-nacara
```

</li>

<li>

Register the plugin in your `.eleventy.js` file

```js
const eleventyLayoutNacara = require("../dist/index.js");

/** @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig */
module.exports = function (eleventyConfig) {

    // ...

    eleventyConfig.addPlugin(eleventyLayoutNacara);

    // ...

};
```

</li>

</ul>
