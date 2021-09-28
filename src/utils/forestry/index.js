require('yamlify/register')

const fs = require('fs')
const slugify = require("@sindresorhus/slugify")
const frontMatter = require("yaml-front-matter")

const baseRoutes = require(path.resolve("src/data/baseRoutes.yaml"))

const { createHTMLfromContent } = require("../gridsome/yaml")

const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item))

function getSluggedPage (page) {
    if (page.endsWith(".yaml") || page.endsWith(".yml")) {
        const {
            id,
            slug,
            ...data
        } = require(path.resolve(page))

        return { id, slug, data }
    }

    if (page.endsWith(".md")) {
        const fileContents = fs.readFileSync(path.resolve(page), 'utf8')

        let {
            id,
            slug,
            __content: content,
            ...data
        } = frontMatter.loadFront(fileContents)

        return {
            id,
            slug,
            content: createHTMLfromContent(content),
            data
        }
    }
}


function getSluggedPageLink (page) {
    const {
        id,
        slug,
        data: {
            hed,
            contentType,
            homepage
        }
    } = getSluggedPage(page)

    if (homepage) return "/"

    return `${ contentType ? baseRoutes[contentType] : "" }/${ slugify(slug || id || hed) }`
}


function getSluggedPageCrossLink (page, link, { flatten } = { flatten: true }) {
    const isPageObject = isObject(page)
    const linkedPage = isPageObject ? page[link] : page

    const {
        id,
        slug,
        data: {
            hed,
            lede,
            media,
            contentType,
            crossLink,
            hed: eventTitle,
            source,
            categories
        }
    } = getSluggedPage(linkedPage)

    let generatedCrossLink = {
        hed: isPageObject ? (page.hed || hed) : hed,
        lede: isPageObject ? (page.lede || lede) : lede,
        media: isPageObject ? (page.media || media) : false,
        template: isPageObject ? page.template : false,
        link: getSluggedPageLink(linkedPage),
        contentType,
        crossLink,
        eventTitle,
        source,
        categories
    }

    // console.log(generatedCrossLink)

    return generatedCrossLink
}


module.exports = {
    getSluggedPage,
    getSluggedPageLink,
    getSluggedPageCrossLink,
}
