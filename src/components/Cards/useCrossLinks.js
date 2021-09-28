import { computed } from "@compose"

import baseRoutes from "@data/baseRoutes.yaml"

export function useCrossLink (props) {
    let {
        crossLink = {},
        ...base
    } = props

    //  if crossLink has a filled out key, overwrite the base key value
    const generatedContent = computed(
        () => Object.entries(base).reduce(
            (generatedContent, [key, value]) => {
                generatedContent[key] = value
                if (crossLink[key]) generatedContent[key] = crossLink[key]
                return generatedContent
            },
            {}
        )
    )

    //  return the crosslink first to get any of its props that base does have
    //  then overwrite with the generated content props
    return {
        contentTypeLink: baseRoutes[base.contentType],
        ...crossLink,
        ...generatedContent.value
    }
}
