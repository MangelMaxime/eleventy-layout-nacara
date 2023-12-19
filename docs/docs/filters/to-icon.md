---
title: <code>to_icon</code>
layout: nacara/layouts/docs.njk
---

Inline icons in the html directly to optimize the page load.

The `to_icon` filter takes a string of the form `provider:icon-name` and returns the corresponding SVG icon.

Out of the box, it supports the following providers:

- [`lucide`](https://lucide.dev/): General purpose icons with a consistent style.
- [`simpleIcons`](https://simpleicons.org/): SVG icons for popular brands.
- `assets`: Looks for the icon in the `assets/icons` folder.

**Usage**

{% raw %}

```twig
<p class="text-center">
    This is a demo to show what the generated icons looks like.
</p>

<span class="icon is-large">
    {{ "lucide:home" | to_icon | safe }}
</span>

<span class="icon is-large">
    {{ "simpleIcons:github" | to_icon | safe }}
</span>

<span class="icon is-large">
    {{ "assets:fable.svg" | to_icon | safe }}
</span>
```

{% endraw %}

generates

<div class="nunjuck-preview">
    <p class="text-center">
        This is a demo to show what the generated icons looks like.
    </p>

    <span class="icon is-large">
        {{ "lucide:home" | to_icon | safe }}
    </span>

    <span class="icon is-large">
        {{ "simpleIcons:github" | to_icon | safe }}
    </span>

    <span class="icon is-large">
        {{ "assets:fsf" | to_icon | safe }}
    </span>
</div>
