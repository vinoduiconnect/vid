<script>
import BackdropVideo from "@Media/BackdropVideo"
import MediaBackdropStrata from "@Snippets/MediaBackdropStrata"

export default {
    name: "QuoteStrata",
    inheritAttrs: false,
    components: {
        MediaBackdropStrata
    },
    props: {
        cite: {
            type: String,
            default: null
        },
        contentDirection: {
            type: String,
            default: "end"
        },
        quote: {
            type: String,
            default: null
        },
        video: {
            type: String,
            default: null
        },
        ...BackdropVideo.props
    }
}
</script>


<template lang="pug">
media-backdrop-strata(
    layout="quote-layout"
    :content="quote"
    :minor-text="cite"
    :content-direction="contentDirection"
)
    template(#media="{ $appliedVefa }")
        backdrop-video(
            :append-vefa-style="$appliedVefa.media"
            :loop="loop",
            :media="video"
            :poster="poster"
        )
</template>
