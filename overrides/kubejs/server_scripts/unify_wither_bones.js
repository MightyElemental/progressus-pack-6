// kubejs/server_scripts/unify_wither_bones.js

const CANONICAL = 'bhc:wither_bone' // canonical output & target for mob drops
const BUTCHER_VARIANT = 'butcher:witherbone'
const RECIPE_TYPES = [
  'minecraft:crafting_shaped',
  'minecraft:crafting_shapeless',
  'minecraft:smelting',
  'minecraft:blasting'
]

// 1) Add both items to the tags #c:bones/wither and #c:bones
ServerEvents.tags('item', event => {
  event.add('c:bones/wither', CANONICAL)
  event.add('c:bones/wither', BUTCHER_VARIANT)

  event.add('c:bones', CANONICAL)
  event.add('c:bones', BUTCHER_VARIANT)
})

// 2) Replace recipe inputs that used the raw items with the tag so recipes accept either variant
ServerEvents.recipes(event => {
  RECIPE_TYPES.forEach(type => {
    event.replaceInput({ type: type }, CANONICAL, '#c:bones/wither')
    event.replaceInput({ type: type }, BUTCHER_VARIANT, '#c:bones/wither')

    // 3) Make outputs canonical: if any recipe produces a butcher variant or uses the tag as an output,
    //    force it to produce the canonical bhc:wither_bone
    event.replaceOutput({ type: type }, BUTCHER_VARIANT, CANONICAL)
    // if any recipe outputs the tag make it produce canonical
    event.replaceOutput({ type: type }, '#c:bones/wither', CANONICAL)
  })
})

// 4) Mob drops
try {
  LootJS.modifiers(event => {
    // single entity modifier for wither_skeleton
    const mod = event.addEntityModifier('minecraft:wither_skeleton')

    // replace any item coming from the tag with the canonical item
    mod.replaceLoot('#c:bones/wither', CANONICAL)
  })
} catch (e) {
  console.info('LootJS not detected: mob-drop unification skipped. Install LootJS (recommended) to alter mob drops reliably.')
}
