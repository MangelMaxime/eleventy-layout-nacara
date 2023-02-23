---
title: Navbar
layout: nacara/layouts/docs.njk
---

Nunjuks template which generates a navbar based on [navbar](/docs/configuration/navbar) data.

**Usage**

{% raw %}
```html
<body>
    <!-- Include the navbar component to render it -->
    {% include "nacara/components/navbar.njk" %}

    <!-- Add your own stuff -->
    <div style="text-align: center; margin-top: 5rem">
            This is the content of my page
    </div>
</body>
```
{% endraw %}

**Preview**

<!-- Override for the preview -->
{% set navbar = {
    "start": [
        {
            "section": "docs",
            "label": "Docs",
            "url": "/",
            "pinned": true
        },
        {
            "label": "Ressources",
            "items": [
                {
                    "section": "changelogs",
                    "label": "Fable",
                    "description": "Fable is a transpiler from F# to JavaScript.",
                    "url": "https://fable.io/"
                },
                "divider",
                {
                    "section": "changelogs",
                    "label": "F#",
                    "url": "https://fsharp.org/"
                }
            ]
        }
    ],
    "end": [
        {
            "url": "https://github.com",
            "label": "GitHub",
            "icon": "simpleIcons:github"
        }
    ]
} %}

<style>
    .preview-navbar {
        border: 1px solid lightgray;
        padding: 2rem;
        border-radius: 5px;
        width: 100%;
        height: 300px;
    }
</style>
<iframe id="FileFrame" class="preview-navbar" scrolling="no" seamless="seamless" src="about:blank"></iframe>

<script type="text/javascript">
   var doc = document.getElementById('FileFrame').contentWindow.document;
   doc.open();
   doc.write(`
<html class="has-navbar-fixed-top">
    <link rel="stylesheet" href="/style.css">
    <src="/assets/js/navbar.js" defer="defer"/>

    <!-- Include the navbar component to render it -->
    {% include "nacara/components/navbar.njk" %}

    <!-- Add your own stuff -->
    <div style="text-align: center; margin-top: 5rem">
            This is the content of my page
    </div>
</html>`);
   doc.close();
</script>
