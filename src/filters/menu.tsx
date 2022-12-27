import getPageId from "../utils/getPageId";
import Nano, { h, Fragment } from "nano-jsx";

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
    pageId: MenuItem;
    pages: any[];
    currentPageId: PageId;
    currentSection: string;
}

const MenuItemPage = ({ pageId, pages, currentPageId, currentSection }: IMenuItemPageProps) => {
    const pageOfMenuItem = pages.find((page) => {
        return page.data.nacaraSection === currentSection && getPageId(page.filePathStem) === pageId;
    });

    if (!pageOfMenuItem) {
        throw `Could not find page with id '${currentSection}/${pageId}'`;
    }

    const isCurrentPage =
        getPageId(pageOfMenuItem?.filePathStem) === currentPageId;

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
    currentPageId: PageId;
    currentSection: string;
}

const SubMenu = ({ menuItem, pages, currentPageId, currentSection }: ISubMenu) => {
    if (typeof menuItem === "string") {
        return (
            <MenuItemPage
                pageId={menuItem}
                pages={pages}
                currentPageId={currentPageId}
                currentSection={currentSection}
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
    currentPageId: PageId;
    currentSection: string;
}

const MenuItem = ({ menuItem, pages, currentPageId, currentSection }: IMenuItemProps) => {
    if (typeof menuItem === "string") {
        return (
            <ul class="menu-list">
                <MenuItemPage
                    pageId={menuItem}
                    pages={pages}
                    currentPageId={currentPageId}
                    currentSection={currentSection}
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
                                currentPageId={currentPageId}
                                currentSection={currentSection}
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
    currentPageId: PageId;
    currentSection: string;
}

const Menu = ({ menu, pages, currentPageId, currentSection }: IMenuProps) => {
    return (
        <div class="menu-container">
            <aside class="menu">
                {menu.map((element) => (
                    <MenuItem
                        menuItem={element}
                        pages={pages}
                        currentPageId={currentPageId}
                        currentSection={currentSection}
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

    const currentPageId = getPageId(currentPage.filePathStem);
    const currentPageSection = currentPage.data.nacaraSection;

    if (currentPage.data.nacaraMenu) {
        return Nano.renderSSR(
            <Menu
                menu={currentPage.data.nacaraMenu}
                pages={pages}
                currentPageId={currentPageId}
                currentSection={currentPageSection}
            />
        );
    } else {
        return null;
    }
}

module.exports = menuFilter;
