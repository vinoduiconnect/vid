<script>
import { useContext, usePageQuery } from "@useGridsome"

import IndustryPreview from "@Industries/IndustryPreview"
// import PlaceholderBlock from "@Snippets/PlaceholderBlock"
import SectionNavigation from "@Industries/SectionNavigation"

export default {
    name: "IndustriesView",
    inheritAttrs: false,
    components: {
        IndustryPreview,
        // PlaceholderBlock,
        SectionNavigation,
    },
    setup (props, ctx) {
        const {
            ...activeContext
        } = useContext(ctx)

        const { industries } = usePageQuery(
            ctx,
            [
                "industries",
                (node) => ({
                    to: node.path,
                    media: node.crossLink.media
                })
            ]
        )

        return {
            activeContext,
            industries
        }
    }
}
</script>


<template lang="pug">
standard-column-layout.IndustriesView(
    v-bind="activeContext"
)
    template(#append-header)
        section-navigation(
            :routes="industries"
        )

    template(#insert-body)
        template(
            v-for="item in industries"
        )
            industry-preview(
                v-bind="item"
                :key="item.path"
            )
</template>

<page-query>
query {
    industries: allIndustries (
        filter: { isActive: { eq: true } }
        sortBy: "hed"
        order: ASC
    ) {
        edges {
            node {
     		    path
                hed
                lede
                crossLink {
                    media
                }
                # crossLinks {
                #    hed
                #    link
                # }
            }
        }
    }
}
</page-query>

<vefa>
element: {}
</vefa>

<style lang="stylus">
</style>
