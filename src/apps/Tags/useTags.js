import { ref, computed } from "@compose"

import { loadTags } from "@Tags/loader"

export function useTags (props) {
    const tagLibrary = loadTags()

    function findTag ({ tag }) {
        return tag && tagLibrary.find(
            ({ id }) => id == tag
        )
    }

    return {
        findTag,
        tagLibrary
    }
}

export default useTags
