<script>
import { computed } from "@compose"
import { useCrossLink } from "@Cards/useCrossLinks"

import LandingStrataNav from "@Landing/LandingStrataNav"

export default {
    name: "IndustriesStrata",
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
section.IndustriesStrata(
    id="industries"
    v-bind="$vefa.element"
)
    landing-strata-nav(
        :current-strata="generatedPageProps.link"
    )
        template(#content).
            {{ generatedPageProps.lede }}

    ul.IndustriesStrata-list(
        v-bind="$vefa.list"
    )
        template(
            v-for="item in generatedCrossLinks"
        )
            li.IndustriesStrata-listItem(
                v-bind="$vefa.listItem"
            )
                route-control(
                    :append-vefa-style="$vefa.link"
                    :label="item.hed"
                    to="/#industries"
                )
                //- //- :to="item.link"

                backdrop-media(
                    :append-vefa-style="$vefa.media"
                    :media="item.media"
                )


        li.IndustriesStrata-listItem(
            v-bind="$vefa.listItem"
        )
            route-control(
                :append-vefa-style="$vefa.link"
                :label="learnMore.hed"
                to="/#industries"
            )
            //- :to="page.link"

            backdrop-media(
                :append-vefa-style="$vefa.media"
                :media="learnMore.media"
            )

</template>

<vefa>
element:
    at-base: module:static--set:zAbove flex:v--p:start--s:start pad:xEq100 pad:yEq300 rhy:yStart300
    at-economy: grid:v rhy:yStart0
    at-standard: grid:v--gap:xEq200 pad:xEq200
    at-wide: aspect:hFull

list:
    at-base: module:static flex:v grid:vAuto--gap:xyEq100
    at-economy: module--p:end put:yStart--set:sticky pad:yEq200
    at-extended: grid:vAuto--gap:xyEq150--p:end

listItem:
    class: edge:xyEq0--drop:set100
    at-base: module:static flex:v--p:end--s:end pad:xEq50 pad:yEq25

link:
    element:
        class: type:subhed--face:hed--weight:300 color:bright fx:bounds
        at-base: el--set:zAbove
        at-economy: type:hed

media:
    element:
        class: motif:dark
        at-base: put:xyEq--set:abs--set:zBelow
</vefa>


<style lang="stylus">
.IndustriesStrata
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

.IndustriesStrata-list
    --columns: repeat(var(--count-set, 1), minmax(0, var(--min-col-width, 1fr)))
    --rows: 50vw
    grid-area: list

    +at-condensed()
        --count-set: 2
        --rows: "calc(50vw - %s)" % flow(1)

    +at-economy()
        --count-set: 1
        --rows: 25vw

    +at-enhanced()
        --min-col-width: flow(24)
        --rows: 20vw

    +at-extended()
        --count-set: 2
        --rows: flow(12)

    +at-wide()
        // max-width: 848px (content aarea of other stratas)
        --min-col-width: "calc(424px - %s)" % flow(1.5)

.IndustriesStrata-listItem
    &::after
        content: ""
        background: linear-gradient(to bottom, rgba(#fff, 0), rgba(#0C2131, .75))
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        opacity: 1
        pointer-events: none
        transform: none
        z-index: 1
</style>
