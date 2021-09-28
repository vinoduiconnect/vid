<script>
import { computed } from "@compose"
import { useBreakpoints } from "@features/useBreakpoints"

import { useMediaQuery } from "@vueuse/core"

// import CrosslinkCard from "@Capabilities/CrosslinkCard"

export default {
    name: "IndustryPreview",
    inheritAttrs: false,
    components: {
        // CrosslinkCard,
    },
    props: {
        hed: {
            type: String,
            default: null,
        },
        to: {
            type: String,
            default: null,
        },
        lede: {
            type: String,
            default: null,
        },
        media: {
            type: String,
            default: null
        },
        crossLinks: {
            type: Array,
            default: () => ([])
        },
    },
    setup (props) {
        const {
            atCondensed
        } = useBreakpoints()

        let linkLabel = computed(
            () => atCondensed.value
                ? `Learn about PCGI and ${ props.hed.toLowerCase() }`
                : `Learn more`
        )

        return {
            atCondensed,
            linkLabel
        }
    }
}
</script>

<template lang="pug">
article(
    v-bind="$vefa.element"
)
    header(
        v-bind="$vefa.header"
    )
        g-link(
            v-bind="$vefa.hGroup"
            :to="to"
        )
            h2(
                v-bind="$vefa.hed"
            )
                route-control(
                    :label="hed"
                    :to="to"
                )

            p(
                v-bind="$vefa.lede"
            ) {{ lede }}

        backdrop-media(
            :append-vefa-style="$vefa.media"
            :media="media"
        )

    //- div(
    //-     v-bind="$vefa.body"
    //- )
    //-     //- template(v-for="item in crossLinks")
    //-     //-     crosslink-card(
    //-     //-         v-bind="item"
    //-     //-     )

    footer(
        v-bind="$vefa.footer"
    )
        pcgi-route-control(
            :to="to"
        )
            template(#insert-label) {{ linkLabel }}


</template>

<vefa>
element:
    at-base: rhy:yStart50 pad:yEnd100
    at-condensed: rhy:yStart150
    at-extended: pad:yEnd200
    at-standard: rhy:yStart150 pad:yEnd300

header:
    class: header
    at-base: module:static--drop:set200
    # at-standard: rhy:yStart150

hGroup:
    class: hgroup
    at-base: module:static--set:zAbove flex:v--p:start--s:start pad:xyEq50 rhy:yStart25
    at-standard: pad:xyEq100 rhy:yStart50

hed:
    class: type:subhed--face:hed--weight:300 color:bright fx:shift
    at-extended: type:hed
    at-standard: type:display

lede:
    class: lede type:minor color:bright
    at-extended: type:base
    at-standard: type:major--weight:100--lead:expand aspect:xEq60--pct
    # at-wide: type:subhed

# body:
#     class: body
#     at-base: optics:no
#     at-economy: optics:yes module:static flex:v--p:start--s:start pad:yStart100 pad:yEnd200 rhy:yStart100
#     at-enhanced: flex:h--p:start--s:start grid:h--gap:xyEq50 rhy:yStart0
#     at-extended: grid:h--gap:xyEq150
#     at-standard: grid:h--gap:xEq300

media:
    element:
        class: motif:dark
        at-base: put:xyEq--set:abs--set:zBelow
</vefa>

<style lang="stylus" scoped>
header
    --set-backdrop: rgba(#0C2131, .95)

    &::after
        content: ""
        background: linear-gradient(to bottom, rgba(#fff, 0), var(--set-backdrop))
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        opacity: 1
        pointer-events: none
        transform: none
        z-index: 1

.hgroup
    padding-top: flow(5)

    +at-standard()
        padding-top: flow(10)

.body
    --columns: 1fr 1fr
</style>
