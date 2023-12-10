---
title: <code>format_date</code>
layout: nacara/layouts/docs.njk
---

Execute `dayjs(dateToFormat).format(providedFormat)`

**Arguments**

- `dateToFormat` - Date to format
    - string
    - number
    - Date
    - dayjs.Dayjs
    - null
    - undefined

- `providedFormat` - Format string

    You can find the full list of supported formats [here](https://day.js.org/docs/en/display/format).

**Usage**

{% raw %}

```html
<!-- You can use any JSDate, I am using page.gitCreated for convenience -->
{% set dateToFormat = page.gitCreated %}
{{ dateToFormat | format_date ("MMMM D, YYYY") }}
```

{% endraw %}

generates

{% set dateToFormat = page.gitCreated %}

```html
{{ dateToFormat | format_date ("MMMM D, YYYY") }}
```
