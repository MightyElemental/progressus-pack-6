ServerEvents.recipes(event => {

  // Extended AE Quartz Blend from any nether quartz dust
  event.shapeless(
    Item.of('extendedae:quartz_blend', 6),
    [
      "#c:dusts/nether_quartz",
      "2x #minecraft:coals",
      "6x #c:sands"
    ]
  )

})