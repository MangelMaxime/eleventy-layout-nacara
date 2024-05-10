import Nano, { h, Fragment } from "nano-jsx";
import path from "path";
import { removeExtension } from "../utils/removeExtension";
import { normalizeUrl } from "../utils/normalizeUrl";
import { evaluatePermalink } from "../utils/evaluatePermalink";

function flattenMenu(menu: Menu): FlatMenu {
    function flatten(menuItem: MenuItem): FlatMenu {
        if (typeof menuItem === "string") {
            return [menuItem];
        } else if (typeof menuItem === "object") {
            if (menuItem.type === "link") {
                return [menuItem];
            } else if (menuItem.type === "section") {
                return menuItem.items.flatMap(flatten);
            } else {
                throw "Invalid menu item element";
            }
        } else {
            throw "Invalid menu item element";
        }
    }

    return menu.flatMap(flatten);
}

function tryFindSection(menu: Menu, pagePath: string): MenuSection | undefined {
    const findInSection = (menu: Menu, pagePath: string) => {
        const result = menu.find((menuItem) => {
            if (typeof menuItem === "string") {
                return removeExtension(menuItem) === pagePath;
            } else if (typeof menuItem === "object") {
                if (menuItem.type === "link") {
                    return false;
                } else if (menuItem.type === "section") {
                    if (menuItem.items.length === 0) {
                        return false;
                    } else {
                        const subResult = findInSection(
                            menuItem.items,
                            pagePath
                        );
                        if (subResult) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        });

        return result;
    };

    // When searching from the top level, we don't want to return a match on a top-level
    // page id, because it is not in a section.
    // For this reasons, we have 2 "find" functions
    // Without that, we would be returning (MenuSection | string | undefined)
    // instead of (MenuSection | undefined)
    const result = menu.find((menuItem) => {
        if (typeof menuItem === "string") {
            return false;
        } else if (typeof menuItem === "object") {
            if (menuItem.type === "link") {
                return false;
            } else if (menuItem.type === "section") {
                if (menuItem.items.length === 0) {
                    return false;
                } else {
                    const subResult = findInSection(menuItem.items, pagePath);
                    if (subResult) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    });

    return result as MenuSection | undefined;
}

/**
 * Empty button used to keep the layout working
 * It ensures that the "Next button" is on the right of the page
 */
const EmptyPreviousButton = () => {
    return <a class="button navigate-to-previous is-invisible"></a>;
};

/**
 * Empty button used to keep the layout working
 */
const EmptyNextButton = () => {
    return <a class="button navigate-to-next is-invisible"></a>;
};

const ButtonText = ({ text }: { text: string }) => {
    return <strong innerHTML={{ __dangerousHtml: text }}></strong>;
};

type IPreviousPageButtonProps = {
    currentPageIndex: number;
    flatMenu: FlatMenu;
    menu: Menu;
    pages: any[];
    nacaraSectionDir: string;
};

const PreviousPageButton = ({
    currentPageIndex,
    flatMenu,
    menu,
    pages,
    nacaraSectionDir,
}: IPreviousPageButtonProps) => {
    // If the current page is the first page of the menu,
    // we can't generate a "real" previous button
    if (currentPageIndex < 1) {
        return <EmptyPreviousButton />;
    }

    const previousMenuItem = flatMenu[currentPageIndex - 1];

    // If the previous menu item is a link, we can't generate a "real" previous button
    if (typeof previousMenuItem === "object") {
        return <EmptyPreviousButton />;
    }

    // Previous menu item is valid for generating a "real" previous button
    const previousPageRelativePath = removeExtension(previousMenuItem); // Rename it for clarity

    const previousPageContext = pages.find((page) => {
        const currentItenRelativePath = path.relative(
            nacaraSectionDir,
            path.join(page.data.eleventy.env.root, page.filePathStem)
        );
        return currentItenRelativePath === previousPageRelativePath;
    });

    if (!previousPageContext) {
        throw "Nacara-Navigation: Previous page not found";
    }

    const previousButtonText = previousPageContext.data.title;

    const previousButtonSection = tryFindSection(
        menu,
        previousPageRelativePath
    );
    const previousButtonSectionText = previousButtonSection?.label;

    const outputPath =
        evaluatePermalink(previousPageContext) ??
        previousPageContext.data.page.outputPath;
    const previousButtonHref = normalizeUrl(
        previousPageContext.data.baseUrl + outputPath
    );

    return (
        <a
            class="button bd-fat-button is-primary is-light bd-pagination-prev"
            href={previousButtonHref}
        >
            <i>←</i>
            <span class="is-hidden-mobile">
                <em>{previousButtonSectionText}</em>
                <ButtonText text={previousButtonText} />
            </span>
        </a>
    );
};

interface INextPageButtonProps {
    currentPageIndex: number;
    flatMenu: FlatMenu;
    menu: Menu;
    pages: any[];
    nacaraSectionDir: string;
}

const NextPageButton = ({
    currentPageIndex,
    flatMenu,
    menu,
    pages,
    nacaraSectionDir,
}: INextPageButtonProps) => {
    // If the current page is the first page of the menu,
    // we can't generate a "real" previous button
    if (currentPageIndex >= flatMenu.length - 1) {
        return <EmptyNextButton />;
    }

    const nextMenuItem = flatMenu[currentPageIndex + 1];

    // If the next menu item is a link, we can't generate a "real" previous button
    if (typeof nextMenuItem === "object") {
        return <EmptyNextButton />;
    }

    // Next menu item is valid for generating a "real" previous button
    const nextPageRelativePath = removeExtension(nextMenuItem); // Rename it for clarity

    const nextPageContext = pages.find((page) => {
        const currentItemRelativePath = path.relative(
            nacaraSectionDir,
            path.join(page.data.eleventy.env.root, page.filePathStem)
        );
        return currentItemRelativePath === nextPageRelativePath;
    });

    if (!nextPageContext) {
        throw "Nacara-Navigation: Next page not found";
    }

    const nextButtonText = nextPageContext.data.title;

    const nextButtonSection = tryFindSection(menu, nextPageRelativePath);
    const nextButtonSectionText = nextButtonSection?.label;

    const outputPath =
        evaluatePermalink(nextPageContext) ??
        nextPageContext.data.page.outputPath;

    const nextButtonHref = normalizeUrl(
        nextPageContext.data.baseUrl + outputPath
    );

    return (
        <a
            class="button bd-fat-button is-primary is-light bd-pagination-next"
            href={nextButtonHref}
        >
            <span class="is-hidden-mobile">
                <em>{nextButtonSectionText}</em>
                <ButtonText text={nextButtonText} />
            </span>
            <i>→</i>
        </a>
    );
};

export default function previousNextPaginationFilter(this: any, pages: any[]) {
    const currentPage = pages.find(
        (page) => page.inputPath === this.ctx.page.inputPath
    );

    const currentPageRelativePath = path.relative(
        currentPage.data.nacaraSectionDir,
        path.join(currentPage.data.eleventy.env.root, currentPage.filePathStem)
    );

    if (!currentPage.data.nacaraMenu) {
        return null;
    }

    const flatMenu = flattenMenu(currentPage.data.nacaraMenu);

    const currentPageIndex = flatMenu.findIndex(
        (flatMenuItem: FlatMenuItem) => {
            if (typeof flatMenuItem === "string") {
                const currentItemRelativePath = path.relative(
                    currentPage.data.nacaraSectionDir,
                    path.join(currentPage.data.nacaraSectionDir, flatMenuItem)
                );

                return (
                    removeExtension(currentItemRelativePath) ===
                    currentPageRelativePath
                );
            } else if (typeof flatMenuItem === "object") {
                // If this is an object, it means it is a link which
                // cannot be the current page
                return false;
            }
        }
    );

    // Current page is not found in the menu, we can't generate a navigation info
    if (currentPageIndex === -1) {
        return null;
    }

    return Nano.renderSSR(() => (
        <div class="section bd-docs-pagination bd-pagination-links">
            <PreviousPageButton
                currentPageIndex={currentPageIndex}
                menu={currentPage.data.nacaraMenu}
                flatMenu={flatMenu}
                pages={pages}
                nacaraSectionDir={currentPage.data.nacaraSectionDir}
            />
            <NextPageButton
                currentPageIndex={currentPageIndex}
                menu={currentPage.data.nacaraMenu}
                flatMenu={flatMenu}
                pages={pages}
                nacaraSectionDir={currentPage.data.nacaraSectionDir}
            />
        </div>
    ));
}

module.exports = previousNextPaginationFilter;
