<script>
import { reactive, ref } from "@compose"
import { useTags } from "@Tags/useTags"

export default {
    name: "InsightSpotlightCard",
    inheritAttrs: false,
    props: {
        eventTitle: {
            type: String,
            default: null
        },
        source: {
            type: String,
            default: null
        },
        hed: {
            type: String,
            default: null
        },
        lede: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: null
        },
        media: {
            type: String,
            default: null
        },
        link: {
            type: String,
            default: null
        },
        contentType: {
            type: String,
            default: null
        },
        contentTypeLink: {
            type: String,
            default: null
        },
        categories: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props) {
        const {
            findTag
        } = useTags(props)

        const leadTag = ref(
            findTag({ tag: props.categories?.tags?.[0] })
        )

        return {
            leadTag
        }
    }
}
</script>

<template lang="pug">
article.InsightSpotlightCard(
    v-bind="$vefa.element"
)
    header(
        v-bind="$vefa.header"
    )
        h3(
            v-bind="$vefa.content"
        )
            g-link(
                v-bind="$vefa.contentLink"
                to="/"
            ) {{ lede }}
            //- :to="link"

        backdrop-media(
            :append-vefa-style="$vefa.media"
            :media="media"
        )

    dl(
        v-bind="$vefa.meta"
    )
        dt(
            v-bind="$vefa.metaItem"
        )
            g-link(
                to="/"
            )   {{ contentType }}:
            //- :to="contentTypeLink"
        dd(
            v-bind="$vefa.metaTag"
        )
            template(
                v-if="leadTag"
            )
                g-link(
                    to="/"
                ) {{ leadTag.title }}
                //- :to="leadTag.link"
    //-         template(v-else).
    //-             {{ source || eventTitle }}
</template>

<vefa>
element:
    at-base: module:balance flex:v--p:start--s:start rhy:yStart50
    at-enhanced: rhy:yStart100

header:
    at-base: module:balance flex:v--p:start--s:start rhy:yEnd50
    at-enhanced: rhy:yEnd100

content:
    class: type:base--face:copy color:shade
    at-enhanced: type:major

contentLink:
    class: e--set:zAbove fx:bounds

media:
    element:
        class: motif:dark
        at-base: module--index:init--set:zBehind aspect:xEq100--pct aspect:golden--ratio
        at-standard: aspect:16x9--ratio

meta:
    at-base: module:static flex:h--p:start--s:start rhy:xStart25

metaItem:
    class: type:caption--face:hed--case:upper--space:loose--set:noWrap color:primary fx:shift

metaTag:
    class: type:caption--face:hed--case:upper--space:loose--set:truncate color:primary fx:shift
</vefa>
