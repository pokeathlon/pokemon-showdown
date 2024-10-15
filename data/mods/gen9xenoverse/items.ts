export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	soundplate: {
		name: "Sound Plate",
		spritenum: 105,
		onPlate: 'Sound',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Sound') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Sound",
		num: 311,
		gen: 4,
	},
	// Luxrayite
	// Mienshaoite
	// Rampardite
	// Arcanite ??
	// Weavilite
	// Suicunite
	// Shiftryite (2 shiftry megas)
	// Raikounite
	// Enteite
};
