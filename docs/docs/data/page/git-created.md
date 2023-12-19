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

:::info {title="Important"}

For this filter to work properly, you need to have the full git history of your project.

If you are using a CI, it is possible that it only fetches part of the history by default.

For exampe, for GitHub Actions, you need use `fetch-depth: 0`

```yaml
steps:
    - uses: actions/checkout@v3
    with:
        # We need the full history for gitCreated/gitLastUpdated to works as expected
        fetch-depth: 0
```

:::
