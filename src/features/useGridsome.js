// export const provideGridsome = (gridsome) => ({
//     $viewContext: gridsome.$context || {},
//     $viewPage: gridsome.$page || {},
//     $viewStatic: gridsome.$static || {}
// })

// export default () => {
//     return {
//         $viewContext: inject("$viewContext", {}),
//         $viewPage: inject("$viewPage", {}),
//         $viewStatic: inject("$viewStatic", {}),
//         mapNodes,
//     }
// }

export function mapNodes ({ query, extendBy = () => ({}) }) {
    function mapFromQuery () {
        return query.map(
            ({ node }) => ({
                ...node,
                ...extendBy(node)
            })
        )
    }

    return query
        ? mapFromQuery()
        : []
}

//  if sharing similar templates between views
//  such as careers/position-1 and careers/position-2
//  wrap returned value in a computed function
export function useContext (ctx) {
    return process.isServer
        ? ctx.ssrContext.state.context
        : ctx.root.$context
}

// ...keys? should be just keys I think
export function usePageQuery (
    ctx,
    ...keys
) {
    const $page = process.isServer
        ? ctx.ssrContext.state.data
        : ctx.root.$page

    if (!keys.length) return $page

    return keys.reduce(
        applyKeyedItem($page),
        {}
    )
}

export function useStaticQuery (
    ctx,
    ...keys
) {
    return "static query can't be accessed in setup() for now"
    // const $static = process.isServer
    //     ? ctx.ssrContext.state.data
    //     : ctx.root.$static

    // if (!keys.length) return $static

    // return keys.reduce(
    //     applyKeyedItem($static),
    //     {}
    // )
}

function applyKeyedItem ($page) {
    return (payload, [key, extendBy]) => {
        const keyedItem = $page[key]
        const edges = keyedItem && keyedItem.edges

        const conferEdges = () => edges
            ? mapNodes({ query: edges, extendBy })
            : keyedItem

        payload[key] = keyedItem
            ? conferEdges()
            : "Not available in query results"

        return payload
    }
}






export function useGridsome (ctx) {
    return {
        $context: useContext(ctx),
        $page: usePageQuery(ctx),
        $static: useStaticQuery(ctx),
    }
}

export default useGridsome
