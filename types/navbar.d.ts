type NavbarEndItem =
    {
        url: string;
        label: string;
        icon: string;
    }

type NavbarStartItemLink =
    {
        url: string;
        label: string;
        pinned?: boolean;
        section?: string;
    }

type NavbarStartItemDropdown =
    {
        label: string;
        items: (
            | "divider"
            | {
                section: string
                url: string
                label: string
                description?: string
            })[]
        partial?: string;
        fullwidth?: boolean;
        pinned?: boolean;
    }

type NavbarJson =
    {
        start: (NavbarStartItemLink | NavbarStartItemDropdown)[];
        end: NavbarEndItem[];
    }
