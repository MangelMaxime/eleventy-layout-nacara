import { expect, test } from 'vitest'
import { formatHTML } from "../utils/_formatHTML";
const Eleventy = require("@11ty/eleventy");

test("minimal navbar is generated if no navbar.nacara data is provided", async () => {
    const elev = new Eleventy(
        "./fixtures/navbar-0/",
        "./fixtures/navbar-0/_site",
        {
            configPath: "./fixtures/navbar-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
>
    <div class="navbar-brand">
        <a class="navbar-item title is-4" href="https://mangelmaxime.github.io">
            Eleventy Nacara
        </a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <div class="navbar-item navbar-burger-dots is-hidden-tablet">
                <svg height="4" stroke="none" viewbox="0 0 22 4" width="22">
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(9,0)"
                    ></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(18,0)"
                    ></circle>
                </svg>
            </div>
        </div>
        <div class="navbar-end is-hidden-mobile"></div>
    </div>
    <div class="nacara-navbar-menu"></div>
</nav>
<div class="grey-overlay"></div>
`
    );
});

test("supports simple link elements in the start section", async () => {
    const elev = new Eleventy(
        "./fixtures/navbar-1/",
        "./fixtures/navbar-1/_site",
        {
            configPath: "./fixtures/navbar-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
>
    <div class="navbar-brand">
        <a class="navbar-item title is-4" href="https://mangelmaxime.github.io">
            Eleventy Nacara
        </a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a
                class="navbar-item is-hidden-mobile"
                href="/docs/introduction/index.html"
            >
                Docs
            </a>

            <a class="navbar-item is-hidden-mobile" href="/blog/index.html">
                Blog
            </a>

            <div class="navbar-item navbar-burger-dots is-hidden-tablet">
                <svg height="4" stroke="none" viewbox="0 0 22 4" width="22">
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(9,0)"
                    ></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(18,0)"
                    ></circle>
                </svg>
            </div>
        </div>
        <div class="navbar-end is-hidden-mobile"></div>
    </div>
    <div class="nacara-navbar-menu">
        <a class="nacara-navbar-menu-item" href="/docs/introduction/index.html">
            <span>Docs</span>
        </a>

        <a class="nacara-navbar-menu-item" href="/blog/index.html">
            <span>Blog</span>
        </a>
    </div>
</nav>
<div class="grey-overlay"></div>
`
    );
});

test("pinned simple link elements are always displayed on mobile", async () => {
    const elev = new Eleventy(
        "./fixtures/navbar-2/",
        "./fixtures/navbar-2/_site",
        {
            configPath: "./fixtures/navbar-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
>
    <div class="navbar-brand">
        <a class="navbar-item title is-4" href="https://mangelmaxime.github.io">
            Eleventy Nacara
        </a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/docs/introduction/index.html">Docs</a>

            <div class="navbar-item navbar-burger-dots is-hidden-tablet">
                <svg height="4" stroke="none" viewbox="0 0 22 4" width="22">
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(9,0)"
                    ></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(18,0)"
                    ></circle>
                </svg>
            </div>
        </div>
        <div class="navbar-end is-hidden-mobile"></div>
    </div>
    <div class="nacara-navbar-menu"></div>
</nav>
<div class="grey-overlay"></div>
`
    );
});

test("navbar endItems are rendered using their icons on desktop only and rendered using their label in the mobile menu", async () => {
    const elev = new Eleventy(
        "./fixtures/navbar-3/",
        "./fixtures/navbar-3/_site",
        {
            configPath: "./fixtures/navbar-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    expect(formattedResult).toBe(
        `<nav
    class="navbar is-fixed-top is-spaced"
    role="navigation"
    aria-label="main navigation"
>
    <div class="navbar-brand">
        <a class="navbar-item title is-4" href="https://mangelmaxime.github.io">
            Eleventy Nacara
        </a>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <div class="navbar-item navbar-burger-dots is-hidden-tablet">
                <svg height="4" stroke="none" viewbox="0 0 22 4" width="22">
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(9,0)"
                    ></circle>
                    <circle
                        cx="2"
                        cy="2"
                        r="2"
                        transform="translate(18,0)"
                    ></circle>
                </svg>
            </div>
        </div>
        <div class="navbar-end is-hidden-mobile">
            <a class="navbar-item" href="https://github.com/">
                <span class="icon">
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <title>GitHub</title>
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        ></path>
                    </svg>
                </span>
            </a>
        </div>
    </div>
    <div class="nacara-navbar-menu">
        <a class="nacara-navbar-menu-item" href="https://github.com/">
            <span>GitHub</span>
        </a>
    </div>
</nav>
<div class="grey-overlay"></div>
`
    );
});
