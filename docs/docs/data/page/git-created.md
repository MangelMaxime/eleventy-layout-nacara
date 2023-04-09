---
title: <code>page.gitCreated</code>
layout: nacara/layouts/docs.njk
---

Returns the date of creation of the current page based on the first commit in git.

If the page was never committed, it returns `now`.

**Usage**

{% raw %}
```html
{{ page.gitCreated }}
```
{% endraw %}

generates

{{ page.gitCreated }}
