
export const evaluatePermalink = (ctx: any) => {
    let permalink = null;
    if (ctx.data.permalink) {
        if (typeof ctx.data.permalink === "function") {
            permalink = ctx.data.permalink(ctx.data)
        } else {
            permalink = ctx.data.permalink;
        }
    }
    return permalink;
}
