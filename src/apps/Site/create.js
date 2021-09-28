const _ = require("lodash")
const {
    getSluggedPage,
    getSluggedPageLink,
    getSluggedPageCrossLink
} = require(
    path.resolve("src/utils/forestry")
)

module.exports = async function ({ createPage, graphql }) {
    //  we can use graphql to get our page reults into $context~
    // let c = await graphql(`
    // query ($path: String!) {
    //     content: capabilities (
    //         path: $path
    //     ) {
    //         path
    //         content
    //         hed
    //         lede
    //     }
    // }
    // `, { path: '/capabilities/data-and-analytics/' })

    // console.log(c.data.content)
    //  create Homepage
    const homeData = require(
        path.resolve("content/pages/homepage.yaml")
    )

    homeData.hero.slug = getSluggedPageLink(homeData.hero.slug)

    const videoMap = new Map(
        require(
            path.resolve("content/videos.yaml")
        ).videoMap
    )

    const typesMap = new Map([
        ["Industries", "industriesStrata"],
        ["Capabilities", "capabilitiesStrata"],
        ["Insights", "insightsStrata"],
        ["Methodology", "methodology"],
        ["Success Story", "successStory"],
        ["General Content", "contentStrata"],
        ["Call to Action", "linkStrata"],
        ["Quote", "quoteStrata"],
    ])

    function mapCrossLink (crossLink) {
        function objMap () {
            const contentType = typesMap.get(crossLink.contentType)

            crossLink = {
                ...crossLink,
                ...crossLink[contentType]
            }

            typesMap.forEach(
                (value) => delete crossLink[value]
            )
        }

        (_.isObject(crossLink)) && objMap()

        crossLink = getSluggedPageCrossLink(
            crossLink,
            "link"
        )

        return crossLink
    }

    homeData.strata = homeData.strata.map(
        (stratum) => {
            const stratumType = typesMap.get(stratum.type || stratum.layout)

            //  expose up the data for a particular content strata
            stratum = {
                ...stratum,
                ...stratum[stratumType],
                ...stratum.videoConfig
            }

            if (stratum.video) {
                stratum.video = videoMap.get(stratum.video)
            }

            if (stratum.page) {
                stratum.page = getSluggedPageCrossLink(stratum.page)
            }

            if (stratum.crossLinks) {
                stratum.crossLinks = stratum.crossLinks.map(
                    mapCrossLink
                )
            }

            if (stratum.spotlight) {
                stratum.spotlight = stratum.spotlight.map(
                    mapCrossLink
                )
            }

            if (stratum.slug) {
                stratum.slug = getSluggedPageLink(stratum.slug)
            }

            stratum.template = _.kebabCase(stratumType)


            typesMap.forEach(
                (value) => delete stratum[value]
            )
            delete stratum.videoConfig
            // console.log(stratum)

            return stratum
        }
    )

    createPage({
        id: "homepage",
        data: homeData,
        template: "Homepage"
    })

    //  create USCIS page
    const uscisData = require(
        path.resolve("content/uscis.yaml")
    )

    createPage({
        id: "uscis",
        data: uscisData,
        template: "ListView"
    })

    //  create Error page
    createPage({
        id: "error404",
        data: {
            hed: "We aren't able to find what you're looking for.",
            lede: "Hit the back button and try again or use our Sitemap below."
        },
        template: "Error404"
    })

    return {  }
}
