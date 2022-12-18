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
}

const MenuItemPage = ({ pageId, pages, currentPageId }: IMenuItemPageProps) => {
    const pageOfMenuItem = pages.find(
        (page) => getPageId(page.filePathStem) === pageId
    );

    if (!pageOfMenuItem) {
        throw `Could not find page with id ${pageId} in the pages collection`;
    }

    const isCurrentPage =
        getPageId(pageOfMenuItem?.filePathStem) === currentPageId;

    const pageHref =
        pageOfMenuItem.data.baseUrl + pageOfMenuItem.data.page.url;

    return (
        <li>
            <a href={pageHref} class={isCurrentPage ? "is-active" : ""}>
                {pageOfMenuItem?.data.title}
            </a>
        </li>
    );
};

interface ISubMenu {
    menuItem: MenuItem;
    pages: any[];
    currentPageId: PageId;
}

const SubMenu = ({ menuItem, pages, currentPageId }: ISubMenu) => {
    if (typeof menuItem === "string") {
        return (
            <MenuItemPage
                pageId={menuItem}
                pages={pages}
                currentPageId={currentPageId}
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
}

const MenuItem = ({ menuItem, pages, currentPageId }: IMenuItemProps) => {
    if (typeof menuItem === "string") {
        return (
            <ul class="menu-list">
                <MenuItemPage
                    pageId={menuItem}
                    pages={pages}
                    currentPageId={currentPageId}
                />
            </ul>
        );
    } else if (typeof menuItem === "object") {
        if (menuItem.type === "link") {
            return (
                <ul class="menu-list">
                    <li>
                        <a href={menuItem.href}>
                            {menuItem.label}
                        </a>
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
}

const Menu = ({ menu, pages, currentPageId }: IMenuProps) => {
    return (
        <div class="menu-container">
            <aside class="menu">
                {menu.map((element) => (
                    <MenuItem
                        menuItem={element}
                        pages={pages}
                        currentPageId={currentPageId}
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
        (page) => page.inputPath === this.ctx.page.inputPath
    );

    const currentPageId = getPageId(currentPage.filePathStem);

    if (currentPage.data.nacaraMenu) {
        return Nano.renderSSR(
            <Menu
                menu={currentPage.data.nacaraMenu}
                pages={pages}
                currentPageId={currentPageId}
            />
        );
    } else {
        return null;
    }
}

module.exports = menuFilter;
