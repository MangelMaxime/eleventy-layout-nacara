// Idea is taken from: https://11ty.rocks/tips/layout-templating/
// Compute the class representation of a layout

import path from 'path';

export default function layoutToBodyClassFilter (layout : string) {
    // If layout is undefined, default to 'base'

    layout = layout || 'base';
    // Compute path without extension
    const layoutDir = path.dirname(layout);
    const layoutName = path.basename(layout, path.extname(layout));
    const layoutWithoutExt = path.join(layoutDir, layoutName);

    // Normalize path separators and replace them with underscores
    let bodyClass = layoutWithoutExt.replaceAll(/\\/g, '/').replaceAll(/\//g, '_');

    // Remove leading "layouts"
    if (bodyClass.startsWith('layouts')) {
        bodyClass = bodyClass.substring(7);
    }

    // Remove leading underscore
    if (bodyClass.startsWith('_')) {
        bodyClass = bodyClass.substring(1);
    }

    return `layout--${bodyClass}`;
};

module.exports = layoutToBodyClassFilter;
