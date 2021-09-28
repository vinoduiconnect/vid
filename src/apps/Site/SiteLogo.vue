<script>
export default {
    name: "PcgiLogo",
    inheritAttr: false,
}
</script>

<template lang="pug">
g-link(
    to="/"
    v-bind="$vefa.element"
)
    g-image(
        src="@/res/logo.pcgi.png"
        v-bind="$vefa.logo"
    )

    span(
        v-bind="$vefa.logotype"
    ).
        PCGI
</template>


<vefa>
element:
    class: type:subhed--face:hed--weight:300
    at-base: flex:h--p:start--s:base rhy:xStart50
    at-extended: type:xhed
    at-wide: type:xdisplay

logo:
    at-base: module:static aspect:xEq200--rhy
    at-extended: aspect:xEq100--text

logotype:
    at-base: module:static

light:
    logotype:
        class: color:secondary--hilite

dark:
    logotype:
        class: color:shade

</vefa>
