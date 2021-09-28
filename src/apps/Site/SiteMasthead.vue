<script>
import SiteLogo from "@Site/SiteLogo"

export default {
    name: "SiteMasthead",
    inheritAttr: false,
    components: {
        SiteLogo
    },
    props: {
        logoStyle: {
            type: String,
            default: "dark"
        }
    },
}
</script>

<template lang="pug">
header.SiteMasthead(
    v-bind="$vefa.element"
)
    slot(
        name="prepend"
        v-bind="$appliedVefa"
    )
        site-logo.SiteMasthead-logo(
            :append-vefa-style="logoStyle"
        )

    slot(
        name="append"
        v-bind="$appliedVefa"
    )
</template>

<style lang="stylus">
// .SiteMasthead-logo
//     max-width: 25%
</style>

<vefa>
element:
    at-base: module:static iflex:h--p:grid--s:middle pad:xyEq100

mobile:
    element:
        at-base: put:xStart-yStart--set:abs--set:zAbove aspect:xEq100--view
        at-economy: optics:a11y

menuControl:
    element:
        class: color:shade fx:shift
        at-base: aspect:xyEq150--text

    icon:
        at-base: aspect:xyEq150--text

closeControl:
    element:
        class: color:secondary--hilite fx:shift
        at-base: aspect:xyEq150--text

    icon:
        at-base: aspect:xyEq150--text
</vefa>
