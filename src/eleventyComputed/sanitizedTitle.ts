export default function sanitizedTitle() {
    return (data: any) => {
        // I don't know why but some title are undefined
        if (data.title) {
            return data.title.replace(/(<([^>]+)>)/gi, "");
        } else {
            return "";
        }
    };
}

module.exports = sanitizedTitle;
