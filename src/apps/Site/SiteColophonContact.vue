<script>
import org from "@content/org.yaml"

import ContactInfo from "@Contacts/ContactInfo"
import SiteLogo from "@Site/SiteLogo"

export default {
    name: "SiteColophonContact",
    inheritAttrs: false,
    components: {
        ContactInfo,
        SiteLogo,
    },
    setup (props) {
        return {
            name: org.name,
            address: org.address
        }
    }
}
</script>


<template lang="pug">
contact-info(
    route="home"
    v-bind="{ name, ...address }"
    :append-vefa-style="$vefa"
)
    template(#hed)
        site-logo.SitecColophon-logo(
            append-vefa-style="dark"
        )
</template>

<vefa>
element:
    at-base: flex:h--p:grid--s:middle
    at-economy: flex:v--p:start--s:start rhy:yStart50

group:
    class: type:chrome--weight:300 color:neutral
    at-economy: type:chrome--weight:700
    at-extended: type:base
</vefa>
