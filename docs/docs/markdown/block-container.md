---
title: Block container
layout: nacara/layouts/docs.njk
---

Block container allows you to easily colored message blocks, to emphasize part of your page.

To create a block container, you need to wrap your text with 3 colons, specify a type.

```md
:::<type>
Your text goes here
:::
```

You can also optionally specify a title

```md
:::<type>{title="My title"}
Your text goes here
:::
```

Available types are:

- primary
- info
- success
- warning
- danger

<div class="columns is-multiline is-mobile">
<div class="column is-6 has-text-centered">

<style>
    /* Mimic primjs added margin so the code and preview are aligned */
    .preview .message {
        margin: 0.5em 0;
    }
</style>

**Code**

</div>
    <div class="column is-6 has-text-centered">

**Preview**

</div>
    <div class="column is-6">

```md
:::primary{title="Information"}
Your text goes here
:::
```

</div>
    <div class="column is-6 preview">

:::primary{title="Information"}
Your text goes here
:::

</div>
    <div class="column is-6">

```md
:::warning{title="Warning"}
Please read this notice
:::
```

</div>
    <div class="column is-6 preview">

:::warning{title="Warning"}
Please read this notice
:::

</div>
<div class="column is-6">

```md
:::info
Please read this notice
:::
```

</div>
    <div class="column is-6 preview">

:::info
Please read this notice
:::

</div>
<div class="column is-6">

```md
:::danger
Something went wrong
:::
```

</div>
    <div class="column is-6 preview">

:::danger
Something went wrong
:::

</div>
<div class="column is-6">

```md
:::success
Everything looks good
:::
```

</div>
    <div class="column is-6 preview">

:::success
Everything looks good
:::

</div>
</div>
