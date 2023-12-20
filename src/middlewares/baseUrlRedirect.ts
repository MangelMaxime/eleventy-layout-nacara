import { IncomingMessage, ServerResponse } from "http"

type NextFunction = (err?: Error) => void

export function baseUrlRedirect(baseUrl : string) {
    return function (req: IncomingMessage, res: ServerResponse, next: NextFunction) {
        // Missing URL we can't do anything
        if (!req.url) {
            next()
            return
        }

        const segments = req.url.split("/").slice(1)

        let sanitizeBaseUrl = baseUrl.replace(/\//g, "")

        let url = new URL(req.url, "http://localhost/"); // any domain will do here, we just want the searchParams
        let hasBeenRedirected = url.searchParams.get("nacara-redirected") === "true"

        if (!hasBeenRedirected && segments.length > 1 && segments[0] === sanitizeBaseUrl) {
            let newUrl = segments.slice(1).join("/")
            res.writeHead(
                307,
                {
                    Location: "http://" + req.headers.host + "/" + newUrl + "?nacara-redirected=true",
                    "nacara-redirected": "true",
                }
            )
            res.end()
        }

        next()
    }
}
