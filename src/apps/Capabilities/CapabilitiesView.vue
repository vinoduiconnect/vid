<script>
import { useContext, usePageQuery } from "@useGridsome"

import CapabilityPreview from "@Capabilities/CapabilityPreview"
import SectionNavigation from "@Capabilities/SectionNavigation"

export default {
    name: "CapabilitiesView",
    inheritAttrs: false,
    components: {
        SectionNavigation,
        CapabilityPreview,
    },
    setup (props, ctx) {
        const {
            ...activeContext
        } = useContext(ctx)

        const { capabilities } = usePageQuery(
            ctx,
            [
                "capabilities",
                (node) => ({ to: node.path })
            ]
        )

        return {
            activeContext,
            capabilities
        }
    }
}
</script>

<template lang="pug">
standard-column-layout.CapabilitiesView(
    v-bind="activeContext"
    :append-vefa-style="$vefa"
)
    template(#append-header)
        section-navigation(
            :routes="capabilities"
        )

    template(#insert-body)
        template(
            v-for="item in capabilities"
        )
            capability-preview(
                v-bind="item"
                :key="item.path"
            )
</template>

<page-query>
query {
    capabilities: allCapabilities (
        filter: { isActive: { eq: true } }
        sortBy: "hed"
        order: ASC
    ) {
        edges {
            node {
     		    path
                hed
                lede
                # crossLink {
                #     media
                # }
                # crossLinks {
                #    hed
                #    link
                # }
            }
        }
    }
}

</page-query>

<vefa>
element: {}
</vefa>
