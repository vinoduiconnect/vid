const {
    getSluggedPage,
} = require(
    path.resolve("src/utils/forestry")
)

module.exports = async function ({ createPage }) {
    const {
        data: insightsPageData,
        ...baseInsightsPageData
    } = getSluggedPage("content/pages/insights.yaml")

    createPage({
        mapPageIdent: "insights",
        data: {
            ...baseInsightsPageData,
            ...insightsPageData
        },
        template: "Insights"
    })
    return
}
