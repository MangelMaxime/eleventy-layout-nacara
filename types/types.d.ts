
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

type FlatMenuItem = (MenuLink | string)
type FlatMenu = FlatMenuItem [];


interface EleventyBeforeEventArgs {
    inputDir: string;
    dir: {
        input: string;
        output: string;
        includes: string;
        data: string;
        layouts: string;
    };
    outputMode: "fs" | "json" | "ndjson";
    runMode: "build" | "serve" | "watch";
}

interface EleventyAfterEventArgs {
    dir: {
        input: string;
        output: string;
        includes: string;
        data: string;
        layouts: string;
    };
    outputMode: "fs" | "json" | "ndjson";
    runMode: "build" | "serve" | "watch";
    results: any;
}
