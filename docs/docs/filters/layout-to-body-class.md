---
title: <code>layout_to_body_class</code>
layout: nacara/layouts/docs.njk
---

Transform the provided path by:

1. Replacing `/` with `_`
2. Remove leading `layouts_`
3. Prefixing it with `layout--`.

**Usage**

{% raw %}

```html
{% set layout = "nacara/layouts/docs.njk" %}
{% set layoutBodyClass = layout | layout_to_body_class %}
<body class="{{ layoutBodyClass }}">
```

{% endraw %}

generates

```html
{% set layout = "nacara/layouts/docs.njk" %}
{% set layoutBodyClass = layout | layout_to_body_class %}
<body class="{{ layoutBodyClass }}">
```
