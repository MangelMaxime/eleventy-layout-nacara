// @ts-ignore
import lucideIcons from "lucide-static";
// @ts-ignore
import { createSVGWindow } from "svgdom";
const window = createSVGWindow();
const document = window.document;
import { SVG, registerWindow } from "@svgdotjs/svg.js";
import * as simpleIcons from 'simple-icons';
import fs from "fs/promises";
import path from "path";

interface IconInformation {
    iconName: string;
    attributes: IconAttributeInformation[];
}

interface IconAttributeInformation {
    name: string;
    value: string;
}

export type GeneratorFunction = Promise<string | Error>;

export interface Options {
    [key: string]: (iconString: string) => GeneratorFunction;
}

// register window and document
registerWindow(window, document);

// TODO: Add a cache to avoid importing/computing the same icon multiple times
// We can use the iconString as a key and implements the cache directly in the
// main toIconFilterBuilder function.
// This avoid the need to implement a cache for each generator
// A cache should improve the performance especially if the footer is using a lot of them
// because the footer is rendered on every page

/**
 *
 * @param {string} text The text to camelize
 * @returns The text camelized
 */
function camelCase(text: string): string {
    return text.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

async function fileExists(path: string) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

/**
 * Extract the information from an iconString
 *
 * Format of the iconString : `<icon-name>:<attribute-name>=<attribute-value>;<attribute-name>=<attribute-value>`
 *
 * Example: mail:width=20;height=20
 *
 * @param iconString
 * @returns The icon information
 */
export function extractIconInformation(iconString: string): IconInformation {
    // If the icon string doesn't have a ';' it means that there is no options
    // we can return the icon string as is
    if (iconString.indexOf(";") === -1) {
        return {
            iconName: iconString,
            attributes: [],
        };
    } else {
        const [iconName, ...options] = iconString.split(";");
        const attributes: IconAttributeInformation[] = [];

        options.forEach((option) => {
            const [name, value] = option.split("=");
            attributes.push({
                name: name,
                value: value,
            });
        });

        return {
            iconName: iconName,
            attributes: attributes,
        };
    }
}

export function setIconAttributes(
    svgElement: any,
    attributes: IconAttributeInformation[]
): void {
    for (const attribute of attributes) {
        svgElement.attr(attribute.name, attribute.value);
    }
}

export async function lucideGenerator(iconString: string): GeneratorFunction {
    const { iconName, attributes } = extractIconInformation(iconString);
    // @ts-ignore
    const lucideIcon = lucideIcons[camelCase(iconName)];

    if (lucideIcon) {
        const lucideIconSvg = SVG(lucideIcon);
        setIconAttributes(lucideIconSvg, attributes);

        return lucideIconSvg.svg();
    } else {
        return new Error(`Icon '${iconName}' not found in Lucide`);
    }
}

export async function simpleIconsGenerator(
    iconString: string
): GeneratorFunction {
    const { iconName, attributes } = extractIconInformation(iconString);
    // Get all properties from the icon
    let simpleIcon = undefined;

    for (const [_, value] of Object.entries(simpleIcons)) {
        if (value.slug === iconName) {
            simpleIcon = value;
            break;
        }
    }

    if (simpleIcon) {
        const simpleIconSvg = SVG(simpleIcon.svg);
        // Set some default attributes which seems to make sense for most icons
        simpleIconSvg.attr("fill", "currentColor");

        setIconAttributes(simpleIconSvg, attributes);

        return simpleIconSvg.svg();
    } else {
        return new Error(`Icon '${iconName}' not found in simple-icons`);
    }
}

export async function assetsGenerator(iconString: string): GeneratorFunction {
    const { iconName, attributes } = extractIconInformation(iconString);
    const iconPath = path.join(
        process.cwd(),
        "assets",
        "icons",
        `${iconName}.svg`
    );

    if (await fileExists(iconPath)) {
        const fileContent = await fs.readFile(iconPath);
        const iconSvg = SVG(fileContent.toString());

        // Set some default attributes which seems to make sense for most icons
        iconSvg.attr("fill", "currentColor");

        setIconAttributes(iconSvg, attributes);

        return iconSvg.svg();
    } else {
        return new Error(`Icon '${iconName}' not found in 'assets/icons' folder`);
    }
}

const defaultIconOptions: Options = {
    lucide: lucideGenerator,
    simpleIcons: simpleIconsGenerator,
    assets: assetsGenerator,
};

/**
 *
 * @param options
 * @returns An instance of a filter able to convert a string to an icon
 */
export default function toIconFilterBuilder(options?: Options) {
    const iconOptions = Object.assign({}, defaultIconOptions, options);

    /**
     * @param {string} icon
     * @param {any} callback
     */
    return async function (icon: string) {
        if (icon.indexOf(":") === -1) {
            throw new Error(`Failed to generate the icon. An icon should follow the format '<provider>:<icon-name|options>'`);
        } else {
            const [provider, iconName] = icon.split(":");

            if (provider === "") {
                throw new Error(`Failed to generate the icon. The provider is missing.`);
            } else if (iconName === "") {
                throw new Error(`Failed to generate the icon. The icon name is missing.`);
            } else {
                const iconGenerator = iconOptions[provider];

                if (iconGenerator) {
                    const generatorResult = await iconGenerator(iconName);

                    if (generatorResult instanceof Error) {
                        throw generatorResult;
                    } else {
                        return generatorResult;
                    }
                } else {
                    throw new Error(`Failed to generate the icon. The provider '${provider}' is not supported.`);
                }
            }
        }
    };
}

module.exports = toIconFilterBuilder;
