import Nano, { h, Fragment } from "nano-jsx";
import path from "path";

function flattenMenu(menu: MenuItem): MenuItem[] {
    if (typeof menu === "string") {
        return [menu];
    } else if (typeof menu === "object") {
        if (menu.type === "link") {
            return [menu];
        } else if (menu.type === "section") {
            return menu.items.flatMap(flattenMenu);
        } else {
            throw "Invalid menu item element";
        }
    } else {
        throw "Invalid menu item element";
    }
}

interface IMenuItemPageProps {
    pageId: string;
    pages: any[];
    currentPageInputPath: string;
    nacaraSectionDir: string;
}

const MenuItemPage = ({ pageId, pages, currentPageInputPath, nacaraSectionDir }: IMenuItemPageProps) => {
    const pageOfMenuItem = pages.find((page) => {
        const currentPageRelativePath = path.relative(
            nacaraSectionDir,
            path.join(page.data.eleventy.env.root, page.inputPath)
        );

        return (
            path.normalize(currentPageRelativePath) ===
            path.normalize(pageId)
        )
    });

    if (!pageOfMenuItem) {
        const absolutePageInputPath = path.join(
            nacaraSectionDir,
            pageId
        );
        throw `Could not find page with id '${absolutePageInputPath}'`;
    }

    const isCurrentPage =
        currentPageInputPath === pageOfMenuItem.inputPath;

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
                pageId={menuItem}
                pages={pages}
                currentPageInputPath={currentPageInputPath}
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
            return null;
        }
    }
};

interface IMenuItemProps {
    menuItem: MenuItem;
    pages: any[];
    currentPageInputPath: string;
    nacaraSectionDir: string;
}

const MenuItem = ({ menuItem, pages, currentPageInputPath, nacaraSectionDir }: IMenuItemProps) => {
    if (typeof menuItem === "string") {
        return (
            <ul class="menu-list">
                <MenuItemPage
                    pageId={menuItem}
                    pages={pages}
                    currentPageInputPath={currentPageInputPath}
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
                                currentPageInputPath={currentPageInputPath}
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
    currentPageInputPath: string;
    nacaraSectionDir: string;
}

const Menu = ({ menu, pages, currentPageInputPath, nacaraSectionDir }: IMenuProps) => {
    return (
        <div class="menu-container">
            <aside class="menu">
                {menu.map((element) => (
                    <MenuItem
                        menuItem={element}
                        pages={pages}
                        currentPageInputPath={currentPageInputPath}
                        nacaraSectionDir={nacaraSectionDir}
                    />
                ))}
            </aside>
        </div>
    );
};

function getRootDirectory(filePath: string) {
    const parts = filePath.replace(/\\/g, "/").split("/");

    // We remove the first element if it's "current dir"
    if (parts[0] === ".") {
        parts.shift();
    }

    return parts[0];
}

/**
 *
 * @param pages
 * @returns
 */
export default function menuFilter(this: any, pages: any[]) {
    const currentPage = pages.find(
        (page) => page.inputPath === this.ctx.page.inputPath
    );

    if (currentPage.data.nacaraMenu) {
        return Nano.renderSSR(
            <Menu
                menu={currentPage.data.nacaraMenu}
                pages={pages}
                currentPageInputPath={currentPage.inputPath}
                nacaraSectionDir={getRootDirectory(currentPage.inputPath)}
            />
        );
    } else {
        return null;
    }
}

module.exports = menuFilter;
