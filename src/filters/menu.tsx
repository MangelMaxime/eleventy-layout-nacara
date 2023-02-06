import Nano, { h, Fragment } from "nano-jsx";
import path from "path";
import { removeExtension } from "../utils/removeExtension";

interface IMenuItemPageProps {
    pageStem: string;
    pages: any[];
    currentPageStem: string;
    nacaraSectionDir: string;
}

const MenuItemPage = ({ pageStem, pages, currentPageStem, nacaraSectionDir }: IMenuItemPageProps) => {
    const pageOfMenuItem = pages.find((page) => {
        const currentPageRelativePath = path.relative(
            nacaraSectionDir,
            path.join(page.data.eleventy.env.root, page.filePathStem)
        );

        return (
            removeExtension(currentPageRelativePath) === pageStem
        )
    });

    if (!pageOfMenuItem) {
        const absolutePageInputPath = path.join(
            nacaraSectionDir,
            pageStem
        );
        throw `Could not find page with filePathStem '${absolutePageInputPath}'`;
    }

    const isCurrentPage =
        currentPageStem === pageOfMenuItem.filePathStem;

    const pageHref = pageOfMenuItem.data.baseUrl + pageOfMenuItem.data.page.url;

    return (
        <li>
            <a
                href={pageHref}
                class={isCurrentPage ? "is-active" : ""}
                innerHTML={{ __dangerousHtml: pageOfMenuItem?.data.title }}
            ></a>
        </li>
    );
};

interface ISubMenu {
    menuItem: MenuItem;
    pages: any[];
    currentPageInputPath: string;
    nacaraSectionDir: string;
}

const SubMenu = ({ menuItem, pages, currentPageInputPath, nacaraSectionDir }: ISubMenu) => {
    if (typeof menuItem === "string") {
        return (
            <MenuItemPage
                pageStem={menuItem}
                pages={pages}
                currentPageStem={currentPageInputPath}
                nacaraSectionDir={nacaraSectionDir}
            />
        );
    } else if (typeof menuItem === "object") {
        if (menuItem.type === "link") {
            return (
                <li>
                    <a href={menuItem.href}>{menuItem.label}</a>
                </li>
            );
        } else if (menuItem.type === "section") {
            // We don't support nested sections yet
            throw "Nested sections are not supported yet by the menu of eleventy-layout-nacara";
        }
    }
};

interface IMenuItemProps {
    menuItem: MenuItem;
    pages: any[];
    currentPageStem: string;
    nacaraSectionDir: string;
}

const MenuItem = ({ menuItem, pages, currentPageStem , nacaraSectionDir }: IMenuItemProps) => {
    if (typeof menuItem === "string") {
        return (
            <ul class="menu-list">
                <MenuItemPage
                    pageStem={menuItem}
                    pages={pages}
                    currentPageStem={currentPageStem}
                    nacaraSectionDir={nacaraSectionDir}
                />
            </ul>
        );
    } else if (typeof menuItem === "object") {
        if (menuItem.type === "link") {
            return (
                <ul class="menu-list">
                    <li>
                        <a href={menuItem.href}>{menuItem.label}</a>
                    </li>
                </ul>
            );
        } else if (menuItem.type === "section") {
            return (
                <>
                    <p class="menu-label">{menuItem.label}</p>
                    <ul class="menu-list">
                        {menuItem.items.map((subMenuItem) => (
                            <SubMenu
                                menuItem={subMenuItem}
                                pages={pages}
                                currentPageInputPath={currentPageStem}
                                nacaraSectionDir={nacaraSectionDir}
                            />
                        ))}
                    </ul>
                </>
            );
        } else {
            throw "Invalid menu item element";
        }
    } else {
        throw "Invalid menu item element";
    }
};

interface IMenuProps {
    menu: MenuItem[];
    pages: any[];
    currentPageStem: string;
    nacaraSectionDir: string;
}

const Menu = ({ menu, pages, currentPageStem, nacaraSectionDir }: IMenuProps) => {
    return (
        <div class="menu-container">
            <aside class="menu">
                {menu.map((element) => (
                    <MenuItem
                        menuItem={element}
                        pages={pages}
                        currentPageStem={currentPageStem}
                        nacaraSectionDir={nacaraSectionDir}
                    />
                ))}
            </aside>
        </div>
    );
};

/**
 *
 * @param pages
 * @returns
 */
export default function menuFilter(this: any, pages: any[]) {
    const currentPage = pages.find(
        (page) => page.filePathStem === this.ctx.page.filePathStem
    );

    if (currentPage.data.nacaraMenu) {
        return Nano.renderSSR(
            <Menu
                menu={currentPage.data.nacaraMenu}
                pages={pages}
                currentPageStem={currentPage.filePathStem}
                nacaraSectionDir={currentPage.data.nacaraSectionDir}
            />
        );
    } else {
        return null;
    }
}

module.exports = menuFilter;
