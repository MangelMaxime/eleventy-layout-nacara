// @ts-ignore
import path from "path";
import Nano, { h } from "nano-jsx";
import { removeExtension } from "../utils/removeExtension";

/**
 *
 * Generate the partial breadcrumb to a give page.
 *
 * IMPORTANT:
 * If you want to display, the full path to a page, you need to add yourself
 * the page title to the end of result.
 *
 * This is because, otherwise this function would be too complex and do too much.
 *
 * @param pageId The page we are looking for
 * @param acc The accumulator
 * @param menuElements The menu to look into
 * @returns
 *  The partial breadcrumb to the page if found in
 *  the menu or undefined if the page is not found in the menu
 */
function generatePartialBreadcrumb(
    evelentyRoot: string,
    nacaraSectionDir: string,
    searchedRelativePath: string,
    acc: string[],
    menuElements: Menu
): string[] | undefined {
    const [currentMenuItem, ...restOfMenu] = menuElements;

    // There is no more menu to process, meaning we didn't find the pageId
    // Return nothing
    if (currentMenuItem === undefined) {
        return undefined;
    } else {
        if (typeof currentMenuItem === "string") {
            const currentItenRelativePath = path.relative(
                nacaraSectionDir,
                path.join(nacaraSectionDir, currentMenuItem)
            );

            // This is the page we are looking for
            // Store the pageId in the accumulator and return the result
            if (
                removeExtension(currentItenRelativePath) ===
                searchedRelativePath
            ) {
                return [...acc];
                // Keep looking
            } else {
                return generatePartialBreadcrumb(
                    evelentyRoot,
                    nacaraSectionDir,
                    searchedRelativePath,
                    acc,
                    restOfMenu
                );
            }
        } else if (typeof currentMenuItem === "object") {
            // A link cannot beling to the breadcrumb, so we skip it
            if (currentMenuItem.type === "link") {
                return generatePartialBreadcrumb(
                    evelentyRoot,
                    nacaraSectionDir,
                    searchedRelativePath,
                    acc,
                    restOfMenu
                );
            } else if (currentMenuItem.type === "section") {
                const sectionResult = generatePartialBreadcrumb(
                    evelentyRoot,
                    nacaraSectionDir,
                    searchedRelativePath,
                    [...acc, currentMenuItem.label],
                    currentMenuItem.items
                );

                // If the current section doesn't contain the pageId, we keep looking
                if (sectionResult === undefined) {
                    return generatePartialBreadcrumb(
                        evelentyRoot,
                        nacaraSectionDir,
                        searchedRelativePath,
                        acc,
                        restOfMenu
                    );
                    // We got a result, so we store the section title in the accumulator
                    // and return the result
                } else {
                    return sectionResult;
                }
            }
        }
    }
}

/**
 * The generate the full breadcrumb to the provided path
 * @param page Page to generate for
 * @param menuConfig Menu configuration to look for the page into
 * @returns Return the list of all the label representing the path to the provided path
 */
function generateBreadcrumb(page: any, menuConfig: Menu): string[] | undefined {
    // If the page doesn't have a menu, return nothing
    if (menuConfig == null) {
        return undefined;
    }

    const searchedRelativePath = path.relative(
        page.data.nacaraSectionDir,
        path.join(page.data.eleventy.env.root, page.filePathStem)
    );

    const partialBreadcrumb = generatePartialBreadcrumb(
        page.data.eleventy.env.root,
        page.data.nacaraSectionDir,
        searchedRelativePath,
        [],
        menuConfig
    );

    // If the page is not found in the menu, we return nothing
    if (partialBreadcrumb === undefined) {
        return undefined;
        // Otherwise, we compute the current page title and return the full breadcrumb
    } else {
        return [...partialBreadcrumb, page.data.sanitizedTitle];
    }
}

const BreadcrumbItem = ({ text }: { text: string }) => {
    return (
        <li class="is-active">
            <a innerHTML={{ __dangerousHtml: text }}></a>
        </li>
    );
};

export default function breadcrumbFilter(this: any, pages: any[]) {
    const currentPage = pages.find(
        (page) => page.inputPath === this.ctx.page.inputPath
    );

    const breadcrumbItems = generateBreadcrumb(
        currentPage,
        currentPage.data.nacaraMenu
    );

    if (breadcrumbItems === undefined) {
        return undefined;
    } else {
        return Nano.renderSSR(() => (
            <nav class="breadcrumb">
                <ul>
                    {breadcrumbItems.map((breadcrumbItem) => {
                        return <BreadcrumbItem text={breadcrumbItem} />;
                    })}
                </ul>
            </nav>
        ));
    }
}

module.exports = breadcrumbFilter;
