// see about creating a yaml file to include these and ease injection
import ArrowIcon from "@icons/arrow.svg"
import MenuIcon from "@icons/menu.svg"
import CloseIcon from "@icons/close.svg"

export default {
    install (Vue, options = {}) {
        Vue.component("ArrowIcon", ArrowIcon)
        Vue.component("MenuIcon", MenuIcon)
        Vue.component("CloseIcon", CloseIcon)
    }
}
