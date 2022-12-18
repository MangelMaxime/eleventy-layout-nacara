import path from "path";
// import NacaraTypes from "./../../types/nacara";

export default function getPageId(fileStem : string) {
    //  Normal the path, so we can split using the path separator
    const normalizedInputPath = path.normalize(fileStem);
    // Extract all the segments of the path
    const inputPathSegments = normalizedInputPath.split(path.sep);
    // console.log("inputPathSegments:", inputPathSegments);
    // Build the section direction, which consist of the root + the first segment of the path
    const pageIdSegments = inputPathSegments.slice(2);

    return pageIdSegments.join("/");
};
