<script>
export default {
    name: "StandardColumnLayout",
    inheritAttrs: false,
    props: {
        hed: {
            type: String,
            default: null
        },
        lede: {
            type: String,
            default: null
        },
    },
}
</script>

<template lang="pug">
main(
    v-bind="$vefa.element"
)
    slot(
        name="header"
        v-bind="$appliedVefa"
    )
        header.header(
            v-bind="$vefa.header"
        )
            slot(
                name="prepend-header"
                v-bind="$appliedVefa"
            )

            slot(
                name="insert-header"
                v-bind="$appliedVefa"
            )
                h1.hed(
                    v-bind="$vefa.hed"
                    v-if="hed"
                ) {{ hed }}

                p.lede(
                    v-bind="$vefa.lede"
                    v-if="lede"
                ) {{ lede }}

            slot(
                name="append-header"
                v-bind="$appliedVefa"
            )

    slot(
        name="body"
        v-bind="$appliedVefa"
    )
        .body(
            v-bind="$vefa.body"
        )
            slot(
                name="insert-body"
                v-bind="$appliedVefa"
            )

    slot(
        name="append"
        v-bind="$appliedVefa"
    )
</template>

<vefa>
element:
    at-base: module:balance--index:next--set:zBase flex:v--p:start pad:xEq100 pad:yEq300 iso:yStart200 rhy:yStart200
    at-economy: flex:v--p:middle--s:start grid:h--gap:xEq200--gap:yEq200 iso:yStart0 rhy:yStart0
    at-enhanced: grid:h--gap:xEq200--gap:yEq300
    at-standard: grid:h--gap:xEq400--gap:yEq300 pad:xEq200
    at-wide: aspect:hFull

header:
    at-base: rhy:yStart25
    at-economy: put:yStart--set:sticky rhy:yStart50
    at-extended: pad:yStart200
    at-standard: rhy:yStart100

hed:
    class: type:hed--face:hed--weight:300 color:shade
    at-standard: type:display

lede:
    class: type:minor--face:copy color:dark
    at-enhanced: aspect:xEq80--pct
    at-standard: aspect:xAuto type:base
    at-wide: aspect:xEq80--pct

body:
    at-base: rhy:yStart200 flex:v--p:start--s:start
    at-economy: pad:yStart50
    at-extended: pad:yStart200
    at-standard: pad:yStart250

</vefa>

<style lang="stylus" scoped>
main
    --columns: 2fr 3fr
    --rows: 0 auto auto 0
    grid-template-areas: unquote('
        ". ."
        "header content"
        "header append"
        ". ."
    ')

    +at-extended()
        --columns: minmax(auto, flow(24)) 1fr

    +at-wide()
        --columns: minmax(auto, flow(34)) 1fr

.header
    grid-area: header

.body
    grid-area: content
    justify-self: flex-end
</style>
