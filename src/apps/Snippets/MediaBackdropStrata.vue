<script>
import { ref, reactive } from "@compose"

const PROP_TYPES = {
    STRING: {
        type: String,
        default: null
    }
}

const LAYOUTS = {
    CONTENT: "content-layout",
    LINK: "link-layout",
    QUOTE: "quote-layout",
}

const STRUCTURE_SCHEMA = {
    [LAYOUTS.CONTENT]: {
        element: "aside",
        body: "div",
        showContentHed: false
    },
    [LAYOUTS.LINK]: {
        element: "aside",
        body: "header",
        showContentHed: true
    },
    [LAYOUTS.QUOTE]: {
        element: "aside",
        body: "blockquote",
        showContentHed: false
    },
}

const DIRECTION = {
    START: "elementStart",
    END: "elementEnd"
}

export default {
    name: "MediaBackdropStrata",
    inheritAttrs: false,
    props: {
        content: PROP_TYPES.STRING,
        hed: PROP_TYPES.STRING,
        label: PROP_TYPES.STRING,
        slug: PROP_TYPES.STRING,
        minorText: PROP_TYPES.STRING,

        contentDirection: {
            type: String,
            default: "start",
            validator: type => Object.keys(DIRECTION).includes(type.toUpperCase())
        },

        layout: {
            type: String,
            default: LAYOUTS.CONTENT,
            validator: type => Object.values(LAYOUTS).includes(type)
        }
    },
    setup (props, ctx) {
        const generatedLink = reactive({
            label: props.label,
            to: props.slug
        })

        const generatedContent = ref(props.content)

        const generatedDirection = ref(DIRECTION[props.contentDirection.toUpperCase()])

        return {
            generatedContent,
            generatedDirection,
            generatedLink,
            structure: STRUCTURE_SCHEMA[props.layout]
        }
    }
}
</script>

<template lang="pug">
component(
    v-bind="vefaAppend($vefa.element, $vefa[generatedDirection].element, $vefa[layout].element)"
    :is="structure.element"
)

    slot(
        name="header"
        v-bind="$appliedVefa"
        v-if="hed && !structure.showContentHed"
    )
        h2(
            v-bind="vefaAppend($vefa.hed, $vefa[layout].hed)"
        ) {{ hed }}

    slot(
        name="body"
        v-bind="$appliedVefa"
    )
        component(
            v-bind="$vefa.body"
            :is="structure.body"
            :variant="layout"
        )
            h2(
                v-bind="vefaAppend($vefa.hed, $vefa[layout].hed)"
                v-if="hed && structure.showContentHed"
            ) {{ hed }}

            p(
                v-bind="vefaAppend($vefa.content, $vefa[layout].content)"
                v-if="generatedContent"
            ) {{ generatedContent }}

            cite(
                v-bind="vefaAppend($vefa.minor, $vefa[layout].minor)"
                v-if="minorText"
            ) {{ minorText }}

            pcgi-route-control(
                bound-to-parent-element
                v-if="generatedLink.to"
                :label="generatedLink.label"
                :to="generatedLink.to"
            )

    slot(
        name="media"
        v-bind="$appliedVefa"
    )
</template>

<vefa>
element:
    class: MediaBackdropStrata
    at-base: module:static--set:zAbove flex:h--p:start--s:start pad:xEq100 pad:yEq200
    at-economy: put:yStart--set:sticky pad:xEq100
    at-standard: pad:xEq200
    at-wide: aspect:hFull

body:
    class: MediaBackdropStrata-Body motif:bright--drop:set200
    at-base: module:static flex:v--p:start--s:start pad:xEq100 pad:yStart100 pad:yEnd150 rhy:yStart100
    at-economy: aspect:xEq50--view rhy:yStart100
    at-standard: pad:xyEq200 pad:yEnd250 rhy:yStart200

hed:
    class: type:subhed--face:hed--weight:300
    at-economy: type:hed

content:
    class: type:major

minor:
    class: type:major--face:hed--weight:300 color:neutral
    at-enhanced: module:static--self:yEnd

media:
    element:
        class: MediaBackdropStrata-Media motif:dark
        at-base: put:xyEq--set:abs

    media:
        class: fx:shift

elementStart:
    element:
        at-condensed: flex:h--p:start--s:middle

elementEnd:
    element:
        at-condensed: flex:h--p:end--s:middle

content-layout:
    element: {}

    hed:
        class: color:bright
        at-base: optics:a11y
        at-enhanced: module:static optics:yes iso:xEndAuto
        at-extended: type:xdisplay

    content:
        class: color:neutral

quote-layout:
    element: {}

    content:
        class: type--face:hed--weight:300 color:primary
        at-economy: type:subhed

    hed:
        class: color:primary
        at-extended: type:xhed

    minor: {}

link-layout:
    element: {}

    content:
        class: color:neutral

    hed:
        class: color:primary
        at-extended: type:xhed

    minor: {}

    control:
        element:
            at-base: aspect:xEq100--pct
            at-condensed: aspect:xAuto
</vefa>

<style lang="stylus">
.MediaBackdropStrata-Body[variant="quote-layout"]
    max-width: flow(35)

.MediaBackdropStrata-Body[variant="link-layout"]
    max-width: flow(30)

.MediaBackdropStrata-Body[variant="content-layout"]
    max-width: flow(30)

.MediaBackdropStrata-Media
    --local-offset: flow(3)
    bottom: var(--local-offset)
    top: var(--local-offset)
    height: calc(100% - (var(--local-offset) * 2))

    +at-standard()
        --local-offset: flow(4)
</style>
