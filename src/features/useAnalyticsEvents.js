export default function useAnalyticsEvents () {
    function handleAnalyticsEvent (eventObject) {
        if (!window.ga) return


        ga(
            "send",
            {
                hitType: "event",
                ...eventObject
            }
        )

        return
    }

    function handleAnalyticsClickEvent (eventObject) {
        handleAnalyticsEvent({
            eventAction: "click",
            ...eventObject
        })
    }

    return {
        handleAnalyticsEvent,
        handleAnalyticsClickEvent
    }
}
