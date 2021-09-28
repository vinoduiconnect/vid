<script>
import { ref } from "@compose"
import { useContext } from "@useGridsome"

export default {
    name: "Error404View",
    inheritAttr: false,
    setup (props, ctx) {
        const $context = useContext(ctx)
        return {
            ...$context
        }
    }
}
</script>

<template lang="pug">
main.Error404View(
    v-bind="$vefa.element"
)
    header.Error404View-header(
        v-bind="$vefa.header"
    )
        h1(
            v-bind="$vefa.hed"
        ) {{ hed }}

        p(
            v-bind="$vefa.lede"
        ) {{ lede }}
</template>

<vefa>
element:
    at-base: module:balance--index:next--set:zBase flex:v--p:start pad:xEq100 pad:yEq300 iso:yStart200 rhy:yStart200
    at-economy: flex:v--p:middle--s:start pad:yEq300 iso:yStart0 rhy:yStart0
    at-standard: pad:xEq200
    at-wide: aspect:hFull

header:
    at-base: rhy:yStart25
    at-economy: rhy:yStart50
    at-standard: rhy:yStart100

hed:
    class: type:subhed--face:hed--weight:300 color:shade
    at-condensed: type:hed
    at-extended: type:xhed
    at-standard: type:xdisplay

lede:
    class: type:base--face:hed--weight:300 color:accent1--shade
    at-economy: type:major--lead:loose
    at-enhanced: aspect:xEq80--pct
    at-extended: aspect:xAuto
</vefa>

<style lang="stylus">
</style>
