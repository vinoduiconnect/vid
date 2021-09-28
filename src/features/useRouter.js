import { computed, watch } from "@compose"

export const provideRouter = (router) => ({
    $route: router.$route || {},
    $router: router.$router || {},
})


export default ({ ctx, watchFn, lazy = false }) => {
    const $route = computed( () => ctx.root.$route )
    const $router = ctx.root.$router

    const currentRoute = computed(
        () => $route.value.name
    )

    if (watchFn) {
        watch(
            $route,
            watchFn,
            {
                lazy
            }
        )
    }


    return {
        currentRoute,
        $route,
        $router
    }
}
