<script>
import RouteControl from "@Controls/RouteControl"

export default {
    name: "PcgiRouteControl",
    inheritAttr: false,
    props: {
        ...RouteControl.props,
        appendVefaStyle: {
            type: [String, Object],
            default: "basic"
        },
        boundToParentElement: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template lang="pug">
//- download
route-control(
    v-bind="$props"
    v-on="$listeners"
    :apply-vefa-style="boundToParentElement ? vefaAppend($vefa, $vefa.bindToParent) : $vefa"
)
    template(#insert-label)
        slot(
            name="insert-label"
            v-bind="$appliedVefa"
        )

    template(#append="{ $appliedVefa }")
        div(
            v-bind="$appliedVefa.iconFrame"
        )
            arrow-icon(
                v-bind="$appliedVefa.icon"
            )
</template>

<style lang="stylus" scoped>
a
button
    --parentSaturateFx: 1

    +on-hover()
        --parentSaturateFx: 1.75

    +on-active()
        --parentSaturateFx: .75

    & >>> span
        border-right: 0
</style>

<vefa>
element:
    class: type--weight:700--lead:base edge--radii:setRounded fx:shift
    at-base: iflex:h--p:full--s:full
    # fxbounds requires no module:static for at-base, continue testing

label:
    class: control:primary edge:xyEq--radii fx:shift
    at-base: module:balance flex:v--p:middle--s:start
    style:
        --radii: 4px 0 0 4px

iconFrame:
    class: control:primary--shade edge--radii fx:shift
    at-base: module:static flex:vAuto--p:middle--s:middle
    style:
        --radii: 0 4px 4px 0

icon:
    at-base: module:static aspect:xyEq100--text adj:spin180


#   EXTENSIONS
bindToParent:
    element:
        class: fx:bounds

basic:
    element:
        # reset:control
        class: type:base


    label:
        at-base: pad:xEq200 pad:yEq75

    iconFrame:
        at-base: pad:xEq75

minor:
    element:
        class: type:chrome
        at-economy: type:minor

    label:
        at-base: pad:xEq50 pad:yEq25
        at-condensed: type--set:truncate aspect:xEq80--view pad:xEq100 pad:yEq50

    iconFrame:
        at-base: pad:xEq50
</vefa>
