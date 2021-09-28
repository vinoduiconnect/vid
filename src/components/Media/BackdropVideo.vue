<script>
import { ref, computed } from "@compose"

export default {
    name: "BackdropVideo",
    inheritAttrs: false,
    props: {
        autoplay: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: false,
        },
        media: {
            type: String,
            default: null
        },
        playsinline: {
            type: Boolean,
            default: true
        },
        poster: {
            type: String,
            default: null
        },
        preload: {
            type: String,
            default: "metadata" //"auto" // auto for playback in safari
        },
    },
    setup (props) {
        const generatedAVProps = computed(
            () => ({
                autoplay: props.autoplay,
                loop: props.loop,
                controls: false,
                muted: true,
                playsinline: props.playsinline,
                // poster: props.poster,
                preload: props.preload,
                type: "*"
            })
        )

        const mp4Media = computed(
            () => ({
                src: props.media,
                type: "video/mp4"
            })
        )

        const mp4Image = computed(
            () => ({
                srcset: props.media,
                type: "video/mp4"
            })
        )
        const activeMp4Image = ref(false)

        function activateMp4Image () {
            activeMp4Image.value = true
        }

        return {
            generatedAVProps,
            mp4Media,
            mp4Image,
            activeMp4Image,
            activateMp4Image
        }
    }
}
</script>

<template lang="pug">
figure.BackdropMedia(
    v-bind="$vefa.element"
)
    g-image(
        v-bind="$vefa.media"
        v-if="activeMp4Image && poster"
        :src="require(`!!assets-loader!@/res${ poster }`)"
    )

    video(
        v-bind="{ ...$vefa.media, ...generatedAVProps }"
        v-else
    )
        source(
            v-bind="$vefa.media"
            :src="require(`@/res/${ media }`)"
            type="video/mp4"
            @error="activateMp4Image"
        )


</template>


<vefa>
element:
    at-base: module:static--set:zBehind optics:xyEq--set:hidden

media:
    at-base: module:bounds
</vefa>


<style lang="stylus">
.BackdropMedia
    video
        // ensures that videos are "object-fit" in Edge
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        min-width: 100%
        min-height: 100%
        width: auto
        height: auto
</style>
