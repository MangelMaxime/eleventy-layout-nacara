import getPageId from "../utils/getPageId";
import Nano, { h, Fragment } from "nano-jsx";

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

function tryFindSection(menu: Menu, pageId: string): MenuSection | undefined {
    const findInSection = (menu: Menu, pageId: string) => {
        const result = menu.find((menuItem) => {
            if (typeof menuItem === "string") {
                return menuItem === pageId;
            } else if (typeof menuItem === "object") {
                if (menuItem.type === "link") {
                    return false;
                } else if (menuItem.type === "section") {
                    if (menuItem.items.length === 0) {
                        return false;
                    } else {
                        const subResult = findInSection(menuItem.items, pageId);
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
                    const subResult = findInSection(menuItem.items, pageId);
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

type IPreviousPageButtonProps = {
    currentPageIndex: number;
    flatMenu: FlatMenu;
    menu: Menu;
    pages: any[];
    currentSection: string;
};

const PreviousPageButton = ({
    currentPageIndex,
    flatMenu,
    menu,
    pages,
    currentSection,
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
    const previousPageId = previousMenuItem; // Rename it for clarity

    const previousPageContext = pages.find(
        (page) =>
            page.data.nacaraSection === currentSection &&
            getPageId(page.filePathStem) === previousMenuItem
    );

    if (!previousPageContext) {
        throw "Nacara-Navigation: Previous page not found";
    }

    const previousButtonText = previousPageContext.data.title;

    const previousButtonSection = tryFindSection(menu, previousPageId);
    const previousButtonSectionText = previousButtonSection?.label;

    const previousButtonHref =
        previousPageContext.data.baseUrl + previousPageContext.data.page.url;

    return (
        <a
            class="button bd-fat-button is-primary is-light bd-pagination-prev"
            href={previousButtonHref}
        >
            <i>←</i>
            <span class="is-hidden-mobile">
                <em>{previousButtonSectionText}</em>
                <strong>{previousButtonText}</strong>
            </span>
        </a>
    );
};

interface INextPageButtonProps {
    currentPageIndex: number;
    flatMenu: FlatMenu;
    menu: Menu;
    pages: any[];
    currentSection: string;
}

const NextPageButton = ({
    currentPageIndex,
    flatMenu,
    menu,
    pages,
    currentSection,
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

    // Previous menu item is valid for generating a "real" previous button
    const nextPageId = nextMenuItem; // Rename it for clarity

    const nextPageContext = pages.find(
        (page) =>
            page.data.nacaraSection === currentSection &&
            getPageId(page.filePathStem) === nextMenuItem
    );

    if (!nextPageContext) {
        throw "Nacara-Navigation: Next page not found";
    }

    const nextButtonText = nextPageContext.data.title;

    const nextButtonSection = tryFindSection(menu, nextPageId);
    const nextButtonSectionText = nextButtonSection?.label;

    const nextButtonHref =
        nextPageContext.data.baseUrl + nextPageContext.data.page.url;

    return (
        <a
            class="button bd-fat-button is-primary is-light bd-pagination-next"
            href={nextButtonHref}
        >
            <span class="is-hidden-mobile">
                <em>{nextButtonSectionText}</em>
                <strong>{nextButtonText}</strong>
            </span>
            <i>→</i>
        </a>
    );
};

export default function navigationFilter(this: any, pages: any[]) {
    const currentPage = pages.find(
        (page) => page.inputPath === this.ctx.page.inputPath
    );

    const currentPageId: string = getPageId(currentPage.filePathStem);

    if (!currentPage.data.nacaraMenu) {
        return null;
    }

    const flatMenu = flattenMenu(currentPage.data.nacaraMenu);

    const currentPageIndex = flatMenu.findIndex(
        (flatMenuItem: FlatMenuItem) => {
            if (typeof flatMenuItem === "string") {
                return flatMenuItem === currentPageId;
            } else if (typeof flatMenuItem === "object") {
                // If this is an object, it means it is a link which
                // cannot be the current page
                return false;
            }
        }
    );

    // Current page is not found in the menu, we can't generate a navigation info
    if (currentPageIndex === undefined) {
        return null;
    }

    return Nano.renderSSR(
        <div class="section bd-docs-pagination bd-pagination-links">
            <PreviousPageButton
                currentPageIndex={currentPageIndex}
                menu={currentPage.data.nacaraMenu}
                flatMenu={flatMenu}
                pages={pages}
                currentSection={currentPage.data.nacaraSection}
            />
            <NextPageButton
                currentPageIndex={currentPageIndex}
                menu={currentPage.data.nacaraMenu}
                flatMenu={flatMenu}
                pages={pages}
                currentSection={currentPage.data.nacaraSection}
            />
        </div>
    );
}

module.exports = navigationFilter;
