---
title: Footer
layout: nacara/layouts/docs.njk
---

Configure the footer of your site.

## Location

Configuration is done via global Data, the recommended way is by creating a `footer.nacara` file in your global Data folder (default: `_data`).

The data can then be accessed via `footer.nacara`.

## Schema format

The content of `footer.nacara` is JSON formatted.

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
                <code>description</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
If set, the text will be displayed below the sitemap. You can use HTML tags.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>copyright</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">If present, these information are used when generating the Open Graph tags.
    <br/><br/>
    <table class="table">
        <thead>
            <tr>
                <th class="label-cell">Property</th>
                <th class="label-cell">Required</th>
                <th class="label-cell">Description</th>
            </tr>
        <tbody>
            <tr>
                <td class="label-cell">
                    <code>startDate</code>
                </td>
                <td class="label-cell">X</td>
                <td class="fullwidth-cell">
The start date of the copyright. This is usually the year of the first publication of the website.
                </td>
            </tr>
            <tr>
                <td class="label-cell">
                    <code>attribution</code>
                </td>
                <td class="label-cell"></td>
                <td class="fullwidth-cell">
Attribution for the content of the website. This is usually the name of the author.

Example: `Maxime Mangel`
                </td>
        </tbody>
    </table>
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>sitemapSections</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
The sections to display in the sitemap. Each section can have a title and a list of pages.

See [sitemapSections](#sitemapSections) for more information.
            </td>
        </tr>
    </tbody>
</table>

### sitemapSections


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
                <code>title</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
The title of the section.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>items</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
The list of pages to display in the section.
    <br/><br/>
Pages are defined as:
    <br/><br/>
    <table class="table">
        <thead>
            <tr>
                <th class="label-cell">Property</th>
                <th class="label-cell">Required</th>
                <th class="label-cell">Description</th>
            </tr>
        <tbody>
            <tr>
                <td class="label-cell">
                    <code>label</code>
                </td>
                <td class="label-cell">X</td>
                <td class="fullwidth-cell">
The label to display for the page.
                </td>
            </tr>
            <tr>
                <td class="label-cell">
                    <code>url</code>
                </td>
                <td class="label-cell">X</td>
                <td class="fullwidth-cell">
The URL of the page.
                </td>
            </tr>
            <tr>
                <td class="label-cell">
                    <code>icon</code>
                </td>
                <td class="label-cell"></td>
                <td class="fullwidth-cell">

The icon to display for the page. This icon is processed using `to_icon` filter, read more about it [here](docs/filters/to-icon/)
                </td>
            </tr>
        </tbody>
    </table>
            </td>
        </tr>
    </tbody>
</table>

## Example

```json
{
    "$schema": "./../../schemas/footer-schema.json",
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
