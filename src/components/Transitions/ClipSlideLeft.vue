<script>
export default {
    name: "FxClipSlideLeft",
}
</script>

<template lang="pug">
transition(
    name="fx:clipSlideLeft"
    v-bind="$attrs"
    v-on="$listeners"
)
    slot(
        name="content"
        v-bind="$appliedVefa"
    )
</template>

<vefa>
element:
    class: fx:clipSlideLeftReceiver
</vefa>

<style lang="stylus">
[class*="fx:clipSlideLeftReceiver"]
    clip-path: inset(0 0 0 var(--left-edge, 0%))

    // +at-condensed()
    //     --left-edge: 60%

// these will need to be driven somewhere else
[class~='fx:clipSlideLeft-enter'],
[class~='fx:clipSlideLeft-leave-to']
    --left-edge: 100%

    +at-condensed()
        --left-edge: 100%

    // +o-full()
    //     --right-edge: 100%

    // +over(2000px)
    //     --right-edge: 100%

[class~='fx:clipSlideLeft-enter-to'],
[class~='fx:clipSlideLeft-leave']
    --left-edge: 0%

    // +at-condensed()
    //     --left-edge: 60%

    // +o-full()
    //     --right-edge: 60%

    // +over(2000px)
    //     --right-edge: 68%

[class~='fx:clipSlideLeft-enter-active'],
[class~='fx:clipSlideLeft-leave-active']
    transition-delay: 0.25s
    transition-duration: 0.5s
    transition-timing-function: ease-in-out
    transition-property: clip-path
    will-change: clip-path
</style>
