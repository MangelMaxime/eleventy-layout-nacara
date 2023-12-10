---
title: <code>nacara_breadcrumb</code>
layout: nacara/layouts/docs.njk
---

Generate a breadcrumb to the provided path based on the menu configuration.

**Usage**

{% raw %}

```html
<p class="text-center">
    This is a demo to show what the generated breadcrumb looks like.
</p>

{{ collections.all | nacara_breadcrumb | safe }}
```

{% endraw %}

generates

<div class="nunjuck-preview">
    <p class="text-center">
        This is a demo to show what the generated breadcrumb looks like.
    </p>

    <!-- Include the footer components to render it -->
    {{ collections.all | nacara_breadcrumb | safe }}
</div>
