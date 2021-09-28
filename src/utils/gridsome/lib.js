function isObject (item) {
    return (item && typeof item === 'object' && !Array.isArray(item))
}

let TEMPLATE_SCHEMA = {}
let DEFAULT_TEMPLATE = ""

function assignTemplateSchema ({ defaultTemplate, templateSchema }) {
    TEMPLATE_SCHEMA = templateSchema
    DEFAULT_TEMPLATE = defaultTemplate
}

function mapTemplate ({ template }) {
    if (!TEMPLATE_SCHEMA) throw("No template schema file assigned")

    return template
        ? `./${ TEMPLATE_SCHEMA[template] || template }.vue`
        : `./${ DEFAULT_TEMPLATE }.vue`
}


function assignSpecialPages ({ slug, ...data }) {
    let path = assignHomepage({ ...data, slug })

    return assign404({ slug, path, template: data.template })
}

function assign404 ({ slug, path, template }) {
    return (slug == "error404")
        ? { slug: "404", path: "/404", template: "Error404" }
        : { slug, path, template }
}

function assignHomepage ({ homepage, slug }) {
    return homepage
        ? "/"
        : `/${ slug }`
}



function setRouteData (name, meta=null) {
    return {
        route: {
            name,
            meta
        }
    }
}


module.exports = {
    assignSpecialPages,
    mapTemplate,
    setRouteData,
    assignTemplateSchema,
    isObject
}
