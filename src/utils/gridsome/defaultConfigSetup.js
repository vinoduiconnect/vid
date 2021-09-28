const _ = require("lodash")

function fileSystemSource ({ dataSourceDir, typeName }) {
    const path = (_.endsWith(dataSourceDir, ".yaml") || _.endsWith(dataSourceDir, ".md"))
        ? `content/${ dataSourceDir }`
        : `content/${ dataSourceDir }/**`

    return {
        use: "@gridsome/source-filesystem",
        options: {
            path,
            typeName
        }
    }
}

function batchTemplateMapping (sources) {
    return sources.reduce(
        (templateMap, source) => {
            if (source[2]) templateMap[source[0]] = source[2]
            return templateMap
        },
        {}
    )
}

function batchFileSystemSource (sources) {
    return sources.map(
        source => fileSystemSource({
            typeName: source[0],
            dataSourceDir: source[1]
        })
    )
}

function chainWebpack ({ aliases, devMode = false }) {
    return (config) => {
        const data = { basedir: (() => [__dirname, "src"].join("/"))() }

        devMode && config.mode('development')

        Object.entries(aliases).forEach(
            ([key, path]) => config.resolve.alias.set(key, path)
        )

        /* eslint-disable */
        config.module
            .rule("docs")
            .test(/\.(pdf|doc|docx|rtf)$/i)
            .use("file-loader")
                .loader("file-loader")
                .tap(
                    options => ({
                        ...options,
                        outputPath: "assets/files/",
                        name: '[name].[ext]',
                        // regExp: /\.(pdf|doc|docx)$/i
                        // assets/files/
                    })
                )
                .end()

        config.module.rules.delete("svg")
        config.module
            .rule("svg")
            .test(/\.svg$/)
            .use("vue")
                .loader("vue-loader")
                .end()
            .use("svg-to-vue-component")
                .loader("svg-to-vue-component/loader")
                .end()

        config.module
            .rule("js")
            .use("babel-loader")
                .loader("babel-loader")
                .tap(
                    options => {
                        options.babelrc = true
                        return options
                    }
                )
                .end()

        config.module
            .rule("pug")
            .test(/\.pug$/)
            .use("pug-plain")
                .loader("pug-plain-loader")
                .tap(() => data)
                .end()
        /* eslint-enable */
    }
}

function batchConfig (sources) {
    return {
        contentSources: batchFileSystemSource(sources),
        templates: batchTemplateMapping(sources)
    }
}

module.exports = {
    batchConfig,
    batchTemplateMapping,
    batchFileSystemSource,
    fileSystemSource,
    chainWebpack
}
