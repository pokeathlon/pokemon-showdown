export const Items: {[k: string]: ModdedItemData} = {
	electrodite: {
		name: "Electrodite",
		spritenum: 596,
		megaStone: "Electrode-Mega",
		megaEvolves: "Electrode",
		itemUser: ["Electrode"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	florgesite: {
		name: "Florgesite",
		spritenum: 615,
		megaStone: "Florges-Mega",
		megaEvolves: "Florges",
		itemUser: ["Florges"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	frostysnorlaxite: {
		name: "Frosty Snorlaxite",
		spritenum: 623,
		megaStone: "Snorlax-Frost-Mega",
		megaEvolves: "Snorlax-Frost",
		itemUser: ["Snorlax-Frost"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltablazikenite: {
		name: "Delta Blazikenite",
		spritenum: 623,
		megaStone: "Blaziken-Delta-Mega",
		megaEvolves: "Blaziken-Delta",
		itemUser: ["Blaziken-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltasceptilite: {
		name: "Delta Sceptilite",
		spritenum: 623,
		megaStone: "Sceptile-Delta-Mega",
		megaEvolves: "Sceptile-Delta",
		itemUser: ["Sceptile-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
};
