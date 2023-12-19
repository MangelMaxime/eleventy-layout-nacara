---
title: Textual steps
layout: nacara/layouts/docs.njk
---


Textual steps makes it easy to create a step by step guides. It will auto-generate the number of the steps for you.

To create a textual steps, you need to wrap your text withing a `<ul class="textual-steps></ul>` and put each step inside a `<li>...</li>`

````html
<ul class="textual-steps">

<li>

This is step one

</li>

<li>

This is step two.

And as you can see **Markdown** syntax can be used inside textual-steps.

```js
console.log("Hello")
```

</li>

</ul>
````

**Preview**

<ul class="textual-steps">

<li>

This is step one

</li>

<li>

This is step two.

And as you can see **Markdown** syntax can be used inside textual-steps.

```js
console.log("Hello")
```

</li>
