import { useMediaQuery } from "@vueuse/core"

export function useBreakpoints () {
    const atBase = useMediaQuery("(min-width: 0px)")
    const atCompressed = useMediaQuery("(min-width: 375px)")
    const atCondensed = useMediaQuery("(min-width: 414px)")
    const atEconomy = useMediaQuery("(min-width: 736px)")
    const atEnhanced = useMediaQuery("(min-width: 896px)")
    const atExtended = useMediaQuery("(min-width: 1024px)")
    const atStandard = useMediaQuery("(min-width: 1280px)")
    const atFull = useMediaQuery("(min-width: 1600px)")
    const atSuper = useMediaQuery("(min-width: 1920px)")

    return {
        atBase,
        atCompressed,
        atCondensed,
        atEconomy,
        atEnhanced,
        atStandard,
        atExtended,
        atFull,
        atSuper,
    }

}

export default useBreakpoints
