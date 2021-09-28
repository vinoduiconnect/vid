<script>
import { useNavigation, AVAILABLE_NAVS } from "@Navigation/useNavigation"

import ExtendedNavigation from "@Site/ExtendedNavigation"
import ExtendedNavigationControl from "@Controls/ExtendedNavigationControl"
import SiteMasthead from "@Site/SiteMasthead"
import SiteColophon from "@Site/SiteColophon"
import SiteNavigation from "@Site/SiteNavigation"

export default {
    name: "PcgiCom",
    components: {
        ExtendedNavigationControl,
        ExtendedNavigation,
        SiteColophon,
        SiteMasthead,
        SiteNavigation,
    },
    metaInfo() {
        const {
            siteDescription,
            siteName,
            siteUrl
        } = this.$static.metadata

        return {
            title: siteName,
            meta: [
                {
                    key: "description",
                    name: "description",
                    content: siteDescription
                },
            ],
            bodyAttrs: {
                style: `--background-image: ${ this.backgroundImage}`
            }
        }
    },
    setup (props, ctx) {
        const {
            setNavigationState
        } = useNavigation({ type: AVAILABLE_NAVS.PRIMARY })

        const backgroundImage = `url( ${ require("@res/carolina-munemasa-sEpLDQ0QOVw-unsplash.jpg") } )`

        return {
            backgroundImage,
            setNavigationState,
        }
    }
}
</script>


<static-query>
query App {
  metadata {
    siteName
    siteDescription
    siteUrl
  }
}
</static-query>


<template lang="pug">
#app(
    v-bind="$vefa.element"
)
    slot(name="prepend")

    slot(name="masthead")
        site-masthead(
            append-vefa-style="mobile"
        )
            template(#append)
                extended-navigation-control(
                    icon="menu-icon"
                    :apply-vefa-style="$appStyles.extendedNavControl"
                    @nav-state-change="setNavigationState"
                )

    router-view

    site-navigation
        template(#prepend)
            site-masthead(
                logo-style="dark"
            )

    slot(name="navigation")
        extended-navigation
            template(
                #prepend="{ handleDrawerLeave }"
            )
                site-masthead(
                    append-vefa-style="mobile"
                    logo-style="light"
                )
                    template(#append)
                        extended-navigation-control(
                            icon="close-icon"
                            :apply-vefa-style="$appStyles.extendedNavCloseControl"
                            @nav-state-change="handleDrawerLeave"
                        )

    slot(name="colophon")
        site-colophon

    slot(name="append")
</template>

<style lang="stylus">
#app
    &::after
        content: ""
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        z-index: -1
        background-image: var(--background-image)
        background-attachment: fixed
        background-blend-mode: screen
        background-size: cover
        background-color: var(--color-secondary-tint)
        opacity: .2

    +at-wide()
        --footer-height: 305px // 305px is colophon height
        padding-bottom: var(--footer-height)

.no-background #app
    &::after
        display: none

</style>

<vefa>
element:
    at-base: module:fill flex:v--p:start--s:start
</vefa>
