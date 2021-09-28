<script>
export default {
    name: "BackdropMedia",
    inheritAttrs: false,
    props: {
        alt: {
            type: String,
            default: ""
        },
        media: {
            type: String,
            default: null
        },
        mediaDir: {
            type: String,
            default: ""
        },
        resize: {
            type: [String, Array],
            default: null
        },
        defaultSize: {
            type: Number,
            default: 480
        }
    },
    setup (props) {
    }
}
</script>


<template lang="pug">
.BackdropMedia(
    v-bind="$vefa.element"
    v-if="media"
)
    g-image(
        v-bind="$vefa.media"
        :src="require(`!!assets-loader!@/res${ media }`)"
    )
</template>


<vefa>
element:
    at-base: module:static optics:xyEq--set:hidden

media:
    at-base: module:bounds
</vefa>


<style lang="stylus">
.BackdropMedia
    grid-column: 1 / -1
    grid-row: 1 / -1

    img
        object-fit: cover
</style>
