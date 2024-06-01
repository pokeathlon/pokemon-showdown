export const Items: {[k: string]: ModdedItemData} = {
	nucleararbokite: {
		name: "Nuclear Arbokite",
		desc: "If held by a Nuclear Arbok, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Arbok-Nuclear-Mega",
		megaEvolves: "Arbok-Nuclear",
		itemUser: ["Arbok-Nuclear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	nucleargyaradosite: {
		name: "Nuclear Gyaradosite",
		desc: "If held by a Nuclear Gyarados, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Gyarados-Nuclear-Mega",
		megaEvolves: "Gyarados-Nuclear",
		itemUser: ["Gyarados-Nuclear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	arbokite: {
		name: "Arbokite",
		desc: "If held by an Arbok, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Arbok-Mega",
		megaEvolves: "Arbok",
		itemUser: ["Arbok"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	whimsicottite: {
		name: "Whimsicottite",
		desc: "If held by a Whimsicott, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Whimsicott-Mega",
		megaEvolves: "Whimsicott",
		itemUser: ["Whimsicott"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	metalynxite: {
		name: "Metalynxite",
		desc: "If held by a Metalynx, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Metalynx-Mega",
		megaEvolves: "Metalynx",
		itemUser: ["Metalynx"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	archillesite: {
		name: "Archillesite",
		desc: "If held by an Archilles, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Archilles-Mega",
		megaEvolves: "Archilles",
		itemUser: ["Archilles"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	electruxolite: {
		name: "Electruxolite",
		desc: "If held by an Electruxo, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Electruxo-Mega",
		megaEvolves: "Electruxo",
		itemUser: ["Electruxo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	baariettite: {
		name: "Baariettite",
		desc: "If held by a Baariette, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Baariette-Mega",
		megaEvolves: "Baariette",
		itemUser: ["Baariette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	nuclearbaariettite: {
		name: "Nuclear Baariettite",
		desc: "If held by a Nuclear Baariette, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Baariette-Nuclear-Mega",
		megaEvolves: "Baariette-Nuclear",
		itemUser: ["Baariette-Nuclear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	drilgannite: {
		name: "Drilgannite",
		desc: "If held by a Drilgann, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Drilgann-Mega",
		megaEvolves: "Drilgann",
		itemUser: ["Drilgann"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	unidentifiedfallenobject: {
		name: "Unidentified Fallen Object",
		desc: "If held by an S51-A, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "S51-A-Mega",
		megaEvolves: "S51-A",
		itemUser: ["S51-A"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	inflagetite: {
		name: "Inflagetite",
		desc: "If held by an Inflagetah, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Inflagetah-Mega",
		megaEvolves: "Inflagetah",
		itemUser: ["Inflagetah"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	syrentideite: {
		name: "Syrentideite",
		desc: "If held by a Syrentide, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Syrentide-Mega",
		megaEvolves: "Syrentide",
		itemUser: ["Syrentide"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	dramsamaite: {
		name: "Dramsamaite",
		desc: "If held by a Dramsama, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Dramsama-Mega",
		megaEvolves: "Dramsama",
		itemUser: ["Dramsama"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	darkdramsamaite: {
		name: "Dark Dramsamaite",
		desc: "If held by a Dramsama, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Dramsama-Dark-Mega",
		megaEvolves: "Dramsama",
		itemUser: ["Dramsama"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	nucleardramsamaite: {
		name: "Nuclear Dramsamaite",
		desc: "If held by a Nuclear Dramsama, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Dramsama-Nuclear-Mega",
		megaEvolves: "Dramsama-Nuclear",
		itemUser: ["Dramsama-Nuclear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	darknucleardramsamaite: {
		name: "Dark Nuclear Dramsamaite",
		desc: "If held by a Nuclear Dramsama, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Dramsama-Nuclear-Dark-Mega",
		megaEvolves: "Dramsama-Nuclear",
		itemUser: ["Dramsama-Nuclear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	kiricornite: {
		name: "Kiricornite",
		desc: "If held by a Kiricorn, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Kiricorn-Mega",
		megaEvolves: "Kiricorn",
		itemUser: ["Kiricorn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	oblivicornite: {
		name: "Oblivicornite",
		desc: "If held by an Oblivicorn, this item allows it to Mega Evolve in battle.",
		spritenum: -2,
		megaStone: "Oblivicorn-Mega",
		megaEvolves: "Oblivicorn",
		itemUser: ["Oblivicorn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
};
