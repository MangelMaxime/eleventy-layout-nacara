---
title: <code>page.gitLastModified</code>
layout: nacara/layouts/docs.njk
---

Returns the last modified date of the current page based on the git history.

We consider a file has modified if it has at least 2 commits. The first commit is the creation of the file, the second commit is the first modification.

If the page was never modified, it returns `null`.

Returning `null` is useful so you can make a distinction between a page that was never modified and a page that was modified.

When displaying both the `page.getCreated` and `page.getModified` dates, you can detect files that were never modified and avoid displaying twice the same date.

**Usage**

{% raw %}

```html
{{ page.gitLastModified }}
```

{% endraw %}

generates

{{ page.gitLastModified }}

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
