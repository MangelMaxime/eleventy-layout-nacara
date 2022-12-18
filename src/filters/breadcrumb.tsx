// @ts-ignore
import path from "path";
import Nano, { h } from "nano-jsx";

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
    pageId: PageId,
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
            // This is the page we are looking for
            // Store the pageId in the accumulator and return the result
            if (currentMenuItem === pageId) {
                return [...acc];
                // Keep looking
            } else {
                return generatePartialBreadcrumb(pageId, acc, restOfMenu);
            }
        } else if (typeof currentMenuItem === "object") {
            // A link cannot beling to the breadcrumb, so we skip it
            if (currentMenuItem.type === "link") {
                return generatePartialBreadcrumb(pageId, acc, restOfMenu);
            } else if (currentMenuItem.type === "section") {
                const sectionResult = generatePartialBreadcrumb(
                    pageId,
                    [...acc, currentMenuItem.label],
                    currentMenuItem.items
                );

                // If the current section doesn't contain the pageId, we keep looking
                if (sectionResult === undefined) {
                    return generatePartialBreadcrumb(pageId, acc, restOfMenu);
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
 *
 * @param fileStem
 * @returns The pageId representing the provided fileStem
 */
function getPageId(fileStem: string) {
    //  Normal the path, so we can split using the path separator
    const normalizedInputPath = path.normalize(fileStem);
    // Extract all the segments of the path
    const inputPathSegments = normalizedInputPath.split(path.sep);
    // console.log("inputPathSegments:", inputPathSegments);
    // Build the section direction, which consist of the root + the first segment of the path
    const pageIdSegments = inputPathSegments.slice(2);

    return pageIdSegments.join("/");
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

    const pageId = getPageId(page.filePathStem);

    const partialBreadcrumb = generatePartialBreadcrumb(pageId, [], menuConfig);

    // If the page is not found in the menu, we return nothing
    if (partialBreadcrumb === undefined) {
        return undefined;
        // Otherwise, we compute the current page title and return the full breadcrumb
    } else {
        return [...partialBreadcrumb, page.data.title];
    }
}

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

        return Nano.renderSSR(
            <nav class="breadcrumb">
                <ul>
                    {breadcrumbItems.map((breadcrumbItem) => {
                        return (
                            <li class="is-active">
                                <a>{breadcrumbItem}</a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

module.exports = breadcrumbFilter;
