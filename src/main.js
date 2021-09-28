import VueCompositionApi from "@compose"
import Vefa from "@useVefa"
import AttachIcons from "@icons/library"


(process.env.NODE_ENV == "development") && require("@vefa/dev.styl")
import vefa from "@vefa/vefa.styl"
import app from "@themes/v2/app.styl"
import appStyles from "@themes/v2/_app.yaml"


import meta from "@content/seo.yaml"
// import store from "@store"

import BackdropMedia from "@Media/BackdropMedia"
import BackdropVideo from "@Media/BackdropVideo"
import PcgiRouteControl from "@Site/PcgiRouteControl"
import RouteControl from "@Controls/RouteControl"
import StandardColumnLayout from "@views/StandardColumnLayout"

export default function (Vue, { router, head, isClient }) {
    Vue.use(VueCompositionApi)
    Vue.use(AttachIcons)

    Vue.use(
        Vefa,
        { appStyles }
    )

    Vue.component("BackdropMedia", BackdropMedia)
    Vue.component("BackdropVideo", BackdropVideo)
    Vue.component("PcgiRouteControl", PcgiRouteControl)
    Vue.component("RouteControl", RouteControl)
    Vue.component("StandardColumnLayout", StandardColumnLayout)

    //  assign global metadata
    head.titleTemplate = title =>
        (title && title !== meta["application-name"])
            ? `${ title } — ${ meta["application-name"] }`
            : meta["application-name"]

    Object.entries(meta).forEach(
        ([ key, value ]) => head.meta.push({ name: key, content: value })
    )
}
