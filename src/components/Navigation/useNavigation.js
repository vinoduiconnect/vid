import { reactive, toRefs } from "@compose"

import navSchemas from "@content/navigation.yaml"

export const AVAILABLE_NAVS = Object.keys(navSchemas).reduce(
    (availableNavs, nav) => {
        availableNavs[nav.toLocaleUpperCase().replace(" ", "_")] = nav
        return availableNavs
    },
    {}
)

export const navigationState = Object.entries(AVAILABLE_NAVS).reduce(
    (navState, [navName, navKey]) => {

        const routes = navSchemas[navKey].routes

        routes.forEach(
            route => {
                if (route.subnav && typeof route.subnav === "string") {
                    route.subnav = navSchemas[route.subnav] || route.subnav
                }
            }
        )
        navState[navKey] = {
            isActive: false,

            //  keep any metadata
            ...navSchemas[navKey],

            //  overwrite with updated routes (if applicable)
            routes
        }

        return navState
    },
    {}
)

export function useNavigation (props) {
    const navState = reactive(navigationState[props.type])

    function setNavigationState ({ state = !navState.isActive }) {
        navState.isActive = state
        return
    }

    return {
        navSchemas,
        navState,
        setNavigationState
    }
}

export default useNavigation
