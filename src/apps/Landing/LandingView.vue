<script>
import Vue from "vue"
import { reactive, ref } from "@compose"

import { useContext } from "@useGridsome"

import CapabilitiesStrata from "@Capabilities/CapabilitiesStrata"
import ContentStrata from "@Snippets/SnippetStrata"
import LinkStrata from "@Snippets/LinkStrata"
import IndustriesStrata from "@Industries/IndustriesStrata"
import InsightsStrata from "@Insights/InsightsStrata"
import QuoteStrata from "@Snippets/QuoteStrata"
import LandingHero from "@Landing/LandingHero"

export default {
    name: "LandingView",
    inheritAttrs: false,
    metaInfo: {
        bodyAttrs: {
            class: "no-background"
        }
    },
    components: {
        CapabilitiesStrata,
        IndustriesStrata,
        InsightsStrata,
        LandingHero,
        LinkStrata,
        QuoteStrata,
        ContentStrata,
    },
    setup (props, ctx) {
        return {
            ...useContext(ctx)
        }
    }
}
</script>


<template lang="pug">
main.LandingView(
    v-bind="$vefa.element"
)
    slot(name="hero")
        landing-hero(
            v-bind="hero"
        )

    template(v-for="item in strata")
        component(
            class="motif:tint"
            :is="item.template"
            v-bind="item"
        )
</template>


<vefa>
element:
    at-base: module:balance--index:next--set:zBase flex:v--p:start

</vefa>

<style lang="stylus">
.LandingView
    --strata-min-height: auto

    > article
    > section
    > aside
        scroll-snap-stop: always
        // scroll-snap-align: start -- causes long content to bounce back to top and become inaccessible

    +at-extended()
        --strata-min-height: 100vh

    +at-wide()
        --strata-min-height: calc(100vh - var(--footer-height))
        // var(--footer-height) is set in App.vue
</style>
