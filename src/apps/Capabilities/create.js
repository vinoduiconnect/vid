const {
    getSluggedPage,
    getSluggedPageCrossLink
} = require(
    path.resolve("src/utils/forestry")
)

module.exports = async function ({ batchCreate, createPage }) {

    const createLocalNav = (capabilities) => ({
        capabilities: Object.values(capabilities)
            .map( ({ path, hed }) => ({ hed, to: path }) )
    })

    // function applyCrossLinks (page) {
    //     page.crossLinks = page.crossLinks.map(
    //         (crosslink) => getSluggedPageCrossLink(crosslink, "link")
    //     )
    // }

    //  generate Capabilities Detail Pages
    const capabilities = await batchCreate({
        schemaDir: "Capabilities",
        mapPageIdents: "capability",
        template: "CapabilityDetail",

        // //  supply a function to run query results through a forEach,
        // //  is returned with query results from batchCreate
        // updateQueryResults: applyCrossLinks,

        //  maps to addtionalContext applied only to the page payload
        //  and is not returned from batch create
        //  can apply a static object or function that returns an object
        //  which is destructed into the page context
        updatePageContext: createLocalNav,
    })


    //  generate Capabilities Landing Page
    const {
        data: capabilityPageData,
        ...baseCapabilityPageData
    } = getSluggedPage("content/pages/capabilities.yaml")

    createPage({
        mapPageIdent: "capability",
        data: {
            ...baseCapabilityPageData,
            ...capabilityPageData
        },
        template: "Capabilities"
    })
}
