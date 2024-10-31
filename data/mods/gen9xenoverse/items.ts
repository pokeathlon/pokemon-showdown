export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	luxrayite: {
		name: "Luxrayite",
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	mienshaoite: {
		name: "Mienshaoite",
		desc: "If held by a Mienshao, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Mienshao-Mega",
		megaEvolves: "Mienshao",
		itemUser: ["Mienshao"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	rampardosite: {
		name: "Rampardos",
		desc: "If held by a Rampardos, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Rampardos-Mega",
		megaEvolves: "Rampardos",
		itemUser: ["Rampardos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	arcanite: {
		name: "Arcanite",
		desc: "If held by an Arcanine, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Arcanine-Mega",
		megaEvolves: "Arcanine",
		itemUser: ["Arcanine"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	weavilite: {
		name: "Weavile",
		desc: "If held by a Weavile, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Weavile-Mega",
		megaEvolves: "Weavile",
		itemUser: ["Weavile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	shiftryitex: {
		name: "Shiftryite X",
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Shiftry-Mega-X",
		megaEvolves: "Shiftry",
		itemUser: ["Shiftry"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	suicunite: {
		name: "Suicunite",
		desc: "If held by a Suicune, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Suicune-Mega",
		megaEvolves: "Suicune",
		itemUser: ["Suicune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	raikouite: {
		name: "Raikouite",
		desc: "If held by a Raikou, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Raikou-Mega",
		megaEvolves: "Raikou",
		itemUser: ["Raikou"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	enteite: {
		name: "Enteite",
		desc: "If held by an Entei, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Entei-Mega",
		megaEvolves: "Entei",
		itemUser: ["Entei"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	hypnoite: {
		name: "Hypnoite",
		desc: "If held by a Hypno, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Hypno-Mega",
		megaEvolves: "Hypno",
		itemUser: ["Hypno"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	bellossomite: {
		name: "Bellossomite",
		desc: "If held by a Bellossom, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Bellossom-Mega",
		megaEvolves: "Bellossom",
		itemUser: ["Bellossom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	terrestrialring: {
		name: "Terrestrial Ring",
		desc: "Transforms certain Pokémon into their Terrestrial forms.",
		spritenum: -1,
		num: 0,
	},
	xenoversalring: {
		name: "Xenoversal Ring",
		desc: "Transforms certain Pokémon into their Xenoversal forms.",
		spritenum: -1,
		num: 0,
	},
};
