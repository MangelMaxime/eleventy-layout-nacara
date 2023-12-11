import Nano, { h, Fragment, Suspense, Component } from "nano-jsx";
import path from "path";
import fs from "fs-extra";
import { parse } from "./../changelog-parser/parser";
import type { Changelog, Version } from "./../changelog-parser/parser";
import type * as CategoryType from "./../changelog-parser/categories";
import { categoryToText } from "./../changelog-parser/categories";
import slugify from "slugify";
import dayjs from "dayjs";
const { EleventyRenderPlugin } = require("@11ty/eleventy");
interface IVersionProps {
    version: Version;
}

const Version = ({ version }: IVersionProps) => {
    const slug = slugify(version.title);
    let dateText = "";

    if (version.date) {
        dateText = dayjs(version.date).format("DD MMMM YYYY");
    }

    // If the version is undefined, we don't want to render it
    // This is the case when the changelog is empty or when encountering
    // the unreleased version node
    if (version.version === undefined) {
        return null;
    }

    return (
        <li class="changelog-list-item is-version">
            <a href={`#${slug}`}>
                <span class="anchor" id={slug}></span>
                <span class="tag is-primary is-large has-text-weight-bold">
                    {version.version}
                </span>
            </a>
            <span class="release-date is-uppercase has-text-weight-bold is-size-5">
                {dateText}
            </span>
        </li>
    );
};

interface ICategoryProps {
    category: CategoryType.Category;
    body: CategoryType.Body[];
}

const getCategoryColor = (category: CategoryType.Category) => {
    switch (category.kind) {
        case "added":
            return "is-success";

        case "deprecated":
            return "is-warning";

        case "removed":
            return "is-danger";

        case "changed":
        case "fixed":
        case "security":
        default:
            return "is-info";
    }
};

interface ICategoryBodyProps {
    elements: CategoryType.Body[];
}

const CategoryBody = ({ elements }: ICategoryBodyProps) => {
    return elements.map((element: CategoryType.Body) => {
        switch (element.kind) {
            case "text":
                return <div dangerouslySetInnerHTML={{ __html: element.text }}></div>;
            case "list-item":
                return (
                    <li class="changelog-list-item">
                        <div class="changelog-list-item-text">
                            <span dangerouslySetInnerHTML={{ __html: element.text }}></span>
                        </div>
                    </li>
                );
        }
    });
};

const Category = ({ category, body }: ICategoryProps) => {
    const tagColor = getCategoryColor(category);
    const tagText = categoryToText(category);

    return (
        <div>
            <li class="changelog-list-item">
                <span
                    class={`tag changelog-list-item-category is-medium has-text-weight-bold ${tagColor}`}
                >
                    {tagText}
                </span>
            </li>

            <CategoryBody elements={body} />
        </div>
    );
};

interface ICategoriesProps {
    categories: Map<CategoryType.Category, CategoryType.Body[]>;
}

const Categories = ({ categories }: ICategoriesProps) => {
    let res = [];

    for (const [categoryType, body] of categories) {
        res.push(<Category category={categoryType} body={body} />);
    }

    return res;
};

const TemplateRender = require("@11ty/eleventy/src/TemplateRender");

async function compile(
    content: string,
    templateLang: string,
    { templateConfig, extensionMap }: any
) {
    // Breaking change in 2.0+, previous default was `html` and now we default to the page template syntax
    // if (!templateLang) {
    //     templateLang = this.page.templateSyntax;
    // }

    // let inputDir = templateConfig?.dir?.input;

    // let tr = new TemplateRender(templateLang, inputDir, templateConfig);
    // tr.extensionMap = extensionMap;
    // if (templateLang) {
    //     await tr.setEngineOverride(templateLang);
    // } else {
    //     await tr.init();
    // }

    // return tr.getCompiledTemplate(content);
    return content;
}

/**
 * This function is a "generator" in the sense that it returns a function.
 *
 * This is so we can have a reference to the eleventyConfig object, allowing
 * to instantiate the Engine used by Eleventy for this filter internal usage.
 *
 * It would be better to have access to the engine instiatedby Eleventy itself,
 * but it doesn't seem to be possible at the moment.
 *
 * @returns
 */
export default function changelogFilter(eleventyConfig: any) {
    let extensionMap : any;

    eleventyConfig.on("eleventy.extensionmap", (map: any) => {
        extensionMap = map;
    });

    // console.log(eleventyConfig)
    // console.log(eleventyConfig.constructor.name)
    // console.log(eleventyConfig?.dir?.input)

    return async function (this: any, pages: any[]) {
        let res = await compile("* Item 1", "md", {
            templateConfig: eleventyConfig,
            extensionMap,
        });
        // console.log(res(this.ctx))
        const ctx = this.ctx;
        // console.log(this)
        if (this.ctx.changelog_path) {
            const changelogFilePath = path.join(
                this.ctx.page.absolutePath,
                "..", // Remove the file segment from the path
                this.ctx.changelog_path
            );
            const fileContent = await fs.readFile(changelogFilePath, "utf8");
            const changelog: Changelog = parse(fileContent);

            for (const version of changelog.versions) {
                for (const [categoryType, body] of version.categories) {
                    for (const element of body) {
                        // switch (element.kind) {
                        //     case "text":
                        //         const fn1 = await compile(element.text, "md", {
                        //             templateConfig: eleventyConfig,
                        //             extensionMap,
                        //         })
                        //         element.text = fn1(ctx);

                        //     case "list-item":
                        //         const fn2 = await compile(element.text, "md", {
                        //             templateConfig: eleventyConfig,
                        //             extensionMap,
                        //         })
                        //         element.text = fn2(ctx);
                        // }
                    }
                }
            }

            return Nano.renderSSR(() => (
                <ul className="changelog-list">
                    {changelog.versions.map((entry) => (
                        <>
                            <Version version={entry} />
                            {/* <Categories categories={entry.categories} /> */}
                        </>
                    ))}
                </ul>
            ));
        } else {
            throw (
                "Missing changelog_path in data of:\n" +
                this.ctx.page.absolutePath
            );
        }
    };
}

module.exports = changelogFilter;
