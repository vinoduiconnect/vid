<script>
import { computed, ref } from "@compose"
import useRouter from "@useRouter"

import { useNavigation, AVAILABLE_NAVS } from "@Navigation/useNavigation"
// import { useIntersectionObserver } from "vue-use-web"

import SiteLogo from "@Site/SiteLogo"

export default {
    name: "LandingStrataNav",
    inheritAttrs: false,
    components: {
        SiteLogo
    },
    props: {
        currentStrata: {
            type: String,
            default: null
        },
        applyNavSchema: {
            type: String,
            default: AVAILABLE_NAVS.PRIMARY
        }
    },
    setup (props, ctx) {
         const {
            navState
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

        //  currently set for inpage links until further content is built out
        const localCurrentStrata = ref(
            `${ props.currentStrata.replace("/", "#") }`
        )

        return {
            routes,
            localCurrentStrata
        }
    },
}
</script>

<template lang="pug">
.LandingStrataNav(
    v-bind="$vefa.element"
)
    div(
        v-bind="$vefa.logoFrame"
    )
        site-logo

    nav(
        v-bind="$vefa.list"
    )
        template(v-for="route in routes")
            li(
                v-bind="$vefa.listItem"
            )
                template(
                    v-if="localCurrentStrata && localCurrentStrata == route.slug"
                )
                    g-link(
                        v-bind="$vefa.currentListLink"
                        :to="route.slug"
                    ) {{ route.label }}

                    p(
                        v-bind="$vefa.content"
                    )
                        slot(name="content")

                template(v-else)
                    g-link(
                        v-bind="$vefa.listLink"
                        :to="route.slug"
                    ) {{ route.label }}
</template>

<style lang="stylus">
.LandingStrataNav
    grid-area: nav
    // padding-left: ratio(5)
    // top: 50vh
    // transform: translateY(-25vh)
</style>

<vefa>
element:
    at-base: module:static
    at-economy: put:yStart--set:sticky--set:zNav pad:yEq200 rhy:yStart200

logoFrame:
    at-base: optics:no
    at-economy: module:static

list:
    at-economy: rhy:yStart100

listItem:
    at-standard: rhy:yStart50

listLink:
    class: type:base--face:hed--weight:400--case:upper--space:zoned color:dark fx:shift
    at-base: optics:no
    at-economy: module:static

currentListLink:
    class: type:hed--face:hed--weight:300 color:dark
    at-standard: type:display

content:
    class: type:minor--face:copy
    at-condensed: aspect:xEq80--pct
    at-standard: aspect:xAuto type:base

</vefa>
