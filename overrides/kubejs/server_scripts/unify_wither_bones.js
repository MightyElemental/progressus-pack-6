// kubejs/server_scripts/unify_wither_bones.js
// For KubeJS 7.x (1.21 / 1.21.1)
// Adds tags, replaces recipe inputs with tag, forces canonical outputs,
// and (if LootJS is installed) replaces mob drops to the canonical item.

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
  // make sure both are in the wither subtag and in the general bones tag
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
    // if any recipe outputs the tag (rare) make it produce canonical
    event.replaceOutput({ type: type }, '#c:bones/wither', CANONICAL)
  })
})

// 4) Mob drops: recommend using LootJS (addon). If you have LootJS installed, this will replace
//    any loot from wither skeletons that is either in the tag #c:bones/wither or the butcher variants.
//    If you don't use LootJS, see notes below.
try {
  LootJS.modifiers(event => {
    // single entity modifier for wither_skeleton — modify dropped items after loot is rolled
    const mod = event.addEntityModifier('minecraft:wither_skeleton')

    // replace any item coming from the tag with the canonical item
    mod.replaceLoot('#c:bones/wither', CANONICAL)

    // replace any specific butcher/butchery item ids
    mod.replaceLoot(BUTCHER_VARIANT, CANONICAL)
  })
} catch (e) {
  // If LootJS is not installed, this try/catch keeps the script from hard-crashing,
  // and we will still have tags & recipe fixes. See notes below to fully change mob drops.
  console.info('LootJS not detected: mob-drop unification skipped. Install LootJS (recommended) to alter mob drops reliably.')
}
