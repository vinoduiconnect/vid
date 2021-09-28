<script>
import { computed, ref } from "@compose"
import { useContext } from "@useGridsome"

import { mapContentImageSources } from "@Media/useMedia"

import SectionNavigation from "@Industries/SectionNavigation"


export default {
    name: "IndustryDetail",
    inheritAttrs: false,
    components: {
        SectionNavigation
    },
    setup (props, ctx) {
        const { industries } = useContext(ctx)

        const activeContext = computed(
            () => {
                const {
                    industries,
                    ...activeContext
                } = useContext(ctx)

                return activeContext
            }
        )

        const content = computed(
            () => activeContext.value.content
                ? mapContentImageSources( activeContext.value.content )
                : false
        )

        return {
            activeContext,
            industries,
            content
        }
    }
}
</script>


<template lang="pug">
standard-column-layout.IndustryDetail(
    v-bind="activeContext"
)
    template(#append-header)
        section-navigation(
            :routes="industries"
        )

    template(#insert-body)
        .IndustryDetail-content(
            v-bind="$vefa.content"
            v-html="content"
            v-if="content"
        )
</template>

<vefa>
content:
    class: type:minor
    at-base: rhy:yStart100
    at-economy: type:base
    at-standard: type:major--weight:300--lead:expand

# crosslinks:
#     at-base: flex:v--p:start--s:start rhy:yStart200
#     at-enhanced: grid:v--gap:xEq50--gap:yEq200 rhy:yStart0
#     at-extended: grid:v--gap:xEq150--gap:yEq200
#     at-standard: grid:v--gap:xEq300--gap:yEq200

# crosslinkHed:
#     class: type:major--face:hed--weight:300--case:upper color:neutral
#     at-standard: type:subhed
</vefa>

<style lang="stylus">
.IndustryDetail-content
    p:first-child
        +at-standard()
            padding-top: 66px

    h1,
    h2
        stack: hed
        typeSet: subhed
        font-weight: 300
        color: var(--color-secondary-hilite)

        +at-extended()
            padding-top: flow(.5)

        +at-standard()
            typeSet: display
            padding-top: 0

        &:not(:first-child)
            margin-top: flow(2)

            +at-economy()
                margin-top: flow(3)

    h2
        filter: brightness(75%)

        +at-standard()
            typeSet: hed

    strong
        color: var(--color-secondary-shade)

    a
        color: var(--color-primary)
        text-decoration: underline

    ul
        li
            list-style: circle
            margin-left: flow(1.25)

        > * + *
            margin-top: flow(.25)

</style>
