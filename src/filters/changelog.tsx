import Nano, { h, Fragment } from "nano-jsx";
import path from "path";
import fs from "fs-extra";
import { parse } from "./../changelog-parser/parser.js";
import type { Changelog, Version } from "./../changelog-parser/parser.js";
import * as CategoryType from "./../changelog-parser/categories.js";
import { categoryToText } from "./../changelog-parser/categories.js";
import slugify from "slugify";
import dayjs from "dayjs";
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
    body: string;
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

            <li
                class="changelog-list-item changelog-version-body"
                dangerouslySetInnerHTML={{ __html: body }}
            ></li>
        </div>
    );
};

interface ICategoriesProps {
    categories: Map<CategoryType.Category, string>;
}

const Categories = ({ categories }: ICategoriesProps) => {
    let res = [];

    // Sort the categories by kind
    let added = "";
    let changed = "";
    let deprecated = "";
    let removed = "";
    let fixed = "";
    let security = "";
    let others = [];

    for (const [categoryType, body] of categories) {
        switch (categoryType.kind) {
            case "added":
                added += body;
                break;

            case "changed":
                changed += body;
                break;

            case "deprecated":
                deprecated += body;
                break;

            case "removed":
                removed += body;
                break;

            case "fixed":
                fixed += body;
                break;

            case "security":
                security += body;
                break;

            default:
                others.push({
                    categoryType,
                    body,
                });
        }
    }

    // Unkown categories are sorted alphabetically
    others = others.sort((a, b) => (a.categoryType > b.categoryType ? 1 : -1));

    if (added !== "") {
        res.push(<Category category={CategoryType.added} body={added} />);
    }

    if (changed !== "") {
        res.push(<Category category={CategoryType.changed} body={changed} />);
    }

    if (deprecated !== "") {
        res.push(
            <Category category={CategoryType.deprecated} body={deprecated} />,
        );
    }

    if (removed !== "") {
        res.push(<Category category={CategoryType.removed} body={removed} />);
    }

    if (fixed !== "") {
        res.push(<Category category={CategoryType.fixed} body={fixed} />);
    }

    if (security !== "") {
        res.push(<Category category={CategoryType.security} body={security} />);
    }

    for (const { categoryType, body } of others) {
        res.push(<Category category={categoryType} body={body} />);
    }

    return res;
};

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
    return async function (this: any, pages: any[]) {
        if (this.ctx.changelog_path) {
            const changelogFilePath = path.join(
                this.ctx.page.absolutePath,
                "..", // Remove the file segment from the path
                this.ctx.changelog_path,
            );
            const fileContent = await fs.readFile(changelogFilePath, "utf8");
            const changelog: Changelog = parse(fileContent);
            const renderTemplate = eleventyConfig.getFilter("renderTemplate");

            // Transform the markdown to HTML
            // Needs to happen before the JSX rendering as async is not well
            // supported in Nano JSX at least not in an easy way for us
            for (const version of changelog.versions) {
                for (const [categoryType, body] of version.categories) {
                    // Provide a fake `this` otherwise Eleventy crashes
                    const compiledBody = await renderTemplate.call({}, body, "md");
                    version.categories.set(categoryType, compiledBody);
                }
            }

            return Nano.renderSSR(() => (
                <ul className="changelog-list">
                    {changelog.versions.map((entry) => (
                        <>
                            <Version version={entry} />
                            <Categories categories={entry.categories} />
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
