<static-query src="./query-all.graphql"></static-query>

<script>
import Renderless from "@renderlessTemplate"
import { abstractComponent } from "@utils/vueHelpers"
import { mapNodes } from "@useGridsome"

const manager = {
    name: "TagManager",
    extends: Renderless,
    computed: {
        tags () {
            return mapNodes({ query: this.$static.tags.tag })
        }
    }
}

export const loadTags = (propsData) =>  abstractComponent(manager, propsData).tags
export default manager
</script>
