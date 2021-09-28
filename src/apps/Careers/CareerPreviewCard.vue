<script>
import useBreakpoints from "@useBreakpoints"
export default {
    name: "CareersPreviewCard",
    inheritAttrs: false,
    props: {
        lede: {
            type: String,
            default: ""
        },
        path: {
            type: String,
            default: "#"
        },
        title: {
            type: String,
            default: "Career Opportunity"
        },
    },
    setup () {
        const {
            atCondensed
        } = useBreakpoints()

        return {
            atCondensed
        }
    }
}
</script>

<template lang="pug">
article.CareerPreviewCard(
    v-bind="$vefa.element"
)
    header(
        v-bind="$vefa.header"
    )
        h3(
            v-bind="$vefa.hed"
        ) {{ title }}

    p(
        v-bind="$vefa.lede"
    ) {{ lede }}

    footer(
        v-bind="$vefa.footer"
    )
        pcgi-route-control(
            append-vefa-style="minor"
            :to="path"
        )
            template(#insert-label)
                template(v-if="atCondensed") Learn about {{ title }}
                template(v-else) Learn more
</template>

<vefa>
element:
    at-base: module:static flex:v--p:start--s:start rhy:yStart50
#     at-economy: rhy:yStart125
#     at-standard: rhy:yStart150

header:
    at-base: module:static flex:v--p:start--s:start

hed:
    class: type:major--face:hed--weight:300 color:secondary
#     at-economy: type:subhed
#     at-standard: type:hed

lede:
    class: type:minor--face:copy--weight:300
#     at-economy: type:base
#     at-standard: type:major

# footer:
#     at-standard: flex:h
</vefa>
