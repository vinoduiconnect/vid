<script>
import { computed } from "@compose"
import { useCrossLink } from "@Cards/useCrossLinks"

import LandingStrataNav from "@Landing/LandingStrataNav"
import InsightCrosslinkCard from "@Insights/InsightCrosslinkCard"
import InsightSpotlightCard from "@Insights/InsightSpotlightCard"

export default {
    name: "InsightsStrata",
    inheritAttrs: false,
    components: {
        InsightCrosslinkCard,
        InsightSpotlightCard,
        LandingStrataNav
    },
    props: {
        crossLinks: {
            type: Array,
            default: null
        },
        page: {
            type: Object,
            default: () => ({})
        },
        spotlight: {
            type: Array,
            default: null
        }
    },
    setup (props) {
        const generatedPageProps = computed(
            () => useCrossLink(props.page)
        )

        const generatedSpotlight = computed(
            () => props.spotlight.map( crossLink => useCrossLink(crossLink) )
        )

        const generatedCrossLinks = computed(
            () => props.crossLinks.map( crossLink => useCrossLink(crossLink) )
        )

        return {
            generatedPageProps,
            generatedCrossLinks,
            generatedSpotlight,
        }
    }
}
</script>


<template lang="pug">
section.InsightsStrata(
    id="insights"
    v-bind="$vefa.element"
)
    landing-strata-nav(
        :current-strata="generatedPageProps.link"
    )
        template(#content).
            {{ generatedPageProps.lede }}

    .InsightsStrata-list(
        v-bind="$vefa.list"
    )
        .InsightsStrata-spotlight(
            v-bind="$vefa.spotlights"
        )
            template(v-for="block in generatedSpotlight")
                insight-spotlight-card(
                    v-bind="block"
                )

        .InsightsStrata-crosslinks(
            v-bind="$vefa.crosslinks"
        )
            template(v-for="block in generatedCrossLinks")
                insight-crosslink-card(
                    v-bind="block"
                )


</template>

<vefa>
element:
    class: motif:tint
    at-base: module:static--set:zAbove flex:v--p:start--s:start pad:xEq100 pad:yEq200 rhy:yStart300
    at-economy: grid:v rhy:yStart0
    at-standard: grid:v--gap:xyEq200 pad:xEq200
    at-wide: aspect:hFull

list:
    at-base: module:static flex:v--p:start--s:start rhy:yStart300
    at-economy: module--p:end put:yStart--set:sticky pad:yEq200
    at-standard: flex:h--p:end--s:full grid:v rhy:yStart0

spotlights:
    at-base: module:static flex:v--p:start--s:start rhy:yStart200
    at-economy: grid:v--gap:xyEq200 rhy:yStart0

crosslinks:
    at-base: module:static flex:v rhy:yStart200
    at-condensed: grid:vAuto--gap:xyEq150 rhy:yStart0
    at-economy: grid:vAuto--gap:xyEq100
    at-extended: grid:vAuto--gap:xyEq200
</vefa>


<style lang="stylus">
.InsightsStrata
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

.InsightsStrata-list
    --columns: minmax(auto, flow(30)) minmax(auto, flow(20))
    --gap-xyEq: flow(3)
    grid-area: list
    grid-template-areas: unquote('
        "spotlights crosslinks"
    ')

.InsightsStrata-spotlight
    --columns: 1fr
    --rows: max-content
    grid-area: spotlights

    +at-extended()
        --columns: 1fr 1fr

    +at-standard()
        --columns: 1fr

.InsightsStrata-crosslinks
    --columns: 1fr 1fr
    --rows: auto
    grid-area: crosslinks

    +at-standard()
        --columns: 1fr
        --rows: min-content
        --gap-yEq: flow(4)

</style>
