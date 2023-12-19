---
title: <code>nacara_menu</code>
layout: nacara/layouts/docs.njk
---

Generate a menu based on the menu configuration.

**Usage**

{% raw %}

```twig
{{ collections.all | nacara_menu | safe }}

{# The menu comes with a script to always scroll the active element in view #}
{% set menuScript = "/assets/nacara/js/menu.js" | add_content_hash %}
<script src="{{ menuScript }}" defer="defer" type="module"></script>
```

{% endraw %}

generates a menu similar to the one on the left.
