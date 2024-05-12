export default function addBaseUrlIfNoProtocol(
    this: any,
    url: string
) {

    if (/^(?:[a-z+]+:)?\/\//i.test(url)) {
        return url;
    } else {
        const newUrl = `${this.ctx.baseUrl}${url}`;

        const match = newUrl.match(/^(((?<protocol>[a-z+]+):)?\/\/)?(?<rest>.*)/i);

        // Protect against unmatched URLs
        if (!match) throw new Error(`Could not parse URL: ${newUrl}`)

        const protocol = match.groups?.protocol;
        // Normalize the URL by removing double slashes
        const urlPath = match.groups?.rest.replace(/\/\/+/g, "/");

        if (protocol) {
            return `${protocol}://${urlPath}`;
        } else {
            return urlPath;
        }
    }
}
