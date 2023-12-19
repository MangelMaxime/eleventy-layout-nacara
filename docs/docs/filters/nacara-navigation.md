---
title: <code>nacara_navigation</code>
layout: nacara/layouts/docs.njk
---

Generate navigation elements to the next and previous pages based on the menu configuration.

**Usage**

{% raw %}

```html
<p class="text-center">
    This is a demo to show what the generated breadcrumb looks like.
</p>

{{ collections.all | nacara_previous_next_pagination | safe }}
```

{% endraw %}

generates

<div class="nunjuck-preview">
    <p class="text-center">
        This is a demo to show what the generated breadcrumb looks like.
    </p>
    {# Include the footer components to render it #}
    {{ collections.all | nacara_previous_next_pagination | safe }}
</div>
