<script>
import useAbstract from "@useAbstract"

export default {
    name: "FxClipSlide",
    extends: useAbstract,
}
</script>

<template lang="pug">
transition(
    name="fx:clipSlide"
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
    class: fx:clipSlideReceiver
</vefa>

<style lang="stylus">
[class*="fx:clipSlideReceiver"]
    clip-path: inset(0 var(--right-edge, 0%) 0 0)


// these will need to be driven somewhere else
[class~='fx:clipSlide-enter'],
[class~='fx:clipSlide-leave-to']
    --right-edge: 100%

    // +o-enhanced()
    //     --right-edge: 100%

    // +o-full()
    //     --right-edge: 100%

    // +over(2000px)
    //     --right-edge: 100%

[class~='fx:clipSlide-enter-to'],
[class~='fx:clipSlide-leave']
    --right-edge: 0%

    // +o-enhanced()
    //     --right-edge: 50%

    // +o-full()
    //     --right-edge: 60%

    // +over(2000px)
    //     --right-edge: 68%

[class~='fx:clipSlide-enter-active'],
[class~='fx:clipSlide-leave-active']
    transition-delay: 0.25s
    transition-duration: 0.5s
    transition-timing-function: ease-in-out
    transition-property: clip-path
    will-change: clip-path
</style>
