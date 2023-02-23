---
title: Menus
layout: nacara/layouts/docs.njk
---

In **eleventy-layout-nacara** menus are defined using directory data file.

It adds a custom [custom data extension](https://www.11ty.dev/docs/data-custom/), default is `.menu`.

The menu is optional, but it helps you:

- Group your content
- Display a menu when visiting a page related to the collection
- Provide navigation buttons at the bottom of the page (Next/Previous)

## How to define a menu?

The menu of a collection is defined by creating a `*.menu` file at the top level of your collection.

```text
docs
├── blog
└── documentation
    ├── documenation.menu
    ├── page1.md
    └── page2.md
```

Here you have **2** collection but only `documentation` has a menu.

## Menu configuration

The menu supportd 3 types of items:

- [Page](#page): link to a page hosted on your site
- [Link](#link): link to an arbitrary URL
- [Section](#section): allows you to create a submenu

### Page - Link to an internal page

This type of menu item, allows you to link to a page hosted on your site.

You need to provide the relative path to that page from the `nacaraMenu.json` file.

**Example**

Given the following file structure:

```text
docs
├── blog
├── docs
│   ├── page1.md
│   ├── page2.md
│   └── nacaraMenu.json
└── posts
    └── post1.md
```

File: `docs/docs/nacaraMenu.json`

```json
{
    "$schema": "./../../schemas/menu-schema.json",
    "items": [
        {
            "type": "page",
            "label": "Page 1",
            "url": "page1.md"
        },
        {
            "type": "page",
            "label": "Page 2",
            "url": "page2.md"
        },
        {
            "type": "page",
            "label": "Post 1",
            "url": "../posts/post1.md"
        }
    ]
}
```

*The `title` data of the page is going to be used as the label in the menu*
