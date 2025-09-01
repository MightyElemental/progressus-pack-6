
ServerEvents.recipes(event => {

    event.recipes.gtceu.macerator('osmium_to_dust')
        .inputItems('1x mekanism:raw_osmium')
        .outputItems('2x gtceu:osmium_dust')
        .duration(20)
        .EUt(2)

    event.recipes.gtceu.macerator('macerate_certus_crystal')
        .inputItems('1x ae2:certus_quartz_crystal')
        .outputItems('1x ae2:certus_quartz_dust')
        .duration(15)
        .EUt(2)

    event.recipes.gtceu.macerator('macerate_diamond_horse_armor')
        .inputItems("1x minecraft:diamond_horse_armor")
        .outputItems("8x minecraft:diamond", "10x gtceu:diamond_dust")
        .chancedOutput("2x minecraft:diamond", "1/4", 100)
        .chancedOutput("2x gtceu:diamond_dust", "1/3", 250)
        .duration(2000)
        .EUt(32)

    event.recipes.gtceu.macerator('macerate_golden_horse_armor')
        .inputItems("1x minecraft:golden_horse_armor")
        .outputItems("8x minecraft:gold_ingot", "10x gtceu:gold_dust")
        .chancedOutput("2x minecraft:gold_ingot", "1/4", 100)
        .chancedOutput("2x gtceu:gold_dust", "1/3", 250)
        .duration(1500)
        .EUt(32)

})