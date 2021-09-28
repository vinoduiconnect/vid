<script>
import { computed } from "@compose"
import { useContext } from "@useGridsome"

export default {
    name: "ListView",
    inheritAttrs: false,
    setup (props, ctx) {
        const {
            id,
            ...activeContext
        } = useContext(ctx)


        const documents = computed(
            () => {
                if (id !== "uscis") return null

                return activeContext.documents.map(
                    doc => ({
                        hed: doc.employeeName,
                        linkLabel: doc.linkLabel,
                        link: doc.file
                            ? require(`@/res${ doc.file }`)
                            : doc.fileLink
                    })
                )
            }
        )

        return {
            activeContext,
            documents
        }
    }
}
</script>


<template lang="pug">
standard-column-layout.ListView(
    v-bind="activeContext"
)
    template(#insert-body)
        ul(
            v-bind="$vefa.list"
            v-if="documents"
        )
            li(
                v-bind="$vefa.card"
                v-for="doc in documents"
            )
                p(
                    v-bind="$vefa.hed"
                ) {{ doc.hed }}

                a(
                    v-bind="$vefa.link"
                    :href="doc.link"
                ) {{ doc.linkLabel }}
</template>

<vefa>
list:
    at-base: flex:v--p:start--s:start

card:
    class: edge:yStart--set:noLeadingEdge--set:edgeNeutral
    at-base: module:static flex:v--p:start--s:start pad:yEq100 rhy:yStart50 pad--set:yFlush
    at-extended: pad:yEq200 pad--set:yFlush

hed:
    class: type:subhed--face:hed--weight:300 color:neutral

link:
    class: type:minor--weight:700 color:primary fx:shift fx:bounds
</vefa>

<style lang="stylus" scoped>
li
    --edge-neutral: rgba(colors.neutral, 25%)
</style>
