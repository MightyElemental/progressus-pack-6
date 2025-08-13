
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

})