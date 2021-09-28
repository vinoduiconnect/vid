require('yamlify/register')

const fs = require('fs')
const slugify = require("@sindresorhus/slugify")

const {
    assignSpecialPages,
    mapTemplate,
    setRouteData,
    assignTemplateSchema,
    isObject
} = require("./lib.js")

const {
    createHTMLfromYAML
} = require("./yaml.js")



let PAGE_API = {}
let ROUTE_SCHEMA = {}

function assignPageApi ({ pageApi, templateSchema }) {
    PAGE_API = pageApi
    TEMPLATE_SCHEMA = templateSchema
}



async function loadCreateQuery (schemaDir) {
    const queryFile = fs.readFileSync(
        path.resolve(`src/apps/${ schemaDir }/query-create.graphql`),
        "utf-8"
    )

    return await PAGE_API.graphql(queryFile)
}


function mapResultsFromQuery ({ content: { edges }, modifierFn, key = "id" }) {
    return edges.reduce(
        (items, { node }) => {

            modifierFn && (node = modifierFn(node))

            node && (items[node[key]] = node)

            return items
        },
        {}
    )
}


const NO_PAGES_API = "ERROR: Your api.createPages function has not passed the Gridsome API functions to buildPages.js"


function createPage ({ id, mapPageIdent, data, template }) {
    try {
        if (typeof PAGE_API.createPage !== "function") throw NO_PAGES_API

        if (Object.values(ROUTE_SCHEMA).length && mapPageIdent) id = ROUTE_SCHEMA[mapPageIdent] || id || mapPageIdent

        let { slug, path, template: assignedTemplate } = assignSpecialPages({ ...data, slug: id })

        PAGE_API.createPage({
            ...setRouteData(slug),
            path,
            component: mapTemplate({
                template: data.template || assignedTemplate || template,
            }),
            context: {
                slug,
                ...createHTMLfromYAML({ data }),
            }
        })
    }
    catch (err) {
        console.error("")
        console.error(err)
        console.error("")
        return
    }
}

function createPages ({ pages = {}, additionalContext = {}, template = null}) {
    Object.values(pages).forEach(
        page => createPage({
            id: page.id,
            data: {
                ...page,
                ...additionalContext
            },
            template
        })
    )
}

function assignPath (basePath) {
    return (node) => {
        node.id = node.slug || node.path
            //  ? `${ basePath }/${ node.slug }`
            //  : `${ basePath }/${ node.fileInfo.name }`
        return node
    }
}


//  returns query results
async function batchCreate ({
    schemaDir,
    mapPageIdents,
    template,
    //  supply a function to run query results through a forEach,
    //  is returned with query results from batchCreate
    updateQueryResults = null,
    //  maps to addtionalContext applied only to the page payload
    //  and is not returned from batch create
    //  can apply a static object or function that returns an object
    //  which is destructed into the page context
    updatePageContext = {},
}) {
    const { data: { content } } = await loadCreateQuery(schemaDir)

    if (Object.values(ROUTE_SCHEMA).length) {
        mapPageIdents = ROUTE_SCHEMA[mapPageIdents]
            || mapPageIdents
            || ""
    }

    const pages = mapResultsFromQuery({
        content,
        modifierFn: assignPath(mapPageIdents)
    })

    if (typeof updateQueryResults == "function") {
        Object.values(pages)
            .forEach(updateQueryResults)
    }

    const additionalContext = (typeof updatePageContext == "function")
        ? updatePageContext(pages)
        : updatePageContext

    createPages({
        pages,
        additionalContext,
        template,
    })

    return pages
}



const NO_CREATE_SCRIPTS = "ERROR: Please add pages to create!"

async function create (fn) {
    if (!fn) return [console.log(""), console.error(NO_CREATE_SCRIPTS), console.log("")]

    const passedApi = {
        batchCreate,
        createPage,
        createPages,
        mapResultsFromQuery,
        loadCreateQuery,
        isObject,
        graphql: PAGE_API.graphql
    }

    async function asyncForEach (array) {
        for (let index = 0; index < array.length; index++) {
            const createFn = array[index]
            if (typeof createFn == "function") await array[index](passedApi)
            else await require( path.resolve(array[index]) )(passedApi)
        }
    }

    return (Array.isArray(fn))
        ? await asyncForEach(fn)
        : await fn(passedApi)
}




function initBuildPages ({
    pageApi,
    templateSchema,
    defaultTemplate,
    routeSchema
}) {
    PAGE_API = pageApi
    ROUTE_SCHEMA = routeSchema

    assignTemplateSchema({
        defaultTemplate,
        templateSchema,
    })

    return {
        create
    }
}

module.exports = initBuildPages
