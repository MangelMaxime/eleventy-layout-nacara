---
title: <code>page.gitCreated</code>
layout: nacara/layouts/docs.njk
toc:
    from: 2
    to: 6
---

Returns the date of creation of the current page based on the first commit in git.

If the page was never committed, it returns `now`.

**Usage**

{% raw %}
```html
{{ page.gitCreated }}
```
{% endraw %}

generates

{{ page.gitCreated }}

Code for creating the TOC stuff

## Header 2

### Header 2.1

#### Header 2.1.1

##### Header 2.1.1.1

### Header 2.2

## Header 3

### Header 3.1
