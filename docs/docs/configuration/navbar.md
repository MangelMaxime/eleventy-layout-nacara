---
title: Navbar
layout: nacara/layouts/docs.njk
---

Configure the navbar of your site, you have control over the `start` and `end` of the navbar, and you can add simple links or dropdowns.

## Location

Configuration is done via global Data, the recommended way is by creating a `navbar.nacara` file in your global Data folder (default: `_data`).

The data can then be accessed via `navbar.nacara`.

## Schema format

The content of `navbar.nacara` is JSON formatted.

<table class="table is-narrow is-bordered is-vcentered">
    <thead>
        <tr>
            <th class="label-cell">Property</th>
            <th class="label-cell">Required</th>
            <th class="label-cell">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="label-cell">
                <code>$schema</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
Path to the JSON schema file.

In general, you should use the `./../../schemas/navbar-schema.json` schema.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>start</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
The list of items to display on the left side of the navbar.

See [start](#start) for more information.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>end</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
The list of items to display on the right side of the navbar.

See [end](#end) for more information.
            </td>
        </tr>
    </tbody>
</table>

### start

The `start`of the navbar consits of a list of 2 types of items:

- `Link`: Render a link consiting of just a label
- `Dropdown`: Render a dropdown, where you can place a list of links

#### Link

<table class="table is-narrow is-bordered is-vcentered">
    <thead>
        <tr>
            <th class="label-cell">Property</th>
            <th class="label-cell">Required</th>
            <th class="label-cell">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="label-cell">
                <code>section</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Section of the website associated to this navbar item.

This is used to highlight the link if the current page is in associated section.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>label</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Text to display
        </tr>
        <tr>
            <td class="label-cell">
                <code>url</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
URL to navigate to
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>pinned</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
If `true`, the link will be displayed on mobile display.

Default: `false`
            </td>
        </tr>
    </tbody>
</table>

```json
{
    "navbar": {
    "start": [
        {
            "section": "documentation",
            "url": "/Nacara/documentation/index.html",
            "label": "Docs",
            "pinned": true
        },
        {
            "section": "showcase",
            "url": "/Nacara/showcase/index.html",
            "label": "Showcase"
        }
    ]
}
```

#### Dropdown

<table class="table is-narrow is-bordered is-vcentered">
    <thead>
        <tr>
            <th class="label-cell">Property</th>
            <th class="label-cell">Required</th>
            <th class="label-cell">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="label-cell">
                <code>label</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
                Text to display
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>items</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
List of items displayed in the dropdown

It can be a string of value `divider` or an object of type [DropdownLink](#DropdownLink)
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>partial</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
Partial path to used for rendering the dropdown content.

The partial property take precedence over the `items` property but you still need to fill the `items`.

This is required for 2 reasons:

1. Make Nacara understand your dropdown content and be able to generate the correct navigation element
2. If the dropdown is not pinned, the `items` elements will be used to render the mobile menu
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>fullwidth</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
If `true`, the dropdown will also take the full width of the screen

Default: `false`
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>pinned</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
If `true`, the link will be displayed on mobile display too

Default: `false`
            </td>
        </tr>
    </tbody>
</table>

##### DropdownLink

<table class="table is-narrow is-bordered is-vcentered">
    <thead>
        <tr>
            <th class="label-cell">Property</th>
            <th class="label-cell">Required</th>
            <th class="label-cell">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="label-cell">
                <code>section</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Section of the website associated to this navbar item.

This is used to highlight the link if the current page is in associated section.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>label</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Text to display
        </tr>
        <tr>
            <td class="label-cell">
                <code>url</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
URL to navigate to
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>description</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
Optional description to display

You can use HTML tags in the description, usefull for adding a line break.
            </td>
        </tr>
    </tbody>
</table>

**Example**

```json
{
    "navbar": {
        "start": [
            {
                "pinned": true,
                "label": "Docs",
                "items": [
                    {
                        "section": "nacara",
                        "label": "Nacara",
                        "description": "Description line1\nline2 start here",
                        "url": "/Nacara/documentation/introduction.html"
                    },
                    "divider",
                    {
                        "label": "Nacara.Layout.Standard",
                        "url": "/Nacara/documentation/layout/introduction.html"
                    }
                ]
            }
        ]
    }
}
```

### End

List of links with icons displayed at the end of the navbar.

<table class="table is-narrow is-bordered is-vcentered">
    <thead>
        <tr>
            <th class="label-cell">Property</th>
            <th class="label-cell">Required</th>
            <th class="label-cell">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="label-cell">
                <code>label</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Label of the link to display

*The default layout use it when on mobile screen*
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>icon</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Icon to display

This icon is processed using `to_icon` filter, read more about it [here](docs/filters/to-icon/)
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>url</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
URL to navigate to
            </td>
        </tr>
    </tbody>
</table>

**Example**

```json
{
    "navbar": {
        "end": [
            {
                "url": "https://github.com/MangelMaxime/Nacara",
                "icon": "simpleIcons:github",
                "label": "GitHub"
            },
            {
                "url": "https://twitter.com/MangelMaxime",
                "icon": "simpleIcons:twitter",
                "label": "Twitter"
            }
        ]
    }
}
```

## Example

```json
{
    "$schema": "../../node_modules/@mangelmaxime/eleventy-layout-nacara/schemas/navbar-schema.json",
    "copyright": {
        "startDate": "2021",
        "attribution": "Elmish contributors"
    },
    "text": "Built with <a class=\"is-underlined\" href=\"https://mangelmaxime.github.io/Nacara/\">eleventy-layout-nacara</a>",
    "sitemapSections": [
        {
            "title": "Project ressources",
            "items": [
                {
                    "label": "Repository",
                    "icon": "lucide:file-code",
                    "url": "https://github.com/elmish/elmish.github.io"
                },
                {
                    "label": "License",
                    "icon": "lucide:copyright",
                    "url": "https://github.com/elmish/elmish.github.io"
                }
            ]
        },
        {
            "title": "Other Links",
            "items": [
                {
                    "label": "Fable",
                    "icon": "assets:fable",
                    "url": "https://github.com/elmish/elmish.github.io"
                },
                {
                    "label": "Fable Gitter",
                    "icon": "simpleIcons:gitter",
                    "url": "https://github.com/elmish/elmish.github.io"
                }
            ]
        }
    ]
}
```
