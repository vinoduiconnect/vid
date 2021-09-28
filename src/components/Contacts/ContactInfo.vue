<script>
import { computed } from "@compose"

import { useContact, ContactProps } from "./useContact"


export default {
    name: "ContactInfo",
    inheritAttrs: false,
    props: {
        ...ContactProps,
        route: {
            type: String,
            default: null
        },
        showAddress: {
            type: Boolean,
            default: true
        },
        showContact: {
            type: Boolean,
            default: true
        }
    },
    setup (props) {

        const headingTag = computed(
            () => props.route ? "g-link" : "h5"
        )

        const {
            formatLocality,
            parsePhone
        } = useContact()

        return {
            headingTag,
            locality: formatLocality(props),
            parsedPhone: parsePhone(props)
        }
    }
}
</script>


<template lang="pug">
address(
    v-bind="$vefa.element"
)
    header(
        v-bind="$vefa.header"
    )
        slot(
            name="hed"
            v-bind="$appliedVefa"
        )
            component(
                v-bind="$vefa.hed"
                :is="headingTag"
                :to="{ name: route }"
            )
                slot(name="insert-hed").
                    {{ name }}

    dl.contact-info(
        v-bind="$vefa.content"
    )
        .contact-group--address(
            v-bind="$vefa.group"
            v-if="showAddress && (street1 || locality)"
        )
            dt.contact-group-title(
               v-bind="$vefa.groupLabel"
            ) Address

            dd.contact-address-street(
                v-bind="$vefa.item"
                v-if="street1"
            )
                | {{ street1 }}
                span(
                    v-if="street2"
                ) , {{ street2 }}

            dd.contact-address-locality(
                v-bind="$vefa.item"
                v-if="locality"
            ) {{ locality }}

        .contact-group--extra(
            v-bind="$vefa.group"
            v-if="showContact && ( email || phone )"
        )
            dt.contact-group-title(
               v-bind="$vefa.groupLabel"
            ) Contact us

            dd.contact-extra-tel(
                v-bind="$vefa.item"
                v-if="parsedPhone"
            )
                a(
                    :href="`tel:${ parsedPhone.join('') }`"
                )
                    span(
                        v-bind="$vefa.itemLabel"
                    ) Tel:&nbsp;

                    span ({{ parsedPhone[0] }}) {{ parsedPhone[1] }}-{{ parsedPhone[2] }}

            dd.contact-extra-email(
                v-bind="[$vefa.item, $vefa.itemNext]"
                v-if="email"
            )
                a(
                    :href="`mailto:${ email }`"
                )
                    span(
                        v-bind="$vefa.itemLabel"
                    ) Email:&nbsp;

                    span {{ email }}
</template>


<style lang="stylus"></style>


<vefa>
element: {}

groupLabel:
    class: optics:a11y
</vefa>
