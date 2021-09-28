const { createHTMLfromYAML } = require("./yaml")

let templateSchema = {}
let gridsomeCreatePage = {}

const assign404 = ({ slug, path, template }) => slug == "error404"
    ? { slug: "404", path: "/404", template: "Error404" }
    : { slug, path, template }


const assignHomepage = ({ homepage, slug }) => homepage ? "/" : `/${ slug }`


const assignSpecialPages = ({ slug, ...data }) => {
    let path = assignHomepage({ ...data, slug })
    return assign404({ slug, path, template: data.template })
}


const assignTemplateSchema = (data) => templateSchema = data
const assignCreatePage = (data) => gridsomeCreatePage = data

const mapTemplate = ({
    template,
    fallback = "apps/Views/SiteView"
}) => {
    if (!templateSchema) throw("No template schema file assigned")

    return template
        ? `./${ templateSchema[template] || template }.vue`
        : `./${ fallback }.vue`
}


const setRouteData = (name, meta=null) => ({
    route: {
        name,
        meta
    }
})

const createPageHelper = ({ id, data, fallbackTemplate }) => {
    try {
        if (typeof gridsomeCreatePage !== "function") throw "Use assignCreatePage(createPage) in your api.createPages function"

        let { slug, path, template } = assignSpecialPages({ ...data, slug: id })

        gridsomeCreatePage({
            ...setRouteData(slug),
            path,
            component: mapTemplate({
                template: template || fallbackTemplate,
            }),
            context: {
                slug,
                ...createHTMLfromYAML({ data }),
            }
        })
    }
    catch (err) {
        console.log(err)
        return
    }
}


module.exports = {
    assignCreatePage,
    assignSpecialPages,
    assignTemplateSchema,
    mapTemplate,
    setRouteData,
    createPageHelper
}
