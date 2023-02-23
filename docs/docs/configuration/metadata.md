---
title: Metadata
layout: nacara/layouts/docs.njk
---

Common configuration data related to your site, for example: your site title, favIcon, etc.

## Location

Configuration is done via global Data, the recommended way is by creating a `metadata.nacara` file in your global Data folder (default: `_data`).

The data can then be accessed via `metadata.nacara`

## Schema format

The content of `metadata.nacara` is JSON formatted.

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
                <code>url</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">

URL for your website. This is the domain part of your URL.

For example, `https://mangelmaxime.github.io` is the URL of `https://mangelmaxime.github.io/Nacara/`
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>baseUrl</code>
            </td>
            <td class="label-cell">X</td>
            <td class="fullwidth-cell">
Base URL for your site. This is the path after the domain.

For example, `/Nacara/` is the baseUrl of `https://mangelmaxime.github.io/Nacara/`.

For URLs that have no path, the baseUrl should be set to `/`.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>title</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
                Title of your website
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>editUrl</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
URL for editing your documentation.

Example: `editUrl + 'docs/introduction.md'`. If this field is omitted, there will be no "Edit" button generated.
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>description</code>
            </td>
            <td class="label-cell"></td>
            <td class="fullwidth-cell">
            </td>
        </tr>
        <tr>
            <td class="label-cell">
                <code>author</code>
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
                    <code>name</code>
                </td>
                <td class="label-cell">X</td>
                <td class="fullwidth-cell">
    Name of the author
                </td>
            </tr>
            <tr>
                <td class="label-cell">
                    <code>twitter</code>
                </td>
                <td class="label-cell">X</td>
                <td class="fullwidth-cell">
    Twitter username of the author
                </td>
        </tbody>
    </table>
            </td>
        </tr>
    </tbody>
</table>

## Example

```json
{
    "$schema": "./../../schemas/metadata-schema.json",
    "url": "https://mangelmaxime.github.io",
    "editUrl": "https://github.com/MangelMaxime/Nacara/edit/master/docsrc",
    "baseUrl": "/Nacara/",
    "title": "Eleventy Nacara",
    "description": "",
    "author": {
        "name": "Maxime Mangel",
        "twitter": "MangelMaxime"
    }
}
```
