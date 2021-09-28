import { computed, reactive, ref } from "@compose"

const contentProps = {
    actionLabel: {
        type: String,
        default: null
    },
    label: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
}

const styleProps = {
    activeClass: {
        type: String,
        default: ""
    },
    exactActiveClass: {
        type: String,
        default: "is-exact-active"
    },
}

export const InterfaceControlProps = {
    ...contentProps,
    ...styleProps,
    disabled: {
        type: Boolean,
        default: false,
    },
    id: {
        type: [String, Number],
        default: null
    },
    slug: {
        type: String,
        default: null
    },
    openInSameWindow: {
        type: Boolean,
        default: false
    },
    tag: {
        type: String,
        default: "a"
    },
    to: {
        type: [String, Object],
        default: null
    },
}

export function useInterfaceControl (props) {
    const {
        actionLabel,
        label,
        name,
        title
    } = props

    let generatedProps = reactive({
        activeClass: props.activeClass,
        exactActiveClass: props.exactActiveClass,
        //  if no `to` prop, use the `slug`
        to: props.to || props.slug
    })

    //  determine tag to use
    const componentType = computed(
        () => (props.tag == "button") ? "button" : "g-link"
    )

    //  there was a reason for this. what was it?
    if (props.openInSameWindow) {
        is.value = "a"  //  does this get used?
        generatedProps = reactive({
            href: props.to
        })
    }

    //  determine the label based on various props that can be passed in
    const localizedLabel = computed(
        () => {
            return actionLabel
                || label
                || name
                || title
        }
    )

    return {
        componentType,
        localizedLabel,
        generatedProps
    }
}

export default useInterfaceControl
