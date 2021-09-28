<script>
import { ref, computed } from "@compose"

import { useNavigation, AVAILABLE_NAVS } from "@Navigation/useNavigation"

import ClipSlideLeft from "@Transitions/ClipSlideLeft"
import RouteControl from "@Controls/RouteControl"

export default {
    name: "ExtendedNavigation",
    inheritAttr: false,
    props: {
        applyNavSchema: {
            type: String,
            default: AVAILABLE_NAVS.PRIMARY
        }
    },
    components: {
        ClipSlideLeft,
        RouteControl
    },
    setup (props, ctx) {
        const {
            navState,
            setNavigationState
        } = useNavigation({ type: props.applyNavSchema })

        const canShowNav = ref(true)

        const isNavActive = computed(
            () => navState.isActive && canShowNav.value
        )

        function handleDrawerClose () {
            if (!navState.isActive) return
            setNavigationState({ state: false })
            canShowNav.value = true
        }

        function handleDrawerLeave () {
            if (!navState.isActive) return

            canShowNav.value = false

            return
        }

        function handleNavLeave () {
            if (!navState.isActive) return

            handleDrawerClose()

            return
        }

        return {
            navState,
            setNavigationState,
            handleDrawerLeave,
            handleNavLeave,
            isNavActive,
        }
    }
}
</script>

<template lang="pug">
.ExtendedNavigation-wrapper(
    v-bind="$vefa.wrapper"
    :class="{ 'is-active': navState.isActive }"
    @click.self="handleDrawerLeave"
)
    clip-slide-left(
        @after-leave="handleNavLeave"
    )
        template(
            #content="{ $appliedVefa }"
        )
            nav.ExtendedNavigation(
                v-bind="vefaAppend($vefa.element, $appliedVefa.element)"
                v-if="isNavActive"
            )
                slot(
                    name="prepend"
                    v-bind="{ handleDrawerLeave, ...$appliedVefa }"
                )

                .ExtendedNavigation-routes(
                    v-bind="$vefa.navList"
                )
                    slot(name="insert-routes")
                        template(
                            v-for="route in navState.routes"
                        )
                            route-control(
                                v-bind="route"
                                :apply-vefa-style="$vefa.navItem"
                                :key="route.label"
                            )

                slot(
                    name="append"
                    v-bind="{ handleDrawerLeave }"
                )

</template>

<vefa>
wrapper:
    at-base: iflex:v put:xyEq--set:fix--set:zModal
    at-economy: optics:no

element:
    class: motif:secondary
    at-base: module:balance grid:h
    at-economy: optics:a11y

navList:
    at-base: flex:v--p:start--s:start rhy:yStart100

navItem:
    element:
        class: type:hed--face:hed--weight:300--lead:base color:secondary--hilite fx:shift
</vefa>

<style lang="stylus">
.ExtendedNavigation
    --columns: flow(1) 1fr flow(1)
    --rows: max-content flow(4.5) max-content 1fr
    grid-template-areas: unquote('
        "header header header"
        ". . ."
        ". list ."
        ". . ."
    ')

    .SiteMasthead
        grid-area: header


.ExtendedNavigation-routes
    grid-area: list


.ExtendedNavigation-wrapper
    pointer-events: none
    transform: translateZ(999)
    overflow-y: auto
    will-change: transform

    &.is-active
        background: rgba(0, 0, 0, .35)
        pointer-events: auto
</style>
