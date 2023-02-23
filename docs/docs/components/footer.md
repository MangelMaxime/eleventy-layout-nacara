---
title: Footer
layout: nacara/layouts/docs.njk
---

Nunjuks template which generates a footer based on [footer](/docs/configuration/footer) data.

**Usage**

{% raw %}
```html
<style>
    .footer-preview {
        border: 1px solid lightgray;
        padding: 2rem;
        border-radius: 5px;
    }

    .text-center {
        text-align: center;
    }
</style>
<div class="footer-preview">
    <p class="text-center">
        This is a demo to show how you can include the footer in your own template.
    </p>

    <!-- Include the footer components to render it -->
    {% include "nacara/components/footer.njk" %}

</div>
```
{% endraw %}

**Preview**

<!-- Override footer for the preview -->
{% set footer = {
    "copyright": {
        "startDate": "2021",
        "attribution": "Eleventy Nacara"
    },
    "text": "This is a demo"
} %}
<style>
    .footer-preview {
        border: 1px solid lightgray;
        padding: 2rem;
        border-radius: 5px;
    }

    .text-center {
        text-align: center;
    }
</style>
<div class="footer-preview">
    <p class="text-center">
        This is a demo to show how you can include the footer in your own template.
    </p>

    <!-- Include the footer components to render it -->
    {% include "nacara/components/footer.njk" %}

</div>
