<script>
import { computed } from "@compose"
import { useCrossLink } from "@Cards/useCrossLinks"

import LandingStrataNav from "@Landing/LandingStrataNav"

export default {
    name: "CapabilitiesStrata",
    inheritAttrs: false,
    components: {
        LandingStrataNav,
    },
    props: {
        crossLinks: {
            type: Array,
            default: () => ([])
        },
        page: {
            type: Object,
            default: () => ({})
        },
        learnMore: {
            type: Object,
            default: () => ({})
        },
    },
    setup (props) {
        const generatedPageProps = computed(
            () => useCrossLink(props.page)
        )
        const generatedCrossLinks = computed(
            () => props.crossLinks.map( crossLink => useCrossLink(crossLink) )
        )

        return {
            generatedPageProps,
            generatedCrossLinks
        }
    }
}
</script>


<template lang="pug">
section(
    id="capabilities"
    v-bind="$vefa.element"
)
    landing-strata-nav(
        :current-strata="generatedPageProps.link"
    )
        template(#content).
            {{ generatedPageProps.lede }}

    dl(
        v-bind="$vefa.list"
    )
        template(
            v-for="item in generatedCrossLinks"
        )
            div(
                v-bind="$vefa.serviceGroup"
            )
                dt(
                    v-bind="$vefa.hed"
                )
                    route-control(
                        :append-vefa-style="$vefa.link"
                        :label="item.hed"
                        to="/"
                    )
                        //- :to="item.link"

                dd(
                    v-bind="$vefa.content"
                ) {{ item.lede }}

        div(
            v-bind="$vefa.serviceGroup"
        )
            dt(
                v-bind="$vefa.hed"
            )
                route-control(
                    :append-vefa-style="$vefa.link"
                    :label="learnMore.hed"
                    to="/"
                )
                    //- :to="page.link"

            dd(
                v-bind="$vefa.content"
            ) {{ learnMore.lede }}
</template>

<vefa>
element:
    class: CapabilitiesStrata motif:tint
    at-base: module:static--set:zAbove flex:v--p:start--s:start pad:xEq100 pad:yEq200 rhy:yStart300
    at-economy: grid:v pad:xEq100 rhy:yStart0
    # aspect:hFull
    at-standard: grid:v--gap:xEq200 pad:xEq200
    at-wide: aspect:hFull

list:
    class: CapabilitiesStrata-list
    at-base: rhy:yStart100
    at-condensed: grid:v--gap:xyEq100 rhy:yStart0
    at-economy: grid:v--gap:xyEq200 put:yStart--set:sticky pad:yEq200
    at-enhanced: grid:v--gap:xyEq100
    at-standard: module--p:end grid:v--gap:xyEq150

serviceGroup:
    class: CapabilitiesStrata-group
    at-base: module:static rhy:yStart50

hed:
    class: CapabilitiesStrata-hed type:base--face:hed--weight:300 color:secondary--hilite
    at-base: flex:h--p:start--s:base grid:h--gap:xEq50
    at-enhanced: type:major
    at-standard: type:subhed

link:
    element:
        class: CapabilitiesStrata-link type:major--face:hed--weight:300 color:secondary fx:shift fx:bounds
        at-enhanced: type:subhed
        at-standard: type:hed

content:
    class: CapabilitiesStrata-content type:minor--face:copy--weight:100 color:dark
    at-base: pad:xStart150
    at-enhanced: pad:xStart200
    at-standard: pad:xStart250
</vefa>


<style lang="stylus">
.CapabilitiesStrata
    --columns: 1fr 1fr
    --rows: 0 auto 0
    grid-template-areas: unquote('
        ". ."
        "nav list"
        ". ."
    ')
    min-height: var(--strata-min-height)
    // --strata-min-height is set in LandingView.vue (or parent view)

    +at-enhanced()
        --columns: 2fr 3fr
        --rows: 1fr auto 1fr

    +at-standard()
        --columns: 1fr 3fr

.CapabilitiesStrata-list
    counter-reset: service
    grid-area: list

    +at-condensed()
        --columns: 1fr
        --rows: 1fr

    +at-enhanced()
        --columns: repeat(var(--count-set, 2), minmax(min-content, var(--min-col-width, 1fr)))

    +at-standard()
        --count-set: 2
        --min-col-width: 414px

.CapabilitiesStrata-hed
    grid-template-columns: var(--num-offset, flow(1)) 1fr

    +o-enhanced()
        --num-offset: flow(1.5)

    +at-standard()
        --num-offset: flow(2)


    &::before
        counter-increment: service
        content: "0" counter(service) ":"
        display: block

// // .CapabilitiesStrata-group:last-child
// //     .CapabilitiesStrata-hed
// //         &::before
// //             visibility: hidden
</style>
