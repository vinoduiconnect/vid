// import compareAsc from 'date-fns/compare_asc'
// import compareDesc from 'date-fns/compare_desc'

export const orderByAlpha = (entries, attribute, { reverse } = { reverse: false }) =>
    entries.sort(
        (entryA, entryB) => {
            return (reverse)
                ? (entryB[attribute].toLowerCase()).localeCompare(entryA[attribute].toLowerCase())
                : (entryA[attribute].toLowerCase()).localeCompare(entryB[attribute].toLowerCase())
        }
    )

export const orderByNumber = ({ reverse } = { reverse: false }) =>
    (entryA, entryB) =>
        (reverse) ? entryA - entryB : entryB - entryA
