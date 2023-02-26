---
title: "<code>nacaraSection</code>"
layout: nacara/layouts/docs.njk
---

Returns the top level collection for the current page. This is useful to get the current section of the documentation when trying to determine if an element of the navbar or menu needs to be highlighted.

**Example**

If you have the following file structure:

```text
.
├── docs
│   ├── getting-started.md
│   └── configuration.md
└── _includes
    └── _nacara
        └── layouts
            └── docs.njk
```

Then `docs/getting-started/index.md` will return `docs`.
