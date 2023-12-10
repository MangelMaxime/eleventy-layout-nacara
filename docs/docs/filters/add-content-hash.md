---
title: <code>add_content_hash</code>
layout: nacara/layouts/docs.njk
---

This filter adds `?hash=` to the end of the URL, where `hash` is the hash of the file's contents.

**Usage**

{% raw %}

```html
{% set menuScript = "/assets/nacara/js/menu.js" | add_content_hash %}
<script src="{{ menuScript }}" defer="defer" type="module"></script>
```

{% endraw %}

generates

{% set menuScript = "/assets/nacara/js/menu.js" | add_content_hash %}

```html
<script src="{{ menuScript }}" defer="defer" type="module"></script>
```
