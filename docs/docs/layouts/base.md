---
title: Base
layout: nacara/layouts/docs.njk
---

The base layout can be accessed using the `nacara/layouts/base.njk`.

This layout provides the basic structure of the page, by default it will render a page with a navbar, the content and a footer if the `footer.nacara` is defined.

**Usage**

In your front-matter, you can define the layout to use:

```yaml
---
title: My page
layout: nacara/layouts/base.njk
---
```

If you need to customize the layout, you can create a new layout and extend the base layout:

{% raw %}
```html
{# Tell Nunjucks to use the base layout #}
{% extends "nacara/layouts/docs.njk" %}

{#
    You can override the blocks defined in the base layout

    For example, you can override the content block to render your own content
#}
{% block content %}
    {{ content | safe }}
{% endblock %}
```
{% endraw %}

## Body classes

The base layout will add some classes to the `<body>`. This is helpful when you want to have page or layout specific style rules.

The generated classes contains the relative path with the `/` replaced by `_` and the `page--` or `layout--` prefix.

**Example**

If you have the following file structure:

```text
.
├── docs
│   └── getting-started.md
└── _includes
    └── _nacara
        └── layouts
            └── docs.njk
```

And `docs/docs/getting-started.md` has the following front-matter:

```yaml
---
title: Getting started
layout: nacara/layouts/docs.njk
---
```

The generated `<body>` will have the following classes:

- `layout--nacara_layouts_docs`
- `page--docs_getting-started`

## Blocks

The base layout provides some blocks that you can override to customize the page.

### `headExtra`

If you need to include some extra content in the `<head>` tag, you can use the `headExtra` block.

This is useful if you need to include some custom assets, CSS or JavaScript.

### `navbar`

If you prefer to render the navbar in a different way, you can override the `navbar` block.

You can also provide an empty block to not render the navbar.

### `content`

The `content` block is used to render the content of the page, it is placed between the navbar and the footer.

### `footer`

If you prefer to render the footer in a different way, you can override the `footer` block.

You can also provide an empty block to not render the footer.
