require('yamlify/register')

module.exports = function ({ onCreateNode, loadSource, createPages }) {

    const {
        getSluggedPageLink
    } = require("./src/utils/forestry")

    onCreateNode(
        (options) => {
            const typeName = options.internal.typeName

            const optCode = {
                Tags () {
                    // options.id = options.link
                },
                // Content () {
                //     console.log(options.path)
                //     if (["success story", "methodology", "industry"].includes(options.contentType)) {
                //         options.path = `/insights${ options.path }`
                //         console.log(options.path)
                //     }
                // },
                Methodologies () {
                    options.tags = options.categories.tags
                    options.appliedIndustry = options.categories.appliedIndustry
                    options.appliedCapability = options.categories.appliedCapability
                },
                SuccessStories () {
                    options.tags = options.categories.tags
                    options.appliedIndustry = options.categories.appliedIndustry
                    options.appliedCapability = options.categories.appliedCapability
                },
                Default () {
                    // options.id = options.fileInfo.path
                }
            }

            //  change "public" id to match fileInfo.path for ease of use if needed
            options.id = options.fileInfo.path

            optCode[typeName]
                ? optCode[typeName]()
                : optCode.Default()
        }
    )

    loadSource(
        ({ getCollection }) => {
            //  This might be the reverse of what we want to do,
            //  but works for now
            const tags = getCollection("Tags")
            tags.addReference("link", "Content")

            const methodologies = getCollection("Methodologies")
            methodologies.addReference("tags", "Tags")
            methodologies.addReference("appliedIndustry", "Industries")
            methodologies.addReference("appliedCapability", "Capabilities")
            const stories = getCollection("SuccessStories")
            stories.addReference("tags", "Tags")
        }
    )

    // onCreateNode(
    //     (options, collection) => {
    //         //  link tags
    //         if (options.internal.typeName === "Tags" ) {
    //             console.log(collection.addReference)
    //             const newLink = routeSchema[options.link]
    //             options.link = newLink
    //         }
    //     }
    // )

    // loadSource(
    //     ({ addCollection, getCollection, store }) => {

    //         const {
    //             createNodes,
    //         } = require("./src/utils/gridsome/collectionsHelpers")

    //         const {
    //             getSluggedPageLink
    //         } = require("./src/utils/forestry")

    //         const tags = getCollection("Tags")

    //         console.log(tags)
    //         // createNodes(
    //         //     tagLibraryData.routes,
    //         //     ([id, data], order) => {
    //         //         tags.addNode({
    //         //             id: data.tag,
    //         //             link: getSluggedPageLink(data.page)
    //         //         })
    //         //     }
    //         // )
    //     }
    // )

    createPages(
        async (pageApi) => {
            const { create } = require(
                path.resolve("src/utils/gridsome/buildPages")
            )({
                pageApi,
                templateSchema: require("./src/data/templates.yaml"),
                defaultTemplate: "views/SiteView",
                routeSchema: require("./src/data/baseRoutes.yaml")
            })

            const pageTypes = [
                "Site",
                // "Forms",
                "Capabilities",
                "Industries",
                "Careers",
                // "Methodologies",
                // "Events",
                // "News",
                // "PressReleases",
                // "SuccessStories",
                // "Insights",
            ]

            create(
                pageTypes.map( type => `./src/apps/${ type }/create` )
            )

            return
        }
    )
}
