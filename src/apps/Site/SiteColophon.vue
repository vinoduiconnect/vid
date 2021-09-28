<script>
import org from "@content/org.yaml"

import { useNavigation, AVAILABLE_NAVS } from "@Navigation/useNavigation"

import SiteColophonContact from "@Site/SiteColophonContact"
import SiteMap from "@Site/SiteMap"
import RouteControl from "@Controls/RouteControl"


export default {
    name: "SiteColophon",
    inheritAttrs: false,
    components: {
        SiteColophonContact,
        SiteMap,
        RouteControl
    },
    setup (props) {
        const {
            navState: {
                routes: sitemapRoutes
            }
        } = useNavigation({ type: AVAILABLE_NAVS.SITEMAP })

        const {
            navState: {
                routes: tertiaryRoutes
            }
        } = useNavigation({ type: AVAILABLE_NAVS.TERTIARY })

        return {
            name: org.name,
            address: org.address,
            sitemapRoutes,
            tertiaryRoutes,
        }
    }
}
</script>


<template lang="pug">
footer.SiteColophon(
    v-bind="$vefa.element"
)
    site-colophon-contact.SiteColophon-contact

    site-map.SiteColophon-sitemap(
        :routes="sitemapRoutes"
    )

    nav.SiteColophon-nav--tert(
        v-bind="$vefa.tertiaryNav"
        v-if="tertiaryRoutes.length"
    )
        template(v-for="route in tertiaryRoutes")
            route-control(
                v-bind="route"
                :append-vefa-style="$vefa.tertiaryLink"
            )
</template>



<vefa>
element:
    class: motif:bright
    at-base: module:static--index:end--z:base flex:v--p:start pad:xyEq100 rhy:yStart200
    at-economy: grid:h--gap:yEq200 rhy:yStart0
    at-standard: grid:h--set:zRunners pad:xyEq200 pad:yEnd50
    at-wide: aspect:hFull put:xEq-yEnd--set:fix

tertiaryNav:
    at-base: flex:h--p:start--s:middle rhy:xStart150
    at-economy: flex:h--p:end--s:middle
    at-extended: flex:h--p:start--s:middle iso:yStart300

tertiaryLink:
    element:
        class: type:chrome--face:copy--weight:400 color:neutral fx:shift

</vefa>

<style lang="stylus">
.SiteColophon
    --columns: max-content 1fr
    --rows: min-content auto min-content
    grid-template-areas: unquote('
        "contact ."
        "sitemap sitemap"
        "tert tert"
    ')

    +at-economy()
        --columns: max-content .25fr 1fr
        --rows: auto min-content
        grid-template-areas: unquote('
            "contact . sitemap"
            ". . tert"
        ')

    +at-enhanced()
        --columns: max-content .5fr 1fr

    +at-extended()
        --columns: flow(15) flow(8) 1fr
        grid-template-areas: unquote('
            "contact . sitemap"
            ". . sitemap"
            ". . tert"
        ')

    +at-standard()
        --columns: ratio(15) 1fr max-content

.SiteColophon-contact
    grid-area: contact

.SiteColophon-sitemap
    grid-area: sitemap

.SiteColophon-nav--tert
    grid-area: tert

//  we tried something here with an overlay, but it looked dumb
//     // &::before
//     //     content: ""
//     //     display: block
//     //     width: 100%
//     //     height: ratio(6)
//     //     top: ratio(-6)
//     //     left: 0
//     //     right: 0
//     //     position: absolute
//     //     point-events: none
//     //     // background: red
//     //     background: linear-gradient(to top, var(--color-bright), rgba(#fff, 0) 90%)
//     //     z-index: 100

//     //     +at-extended()
//     //         z-index: 400

</style>
