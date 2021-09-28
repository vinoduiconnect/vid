import { computed } from "@vue/composition-api"

export const ContactProps = {
    city: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    phone: {
        type: [String, Number],
        default: null
    },
    state: {
        type: String,
        default: null
    },
    street1: {
        type: String,
        default: null
    },
    street2: {
        type: String,
        default: null
    },
    zip: {
        type: [String, Number],
        default: null
    },
    zipcode: {
        type: [String, Number],
        default: null
    },
}

export function useContact () {
    function formatLocality (props) {
        let locality = false
        locality = props.city || locality
        locality = props.state ? `${ locality }, ${ props.state }` : locality
        locality = (props.zipcode || props.zip) ? `${ locality } ${ props.zipcode || props.zip }` : locality
        return locality
    }

    function parsePhone ({ phone }) {
        if (!phone) return false

        phone = phone.toString()

        return [
            phone.substring(0, 3),
            phone.substring(3, 6),
            phone.substring(6, 10)
        ]
    }

    return {
        formatLocality,
        parsePhone
    }
}

export default useContact
