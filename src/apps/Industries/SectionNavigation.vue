<script>
import { ref } from "@compose"
import { orderByAlpha } from "@utils/ordering"

export default {
    name: "IndustriesSectionNavigation",
    inheritAttrs: false,
    props: {
        routes: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props) {
        const orderedRoutes = orderByAlpha(
            props.routes,
            "hed"
        )

        return {
            orderedRoutes
        }
    }
}
</script>

<template lang="pug">
nav.IndustriesNav(
    v-bind="$vefa.nav"
)

    slot(
        name="prepend"
        v-bind="$appliedVefa"
    )
        header(
            v-bind="$vefa.header"
        )
            h4(
                v-bind="$vefa.hed"
            ) PCGI serves:

    template(
        v-for="item in routes"
    )
        route-control(
            :apply-vefa-style="$vefa.route"
            :to="item.to"
            :label="item.hed"
        )

    slot(
        name="append"
        v-bind="$appliedVefa"
    )
</template>

<vefa>
route:
    label:
        class: type:minor color:shade fx:shift
        at-wide: type:major
nav:
    at-base: optics:a11y
    at-economy: optics:yes module:static flex:v--p:start--s:start pad:yStart100 rhy:yStart50
    at-extended: flex:h--p:start--s:base grid:v--gap:yEq100 rhy:yStart0

header:
    class: type:minor--case:upper--weight:300 color:primary
</vefa>

<style lang="stylus" scoped>
nav
    --columns: 1fr 1fr

header
    grid-column: span 2

.is-exact-active
    font-weight: 700
</style>
