import Nano, { h, Fragment } from "nano-jsx";
import path from "path";
import { removeExtension } from "../utils/removeExtension";
import changelogParser from "changelog-parser";
import fs from "fs-extra"
import { parse } from "./../changelog-parser/parser";

/**
 *
 * @param pages
 * @returns
 */
export default async function changelogFilter(this: any, pages: any[]) {

    if (this.ctx.changelog_path) {
        const changelogFilePath = path.join(
            this.ctx.page.absolutePath,
            "..", // Remove the file segment from the path
            this.ctx.changelog_path
        )

        // const result = await changelogParser({
        //     filePath: changelogFilePath,
        //     removeMarkdown: false
        // })

        // for (const entry of result.versions) {
        //     console.log(entry.parsed)
        // }

        const fileContent = await fs.readFile(changelogFilePath, "utf8")

        const symbols = parse(fileContent)

        console.log(symbols)

        // console.log(changelogFilePath)
        return Nano.renderSSR(
            () => (
                "Changelog"
            )
        );
    } else {
        throw "Missing changelog_path in data of ..."
    }
}

module.exports = changelogFilter;
