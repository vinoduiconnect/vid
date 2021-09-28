const typogr = require("typogr")

const md = require("markdown-it")()
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-container"))
    .use(require("markdown-it-deflist"))
    .use(require("markdown-it-figure"))
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-image-lazy-loading"))
    .use(require("markdown-it-ins"))
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-video"))
    // .use(require("markdown-it-responsive")) (oooooh! possibly for good use with content images)


function isObject (item) {
    return (item && typeof item === 'object' && !Array.isArray(item))
}

function localRender (contentPayload) {
    return typogr.typogrify(
        md.render(contentPayload)
    )
}

function createHTMLfromYAML ({ data, fields = [] }) {
    return Object.entries(data).reduce(
        (dataObj, [key, value]) => {
            if (isObject(value)) {
                value = createHTMLfromYAML({ data: value, fields })
            }

            if (key.includes("(md)")) {
                const newKey = key.split("(md)")[0]
                dataObj[newKey] = localRender(value)
            }
            else if (fields.length && fields.includes(key)) {
                dataObj[key] = localRender(value)
            }
            else dataObj[key] = value

            return dataObj
        },
        {}
    )
}

function createHTMLfromContent (content) {
    return localRender(content)
}

module.exports = {
    createHTMLfromYAML,
    createHTMLfromContent,
}
