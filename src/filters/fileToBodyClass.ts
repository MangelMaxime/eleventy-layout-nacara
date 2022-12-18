// Idea is taken from: https://11ty.rocks/tips/layout-templating/
// Compute the class representation of a page

import path from 'path';

export default function fileToBodyClassFilter (filePath : string) {
    // console.log(filePath);
    // Compute path without extension
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    const fileWithoutExt = path.join(fileDir, fileName);

    // Normalize path separators and replace them with underscores
    let bodyClass = fileWithoutExt.replaceAll(/\\/g, '/').replaceAll(/\//g, '_');

    // Remove leading underscore
    if (bodyClass.startsWith('_')) {
        bodyClass = bodyClass.substring(1);
    }

    return `page--${bodyClass}`;
};

module.exports = fileToBodyClassFilter;
