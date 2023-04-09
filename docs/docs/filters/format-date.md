---
title: <code>format_date</code>
layout: nacara/layouts/docs.njk
---

Call [`luxon.toFormat`](https://moment.github.io/luxon/#/formatting?id=toformat) on the given JSDate using the provided format string.

**Usage**

{% raw %}

```html
<!-- You can use any JSDate, I am using page.gitCreated for convenience -->
{% set dateToFormat = page.gitCreated %}
{{ page.gitCreated | format_date ("LLLL d, yyyy") }}
```

{% endraw %}

generates

```html
{% set dateToFormat = page.gitCreated %}
{{ page.gitCreated | format_date ("LLLL d, yyyy") }}
```
