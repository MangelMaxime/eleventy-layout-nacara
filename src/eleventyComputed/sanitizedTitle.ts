export async function sanitizedTitle() {
    return async (data: any) => {
        if (!data) {
            return "";
        }
        // I don't know why but some title are undefined
        if (data.title) {
            return data.title.replace(/(<([^>]+)>)/gi, "");
        } else {
            return "";
        }
    };
}
