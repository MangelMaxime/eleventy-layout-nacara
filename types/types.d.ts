
interface MenuSection {
    type: "section",
    label : string,
    items : MenuItem []
}

interface MenuLink {
    type: "link",
    label : string,
    href : string
}

type MenuItem = MenuSection | MenuLink | string;
type Menu = MenuItem [];
type PageId = string;

type FlatMenuItem = (MenuLink | string)
type FlatMenu = FlatMenuItem [];
