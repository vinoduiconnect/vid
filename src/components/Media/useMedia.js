import { replaceAll } from "@utils/strings"

export function mapContentImageSources (content) {
    return replaceAll(
        content,
        `src="`,
        `src="/assets/img`
    )
}

export function useMedia (props) {
    let {
        defaultSize,
        media,
        mediaDir
    } = props

    function createSourceParts (media) {
        return media.split(".")
    }

    let computedSource = createSourceParts(media)


    function generateSourceUrl (props) {
        let sourceMap = [
                "",
                "res"
            ]

        let {
            mediaDir
        } = props

        mediaDir && sourceMap.push(mediaDir)
        sourceMap.push("")
        return sourceMap.join("/")
    }

    let generatedMediaDir = generateSourceUrl(props)


    computedSource = `${ generatedMediaDir }${ computedSource.join(".") }`

    return {
        src: computedSource,
        sourceParts: createSourceParts(media),
        generatedMediaDir
    }
}

export default useMedia
