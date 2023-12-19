---
title: Copy button
layout: nacara/layouts/docs.njk
---

By default, all the code blocks have a "Copy" button associated to them.

If needed, you can prevent the "Copy" button from being added by adding the attributes `data-disable-copy-button="true"` to any parent containing the code blocks.

You can also prevent the loading of the `copyButton.js` setting the eleventy data `disableCopyButton` to `true`.

For examepl, you can do that in the front-matter of your page:

```yaml
disableCopyButton: true
```

Or in your nunjucks template:

{% raw %}

```twig
{% set disableCopyButton = true %}
```

{% endraw %}
