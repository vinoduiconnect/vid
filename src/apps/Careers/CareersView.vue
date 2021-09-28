<script>
import { useContext, usePageQuery } from "@useGridsome"

import CareerPreviewCard from "@Careers/CareerPreviewCard"

export default {
    name: "CareersView",
    inheritAttrs: false,
    components: {
        CareerPreviewCard,
    },
    setup (props, ctx) {
        const {
            careers: activeCareers
        } = usePageQuery(ctx, ["careers"])

        return {
            activeContext: useContext(ctx),
            activeCareers
        }
    }
}
</script>

<template lang="pug">
standard-column-layout.CareersView(
    v-bind="activeContext"
)
    template(#insert-body)
        template(
            v-for="career in activeCareers"
        )
            career-preview-card(
                v-bind="career"
            )

        template(
            v-if="!activeCareers.length"
        )
            p(
                v-bind="$vefa.emptyList"
            ) There are no open positions at this time.
</template>

<page-query>
query {
    careers: allCareers (
        filter: { isActive: { eq: true } }
        sortBy: "title"
        order: ASC
    ) {
        edges {
            node {
                path
                title
                lede
            }
        }
    }
}
</page-query>

<vefa>
body:
    at-base: rhy:yStart200 flex:v--p:start--s:start
    at-economy: rhy:yStart400
    at-wide: pad:xStart200

emptyList:
    class: type:base color:accent1--shade edge:xyEq
    at-base: pad:xEq50 pad:yEq50
    at-condensed: module:static flex:hAuto aspect:xAuto
    at-economy: type:major--face:hed--weight:300 pad:yStart50 pad:yEnd75
    at-wide: type:subhed pad:xEq100 pad:yStart100 pad:yEnd125
</vefa>

<style lang="stylus">
</style>
