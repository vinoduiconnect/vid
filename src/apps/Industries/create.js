const { getSluggedPage } = require(
    path.resolve("src/utils/forestry")
)

module.exports = async function ({ batchCreate, createPage }) {
    const createLocalNav = (industries) => ({
        industries: Object.values(industries)
            .map( ({ path, hed }) => ({ hed, to: path }) )
    })

    const industries = await batchCreate({
        schemaDir: "Industries",
        mapPageIdents: "industry",
        template: "IndustryDetail",

        //  maps to addtionalContext applied only to the page payload
        //  and is not returned from batch create
        //  can apply a static object or function that returns an object
        //  which is destructed into the page context
        updatePageContext: createLocalNav,
    })

    const {
        data: industryPageData,
        ...baseIndustryPageData
    } = getSluggedPage("content/pages/industries.yaml")

    createPage({
        mapPageIdent: "industry",
        data: {
            ...baseIndustryPageData,
            ...industryPageData,
        },
        template: "Industries"
    })

    return
}
