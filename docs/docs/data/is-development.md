---
title: <code>isDevelopment</code>
layout: nacara/layouts/docs.njk
---

Returns `true` if eleventy is running with the `--serve` flag.

**Usage**

{% raw %}
```html
{% if isDevelopment %}
    <p>This is the development environment</p>
{% endif %}
```
{% endraw %}
