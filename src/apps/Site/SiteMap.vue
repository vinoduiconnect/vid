<script>
import RouteControl from "@Controls/RouteControl"

export default {
    name: "SiteMap",
    inheritAttrs: false,
    components: {
        RouteControl
    },
    props: {
        routes: {
            type: Array,
            default: () => ([])
        }
    },
}
</script>

<template lang="pug">
nav(
    v-bind="$vefa.element"
)
    template(
        v-for="route in routes"
    )
        li(
            v-bind="$vefa.item"
        )
            route-control(
                v-bind="route"
                active-class=""
                :append-vefa-style="$vefa.link"
                exact-active-class=""
            )

            ul(
                v-bind="$vefa.subnav"
                v-if="route.subnav && route.subnav.routes.length"
            )
                template(
                    v-for="subRoute in route.subnav.routes"
                )
                    route-control(
                        v-bind="subRoute"
                        active-class=""
                        :append-vefa-style="$vefa.subnavLink"
                        exact-active-class=""
                    )
</template>

<style lang="stylus" scoped>
nav
    --columns: repeat(3, 1fr)
    --rows: 1fr

    +at-economy()
        --columns: repeat(2, 1fr) min-content

    +at-extended()
        --columns: repeat(3, 1fr)
        --gap-xEq: 5vw
</style>

<vefa>
element:
    class: type:major--face:hed--weight:300
    at-base: flex:h--p:start--s:base grid:v--gap:yEq200

item:
    at-base: module:static--self:xEq
    at-economy: module:static--self:xAuto

link:
    element:
        class: color:neutral fx:shift

subnav:
    at-base: optics:no
    at-economy: flex:v--p:start--s:start rhy:yStart0 iso:yStart25
    at-extended: iso:yStart50

subnavLink:
    element:
        class: type:minor--face:copy--weight:700 color:primary fx:shift
</vefa>
