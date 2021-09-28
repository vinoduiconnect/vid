<script>
import { reactive, ref } from "@compose"

// import BackdropMedia from "@Media/BackdropMedia"

export default {
    name: "LandingHero",
    inheritAttrs: false,
    // components: {
    //     BackdropMedia,
    // },
    props: {
        hed: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        media: {
            type: String,
            default: null
        },
        slug: {
            type: String,
            default: null
        },
    },
}
</script>

<template lang="pug">
article.LandingHero(
    v-bind="$vefa.element"
)
    slot(name="hook")
        .LandingHero-hook(
            v-bind="$vefa.hook"
        )
            header.LandingHero-header(
                v-bind="$vefa.header"
            )
                h1.LandingView-hed {{ hed }}

            .LandingHero-body(
                v-bind="$vefa.body"
            )
                p {{ content }}

                route-control(
                    :append-vefa-style="$vefa.control"
                    :label="label"
                    :to="slug"
                )

    backdrop-media.LandingHero-media(
        :append-vefa-style="$vefa.media"
        :media="media"
    )
</template>

<vefa>
element:
    class: motif:bright
    at-base: module:static aspect:xEq100--view flex:v--p:end

hook:
    at-base: module:static--set:zAbove flex:v--p:start--s:start pad:xEq100 rhy:yStart100 iso:yEnd300
    at-economy: module:bounds flex:v--p:middle--s:start aspect:vAuto pad:yEq200

header:
    class: type:xhed--face:hed--weight:300--set:aliased color:primary
    at-economy: type:display module:static pad:yStart200 iso:yStart300
    at-enhanced: type:xdisplay
    at-extended: put--set:fix adj:module
    at-wide: type:broadside

body:
    class: type:minor--face:copy--weight:400 color:dark
    at-base: rhy:yStart100
    at-condensed: type:major aspect:xEq80--view
    at-economy: module:static aspect:xEq45--view
    at-extended: put--set:fix adj:module
    at-standard: pad:xEq200 type:subhed
    at-wide: aspect:xEq40--view pad:xStart0

control:
    element:
        class: type:minor--face:copy--weight:700 color:primary fx:shift
        at-base: module:static
        at-condensed: type:base
        at-standard: type:major

media:
    element:
        at-base: put:xyEq--set:abs
        at-economy: put:xyEq--set:fix

    media:
        class: fx:shift
</vefa>

<style lang="stylus">
.LandingHero
    min-height: 60vh

    &::before
        +at-economy()
            content: ""
            display: block
            width: 100%
            height: flow(6)
            bottom: 0
            left: 0
            right: 0
            position: absolute
            point-events: none
            background: linear-gradient(to top, var(--color-tint), rgba(#fff, 0))
            z-index: 100

        +at-extended()
            z-index: 300

    +at-extended()
        min-height: 90vh

    +at-wide()
        --wide-h: calc(100vh - 305px) // 305px is colophon height
        min-height: var(--wide-h)


.LandingHero-header
    +at-extended()
        --adjust-y: flow(-5)
        --adjust-x: 14vmax

    +at-standard()
        --adjust-x: 16vmax

    +at-wide()
        --adjust-y: flow(-6)
        --adjust-x: 20vmax

.LandingHero-body
    +at-extended()
        --adjust-y: 16vmin
        --adjust-x: 50vmax

    +at-standard()
        --adjust-y: 24vmin
        --adjust-x: 46vmax

    +at-wide()
        --adjust-y: 16vmin
        --adjust-x: 54vmax

.LandingHero-media
    bottom: 60vh
    height: 60vh

    +at-extended()
        bottom: 90vh
        height: 90vh

    +at-wide()
        bottom: var(--wide-h)
        height: var(--wide-h)

    img
        object-position: center right
        filter: brightness(1.75)

        +at-condensed()
            object-position: center

        +at-economy()
            filter: brightness(1.25)
</style>
