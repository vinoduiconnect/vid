<script>
import { ref, computed } from "@compose"

import useRouter from "@useRouter"
import { useNavigation, AVAILABLE_NAVS } from "@Navigation/useNavigation"

import RouteControl from "@Controls/RouteControl"

export default {
    name: "SiteNavigation",
    inheritAttrs: false,
    components: {
        RouteControl
    },
    props: {
        applyNavSchema: {
            type: String,
            default: AVAILABLE_NAVS.PRIMARY
        }
    },
    setup (props, ctx) {
        const {
            navState,
        } = useNavigation({ type: props.applyNavSchema })

        const {
            currentRoute,
            $route
        } = useRouter({ ctx })

        const routes = computed(
            () => {
                const isIndex = ($route.value.path === "/")

                const routes = navState.routes.reduce(
                    (routes, route) => {
                        let slug = isIndex
                            ? `#${ route.slug }`
                            : route.slug

                        routes.push({
                            ...route,
                            slug
                        })

                        return routes
                    },
                    []
                )

                return routes
            }
        )

        return {
            currentRoute,
            routes
        }
    }
}
</script>

<template lang="pug">
nav.SiteNavigation(
    v-bind="$vefa.element"
)
    slot(name="prepend")

    .SiteNavigation-routes(
        v-bind="$vefa.routes"
    )
        slot(name="insert-routes")
            template(
                v-for="route in routes"
            )
                route-control(
                    v-bind="route"
                    :apply-vefa-style="$vefa.navItem"
                    :key="`${ currentRoute }_${ route.label }`"
                )

    slot(name="append")
</template>

<vefa>
element:
    at-base: optics:a11y
    at-economy: module:static optics:yes put:xStart-yStart--set:abs--set:zRunners flex:h--p:start--s:base
    at-enhanced: pad:yEq100
    at-standard: pad:xEq100
    at-wide: aspect:hFull


routes:
    at-economy: flex:h--p:end--s:middle rhy:xStart150 pad:xEq100
    at-enhanced: rhy:xStart400
    at-standard: rhy:xStart600

navItem:
    element:
        class: type:major--face:hed--weight:300--lead:base color:shade fx:shift
</vefa>

<style lang="stylus">
.SiteNavigation
    .SiteMasthead
        +at-wide()
            padding-left: 0
</style>
