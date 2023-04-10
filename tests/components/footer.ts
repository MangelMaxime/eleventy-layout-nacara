import test from "ava";
import { formatHTML } from "../utils/_formatHTML";
const Eleventy = require("@11ty/eleventy");

test("render nothing if footer.nacara is not provided", async (t) => {
    const elev = new Eleventy(
        "./fixtures/footer-0/",
        "./fixtures/footer-0/_site",
        {
            configPath: "./fixtures/footer-0/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        ``
    );
});

test("is rendered if only the text is provided", async (t) => {
    const elev = new Eleventy(
        "./fixtures/footer-1/",
        "./fixtures/footer-1/_site",
        {
            configPath: "./fixtures/footer-1/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        `<footer class="footer">
    <div class="is-size-5">
        <p class="has-text-centered">
            Built with
            <a
                class="is-underlined"
                href="https://mangelmaxime.github.io/Nacara/"
            >
                eleventy-layout-nacara
            </a>
        </p>
    </div>
</footer>
`
    );
});

test("is rendered if only copyright is provided", async (t) => {
    const elev = new Eleventy(
        "./fixtures/footer-2/",
        "./fixtures/footer-2/_site",
        {
            configPath: "./fixtures/footer-2/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        `<footer class="footer">
    <div class="is-size-5">
        <p class="has-text-centered">
            Copyright © 2023-
            <span id="copyright-end-year"></span>
            Mangel Maxime
        </p>

        <script type="text/javascript">
            // Use IIFE to avoid polluting the global scope
            // This also avoid conflict because of \`const year\` on the components/footer page
            (function () {
                const year = new Date().getFullYear();
                document.getElementById("copyright-end-year").innerHTML = year;
            })();
        </script>
    </div>
</footer>
`
    );
});

test("is rendered if only the sitemapSections is provided", async (t) => {
    const elev = new Eleventy(
        "./fixtures/footer-3/",
        "./fixtures/footer-3/_site",
        {
            configPath: "./fixtures/footer-3/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        `<footer class="footer">
    <div class="is-size-5">
        <div class="sitemap">
            <div class="sitemap-section">
                <div class="sitemap-section-title">About</div>
                <ul class="sitemap-section-list">
                    <li>
                        <a
                            href="/about-us"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="sitemap-section-list-item-text">
                                About Us
                            </span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="/our-people"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                    ></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </span>

                            <span class="sitemap-section-list-item-text">
                                Our People
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="sitemap-section">
                <div class="sitemap-section-title">Ressources</div>
                <ul class="sitemap-section-list">
                    <li>
                        <a
                            href="/blog"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="sitemap-section-list-item-text">
                                Blog
                            </span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="/faq"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="sitemap-section-list-item-text">
                                FAQ
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
`
    );
});

test("is rendered with all the information provided", async (t) => {
    const elev = new Eleventy(
        "./fixtures/footer-4/",
        "./fixtures/footer-4/_site",
        {
            configPath: "./fixtures/footer-4/.eleventy.js",
        }
    );

    const json = await elev.toJSON();
    const formattedResult = formatHTML(json[0].content);

    t.is(
        formattedResult,
        `<footer class="footer">
    <div class="is-size-5">
        <div class="sitemap">
            <div class="sitemap-section">
                <div class="sitemap-section-title">About</div>
                <ul class="sitemap-section-list">
                    <li>
                        <a
                            href="/about-us"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="sitemap-section-list-item-text">
                                About Us
                            </span>
                        </a>
                    </li>

                    <li>
                        <a
                            href="/our-people"
                            class="icon-text sitemap-section-list-item"
                        >
                            <span class="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                    ></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </span>

                            <span class="sitemap-section-list-item-text">
                                Our People
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <p class="has-text-centered">Build with eleventy-layout-nacara</p>

        <p class="has-text-centered">
            Copyright © 2023-
            <span id="copyright-end-year"></span>
            Mangel Maxime
        </p>

        <script type="text/javascript">
            // Use IIFE to avoid polluting the global scope
            // This also avoid conflict because of \`const year\` on the components/footer page
            (function () {
                const year = new Date().getFullYear();
                document.getElementById("copyright-end-year").innerHTML = year;
            })();
        </script>
    </div>
</footer>
`
    );
});
