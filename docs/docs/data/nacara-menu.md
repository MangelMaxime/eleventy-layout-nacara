---
title: <code>nacaraMenu</code>
layout: nacara/layouts/docs.njk
---

Returns the menu data for the current collection if it exists. See [menu](/docs/configuration/menu) for more information.

The values of the menu have been **stemified**. This means that the initial `./` has been removed if present, the path has been mormalized to use `/` as the path separator and the extension has been removed.

**Example**

`./getting-started/index.md` will be `getting-started/index`.
