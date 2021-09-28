require("yamlify/register")
const path = require("path")
const sortCSSmq = require("sort-css-media-queries")

const aliases = require("./src/data/aliases.yaml")
const siteData = require("./content/seo.yaml")
const robotsData = require("./src/data/robots.yaml")

const {
    batchConfig,
    batchFileSystemSource,
    batchTemplateMapping,
    chainWebpack
} = require("./src/utils/gridsome/defaultConfigSetup.js")


const sources = [
    ["Content", "{capabilities,careers,industries,methodologies,success-stories}", "/:contentType/:title"],
    // ["pages", "SitePages"],
    ["Careers", "careers", "/careers/:title"],
    ["Capabilities", "capabilities", "/capabilities/:title"],
    ["Industries", "industries", "/industries/:title"],
    // ["events", "Events"],
    ["Methodologies", "methodologies", "/insights/methodologies/:title"],
    // ["news", "News"],
    // ["press-releases", "PressReleases"],
    ["SuccessStories", "success-stories", "/insights/success-stories/:title"],
    ["Tags", "tags", "/tags/:title"]
    // ["forms", "Forms"],
]

const {
    contentSources,
    templates
} = batchConfig(sources)

const gridsomePlugins = [
    {
        use: "gridsome-plugin-webpack-size",
        options: { development: true }
    },
    {
        use: "gridsome-plugin-robots-txt",
        options: robotsData
    },
    ...contentSources,
    // ...batchFileSystemSource(sources),
]

// const gridsomeTemplates = batchTemplateMapping(sources)

module.exports = {
    siteName: siteData["application-name"],
    siteDescription: siteData.description,
    siteUrl: siteData.url,
    outputDir: process.env.OUTPUT_DIR || null,
    assetsDir: process.env.ASSETS_DIR || null,
    host: "0.0.0.0",
    port: 8080,
    pathPrefix: process.env.STATIC_DIR || "",
    cacheBusting: false,
    catchLinks: false,
    // icon: "./src/res/favicon.png",
    // siteData.favicon || null,
    plugins: gridsomePlugins,
    templates,
    chainWebpack: chainWebpack({ aliases }),
    configureWebpack: {
        module: {
            rules: [
                {
                    resourceQuery: /blockType=vefa/,
                    loader: require.resolve("./vefa/utils/blockLoader.js")
                }
            ]
        },
        plugins: []
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require("css-mqpacker")({ sort: sortCSSmq })]
            },
            stylus: {
                import: [
                    path.resolve(__dirname, "./themes/v2/_config.styl"),
                    path.resolve(__dirname, "./vefa/lib.styl")
                ]
            }
        }
    },
    transformers: {
        //Add markdown support to all file-system sources
        remark: {
            externalLinksTarget: "_blank",
            externalLinksRel: ["nofollow", "noopener", "noreferrer"],
            // plugins: [
            //     "remark-attr"
            // ]
        }
    }
}
