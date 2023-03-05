import path from "path";

export default function absolutePath() {
    return (data: any) => {
        return path.join(data.eleventy.env.root, data.page.inputPath);
    };
}

module.exports = absolutePath;
