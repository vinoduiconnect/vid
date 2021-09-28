<script>
import { computed } from "@compose"
import { useBreakpoints } from "@features/useBreakpoints"

import { useMediaQuery } from "@vueuse/core"

// import CrosslinkCard from "@Capabilities/CrosslinkCard"

export default {
    name: "CapabilityPreview",
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
                ? `PCGI does ${ props.hed.toLowerCase() }`
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
        h2(
            v-bind="$vefa.hed"
        )
            route-control(
                :label="hed"
                :to="to"
            )

        p.lede(
            v-bind="$vefa.lede"
        ) {{ lede }}

        pcgi-route-control(
            :to="to"
        )
            template(#insert-label) {{ linkLabel }}

    .body(
        v-bind="$vefa.body"
    )
        //- template(v-for="item in crossLinks")
        //-     crosslink-card(
        //-         v-bind="item"
        //-     )
</template>

<vefa>
element:
    at-base: rhy:yStart50
    at-enhanced: rhy:yStart100
    at-standard: rhy:yStart150

header:
    at-base: rhy:yStart50
    at-enhanced: rhy:yStart100
    # at-standard: rhy:yStart150

hed:
    class: type:subhed--face:hed--weight:300 color:secondary fx:shift
    at-extended: type:hed
    at-standard: type:display

lede:
    class: type:minor color:shade
    at-extended: type:base
    at-standard: type:major--weight:300--lead:expand
    # at-wide: type:subhed

body:
    at-base: optics:no
    at-economy: optics:yes module:static flex:v--p:start--s:start pad:yStart100 pad:yEnd200 rhy:yStart100
    at-enhanced: flex:h--p:start--s:start grid:h--gap:xyEq50 rhy:yStart0
    at-extended: grid:h--gap:xyEq150
    at-standard: grid:h--gap:xEq300
</vefa>

<style lang="stylus" scoped>
// .lede
//     max-width: flow(45)

.body
    --columns: 1fr 1fr
</style>
