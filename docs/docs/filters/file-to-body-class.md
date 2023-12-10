---
title: <code>file_to_body_class</code>
layout: nacara/layouts/docs.njk
---

Transform the provided path by replacing `/` with `_` and prefixing it with `page--`.

**Usage**

{% raw %}

```html
{% set bodyClass = "/docs/getting-stated.md" | file_to_body_class %}
<body class="{{ bodyClass }}">
```

{% endraw %}

generates

{% set bodyClass = "/docs/getting-stated.md" | file_to_body_class %}

```html
<body class="{{ bodyClass }}">
```
