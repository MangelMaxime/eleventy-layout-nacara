import Nano, { h, Fragment } from "nano-jsx";
import path from "path";
import { removeExtension } from "../utils/removeExtension.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";
import getOutputPath from "../utils/getOutputPath.js";

interface TocConfig {
    from: number;
    to: number;
}

interface ITocElementProps {
    tocConfig: TocConfig;
    level: number;
    id: string;
    text: string;
}

const TocElement = ({ tocConfig, level, id, text }: ITocElementProps) => {
    if (level >= tocConfig.from && level <= tocConfig.to) {
        return (
            <li data-toc-rank={level}>
                <a href={`#${id}`} data-toc-element>
                    {text}
                </a>
            </li>
        );
    } else {
        return null;
    }
};

interface ITocProps {
    pageContent: string;
    config: TocConfig | Boolean | undefined;
}

const Toc = ({ pageContent, config }: ITocProps) => {
    // Fast exist if TOC is disabled
    if (typeof config === "boolean" && !config) {
        return null;
    }

    const headerRegex =
        /^<h(?<headerLevel>[1-6]) id="(?<headerId>.*)" tabindex="-1">(?<headerText>.*)<a.*<\/h[1-6]>$/gm;

    const headers = Array.from(pageContent.matchAll(headerRegex));

    const tocConfig = {
        // @ts-ignore - We know that it is not a boolean
        from: config?.from ?? 2,
        // @ts-ignore - We know that it is not a boolean
        to: config?.to ?? 2
    };

    if (headers.length === 0) {
        return null;
    } else {
        return (
            <li>
                <ul class="table-of-content">
                    {headers.map((header) => {
                        // Should not happen because if there is no groups,
                        // it means that the regex should not have matched
                        // This is just to make typescript happy
                        if (header.groups === undefined) {
                            throw "Could not parse header";
                        }

                        return (
                            <TocElement
                                tocConfig={tocConfig}
                                level={parseInt(header.groups.headerLevel)}
                                id={header.groups.headerId}
                                text={header.groups.headerText}
                            />
                        );
                    })}
                </ul>
            </li>
        );
    }
};

interface IMenuItemPageProps {
    pageStem: string;
    pages: any[];
    currentPageStem: string;
    nacaraSectionDir: string;
    pageContent: string;
    tocConfig: TocConfig | Boolean | undefined;
}

const MenuItemPage = ({
    pageStem,
    pages,
    currentPageStem,
    nacaraSectionDir,
    pageContent,
    tocConfig,
}: IMenuItemPageProps) => {
    const pageOfMenuItem = pages.find((page) => {
        const currentPageRelativePath = path.relative(
            nacaraSectionDir,
            path.join(page.data.eleventy.env.root, page.filePathStem)
        );

        return removeExtension(currentPageRelativePath) === pageStem;
    });

    if (!pageOfMenuItem) {
        const absolutePageInputPath = path.join(nacaraSectionDir, pageStem);
        throw `Could not find page with filePathStem '${absolutePageInputPath}'`;
    }

    const isCurrentPage = currentPageStem === pageOfMenuItem.filePathStem;

    const outputPath = getOutputPath(pageOfMenuItem);
    const pageHref = normalizeUrl(pageOfMenuItem.data.baseUrl + outputPath);

    // If we are on the current page, we render the TOC
    const tocElement = isCurrentPage ? (
        <Toc pageContent={pageContent} config={tocConfig} />
    ) : null;

    return (
        <>
            <li>
                <a
                    href={pageHref}
                    class={isCurrentPage ? "is-active" : ""}
                    innerHTML={{ __dangerousHtml: pageOfMenuItem?.data.title }}
                ></a>
            </li>
            {tocElement}
        </>
    );
};

interface ISubMenu {
    menuItem: MenuItem;
    pages: any[];
    currentPageInputPath: string;
    nacaraSectionDir: string;
    pageContent: string;
    tocConfig: TocConfig | Boolean | undefined;
}

const SubMenu = ({
    menuItem,
    pages,
    currentPageInputPath,
    nacaraSectionDir,
    pageContent,
    tocConfig,
}: ISubMenu) => {
    if (typeof menuItem === "string") {
        return (
            <MenuItemPage
                pageStem={menuItem}
                pages={pages}
                currentPageStem={currentPageInputPath}
                nacaraSectionDir={nacaraSectionDir}
                pageContent={pageContent}
                tocConfig={tocConfig}
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
            // Currently, I think allowing for nested sections would like
            // make the documentation harder to navigate and lead to by UX in general
            throw "Nested sections are not supported by eleventy-layout-nacara";
        }
    }
};

interface IMenuItemProps {
    menuItem: MenuItem;
    pages: any[];
    currentPageStem: string;
    nacaraSectionDir: string;
    pageContent: string;
    tocConfig: TocConfig | Boolean | undefined;
}

const MenuItem = ({
    menuItem,
    pages,
    currentPageStem,
    nacaraSectionDir,
    pageContent,
    tocConfig,
}: IMenuItemProps) => {
    if (typeof menuItem === "string") {
        return (
            <ul class="menu-list">
                <MenuItemPage
                    pageStem={menuItem}
                    pages={pages}
                    currentPageStem={currentPageStem}
                    nacaraSectionDir={nacaraSectionDir}
                    pageContent={pageContent}
                    tocConfig={tocConfig}
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
                                pageContent={pageContent}
                                tocConfig={tocConfig}
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
    pageContent: string;
    tocConfig: TocConfig | Boolean | undefined;
}

const Menu = ({
    menu,
    pages,
    currentPageStem,
    nacaraSectionDir,
    pageContent,
    tocConfig,
}: IMenuProps) => {
    return (
        <div class="menu-container">
            <aside class="menu">
                {menu.map((element) => (
                    <MenuItem
                        menuItem={element}
                        pages={pages}
                        currentPageStem={currentPageStem}
                        nacaraSectionDir={nacaraSectionDir}
                        pageContent={pageContent}
                        tocConfig={tocConfig}
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
                pageContent={currentPage.content}
                tocConfig={currentPage.data.toc}
            />
        );
    } else {
        return null;
    }
}
