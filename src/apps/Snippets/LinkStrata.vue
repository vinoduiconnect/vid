<script>
import { reactive, ref } from "@compose"

import BackdropVideo from "@Media/BackdropVideo"
import MediaBackdropStrata from "@Snippets/MediaBackdropStrata"

export default {
    name: "LinkStrata",
    inheritAttrs: false,
    components: {
        MediaBackdropStrata
    },
    props: {
        label: {
            type: String,
            default: null
        },
        video: {
            type: String,
            default: null
        },
        content: {
            type: String,
            default: null
        },
        hed: {
            type: String,
            default: null
        },
        slug: {
            type: String,
            default: null
        },
        contentDirection: {
            type: String,
            default: "start"
        },
        ...BackdropVideo.props,
    },
}
</script>


<template lang="pug">
//- :hed="hed"
//- :content="lede"
//- :content-direction="contentDirection"
//- :label="label"
//- :link="link"
media-backdrop-strata(
    layout="link-layout"
    v-bind="$props"
)
    template(#media="{ $appliedVefa }")
        backdrop-video(
            :append-vefa-style="$appliedVefa.media"
            :loop="loop",
            :media="video"
            :poster="poster"
        )
//- aside.CareersHook--full(
//-     v-bind="$vefa.element"
//- )
//-     slot(name="headerheader")
//-         header.CareersHook-header(
//-             v-bind="$vefa.header"
//-         )
//-             h2.CareersHook-hed(
//-                 v-bind="$vefa.hed"
//-             ) {{ hed }}

//-             p.CareersHook-content(
//-                 v-bind="$vefa.content"
//-             ) {{ lede }}


//-     backdrop-video.CareersHook-media(
//-         :append-vefa-style="$vefa.media"
//-         :loop="loop"
//-         :media="media"
//-         :poster="poster"
//-     )

</template>
