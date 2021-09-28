<script>
import { computed, ref } from "@compose"
import { useContext, usePageQuery } from "@useGridsome"

export default {
    name: "CareersDetail",
    inheritAttrs: false,
    setup (props, ctx) {
        const activeContext = computed(
            () => {
                const context = useContext(ctx)

                return {
                    hed: context.parentHed,
                    lede: context.parentLede,
                    parentId: context.parentId,
                    jobTitle: context.title,
                    content: context.content
                }
            }
        )

        const activeCareersList = computed(mapData)

        function mapData () {
            const {
                careers
            } = usePageQuery(
                ctx,
                [
                    "careers",
                    (node) => ({
                        to: node.path
                    })
                ]
            )

            return careers || []
        }

        return {
            activeCareersList,
            activeContext,
        }
    }
}
</script>


<template lang="pug">
standard-column-layout.CareersDetailView(
    v-bind="activeContext"
)
    template(#append-header)
        nav(
            v-bind="$vefa.nav"
        )
            template(v-if="activeCareersList.length")
                h3(
                    v-bind="$vefa.navHeader"
                ) Open positions with PCGI

                template(v-for="activeItem in activeCareersList")
                    route-control(
                        v-bind="activeItem"
                        :append-vefa-style="$vefa.link"
                        :key="activeItem.to"
                    )

            route-control.CareerDetails-returnLink(
                label="Back to Careers"
                :append-vefa-style="$vefa.returnLink"
                :to="activeContext.parentId"
            )

    template(#insert-body)
        header
            h1(
                v-bind="$vefa.hed"
            ) {{ activeContext.jobTitle }}

        div(
            v-bind="$vefa.content"
            v-html="activeContext.content"
        )
</template>

<page-query>
query($path: String!) {
    careers: allCareers(
            filter: {
                isActive: { eq: true }
                path: { ne: $path }
            }
            limit: 3
        ) {
        edges {
            node {
                path
                title
            }
        }
    }
}
</page-query>

<vefa>
hed:
    class: type:subhed--face:hed--weight:300 color:primary
    at-condensed: type:hed
    at-extended: type:xhed
    at-standard: type:xdisplay

content:
    class: copy--main type:minor
    at-economy: type:base

sectionHeader:
    at-base: rhy:yStart25
    at-economy: rhy:yStart50
    at-extended: put:yStart--set:sticky

sectionHed:
    class: type:subhed--face:hed--weight:300 color:shade
    at-condensed: type:hed
    at-extended: type:xhed
    at-standard: type:xdisplay

sectionLede:
    class: type:base--face:hed--weight:300 color:accent1--shade
    at-economy: type:major--lead:loose
    at-enhanced: aspect:xEq80--pct
    at-extended: aspect:xAuto

link:
    element:
        class: type:minor color:primary--hilite fx:shift

returnLink:
    element:
        class: type:minor color:neutral fx:shift

nav:
    at-base: flex:v--p:start--s:start rhy:yStart50
    at-standard: iso:yStart100

navHeader:
    class: type:chrome--case:upper--space:loose color:neutral
</vefa>

<style lang="stylus">
</style>
