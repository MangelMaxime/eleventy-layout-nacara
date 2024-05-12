import { evaluatePermalink } from "./evaluatePermalink.js";

export default function getOutputPath(pageContext: any) {
    const trimOutputRegex = new RegExp(`^${pageContext.data.eleventy.directories.output}`);
    const permalink = evaluatePermalink(pageContext);

    if (permalink) {
        return permalink;
    }

    return pageContext.data.page.outputPath.replace(trimOutputRegex, "");
}
