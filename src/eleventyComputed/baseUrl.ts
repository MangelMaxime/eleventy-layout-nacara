export async function baseUrl() {
    return async (data: any) => {
        if (data.isDevelopment) {
            return "";
        }

        if (data.metadata.nacara == undefined) {
            throw new Error(
                "eleventy-layout-nacara: Please provide the metadata information by creating a _data/metadata.nacara file."
            );
        }

        return data.metadata.nacara.baseUrl;
    };
}
