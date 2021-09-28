<script>
import { reactive, ref } from "@compose"
import { useTags } from "@Tags/useTags"

export default {
    name: "InsightCrosslinkCard",
    inheritAttrs: false,
    props: {
        lede: {
            type: String,
            default: null
        },
        eventTitle: {
            type: String,
            default: null
        },
        source: {
            type: String,
            default: null
        },
        section: {
            type: String,
            default: null
        },
        link: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: null
        },
        hed: {
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
article.InsightCrosslinkCard(
    v-bind="$vefa.element"
)
    header(
        v-bind="$vefa.header"
    )
        h3(
            v-bind="$vefa.hed"
        ) {{ hed }}

        p(
            v-bind="$vefa.content"
        )
            g-link(
                v-bind="$vefa.contentLink"
                to="/"
            ) {{ lede }}
            //- :to="link"

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
                )   {{ leadTag.title }}
        //-         //- :to="leadTag.link"
        //-     template(v-else).
        //-         {{ source || eventTitle }}
</template>

<vefa>
element:
    at-base: module:static flex:v--p:start--s:start rhy:yStart50

header:
    at-base: module:balance flex:v--p:start--s:start rhy:yStart50

hed:
    class: type:major--face:hed--case:cap--weight:300 color:secondary fx:shift
    at-standard: type:subhed

content:
    class: type:minor--face:copy--weight:700 color:shade

contentLink:
    class: e--set:zAbove fx:bounds

meta:
    at-base: module:static flex:h--p:start--s:start rhy:xStart25

metaItem:
    class: type:caption--face:hed--case:upper--space:loose--set:noWrap color:primary fx:shift

metaTag:
    class: type:caption--face:hed--case:upper--space:loose--set:truncate color:primary fx:shift
</vefa>
