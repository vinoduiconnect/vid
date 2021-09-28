<script>
export default {
    name: "ExtendedNavigationControl",
    inheritAttrs: false,
    props: {
        icon: {
            type: String,
            default: null
        }
    },
}
</script>

<template lang="pug">
button(
    type="button"
    v-bind="$vefa.element"
    @click="$emit('nav-state-change', $event)"
)
    component(
        v-bind="$vefa.icon"
        v-if="icon"
        :is="icon"
    )

    span(
        v-bind="$vefa.label"
    ) Menu
</template>

<vefa>
</vefa>
