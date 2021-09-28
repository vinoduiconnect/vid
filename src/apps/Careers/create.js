const careersLandingData = require(
    path.resolve("content/pages/careers.yaml")
)

module.exports = async function ({ batchCreate, createPage }) {

    // generate Careers Detail Pages
    const careers = await batchCreate({
        schemaDir: "Careers",
        mapPageIdents: "career",
        template: "CareerDetail",
        //  maps to addtionalContext applied only to the page payload
        //  and is not returned from batch create
        //  can apply a static object or function that returns an object
        //  which is destructed into the page context
        updatePageContext: {
            parentHed: careersLandingData.hed,
            parentLede: careersLandingData.lede,
            parentId: careersLandingData.slug || careersLandingData.id
        },
    })

    //  generate Careers List Page
    createPage({
        id: careersLandingData.slug || careersLandingData.id,
        data: careersLandingData,
        template: "CareersList"
    })

    return
}
