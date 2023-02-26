---
title: Previous/Next pagination
layout: nacara/layouts/docs.njk
---

Nunjuks template which generates a navigation menu based on [*.menu](/docs/configuration/menus) data.

The naviation menu consist in a Previous and Next buttons to make it easier to navigate between pages.

**Usage**

{% raw %}
```html
<style>
    .text-center {
        text-align: center;
    }
</style>

<div>
    <p class="text-center">
        This is a demo to show how you can include the previous-next-pagination in your own template.
    </p>

    <!-- Include the footer components to render it -->
    {% include "nacara/components/previous-next-pagination.njk" %}

</div>
```
{% endraw %}

**Preview**

<style>
    .text-center {
        text-align: center;
    }
</style>
<div class="nunjuck-preview">
    <p class="text-center">
        This is a demo to show how you can include the previous-next-pagination in your own template.
    </p>

    <!-- Include the footer components to render it -->
    {% include "nacara/components/previous-next-pagination.njk" %}

</div>
