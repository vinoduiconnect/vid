<script>
import { computed } from "@compose"

import { InterfaceControlProps, useInterfaceControl } from "@Controls/useInterfaceControl"

export default {
    name: "RouteControl",
    inheritAttrs: false,
    props: {
        ...InterfaceControlProps,
        href: {
            type: String,
            default: null,
        },
    },
    setup (props) {
        const {
            componentType,
            localizedLabel,
            generatedProps
        } = useInterfaceControl(props)

        const boundTo = computed(
            () => {
                //  if we use an href instead, we want to remove the route matcher
                if (props.href) {
                    delete generatedProps.to
                    generatedProps.href = props.href
                }

                return generatedProps
            }
        )

        return {
            componentType,
            localizedLabel,
            boundTo,
        }
    }
}

</script>


<template lang="pug">
component(
    v-bind="{ ...$vefa.element, ...boundTo, disabled }"
    v-on="$listeners"
    :is="componentType"
    :type="$attrs.type"
)
    slot(
        name="prepend"
        v-bind="$appliedVefa"
    )

    slot(
        name="label"
        v-bind="$appliedVefa"
    )
        span(
            v-bind="$vefa.label"
        )
            slot(
                name="insert-label"
                v-bind="$appliedVefa"
            ).
                {{ localizedLabel }}

    slot(
        name="append"
        v-bind="$appliedVefa"
    )
</template>

<vefa>
element: {}
</vefa>
