export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	luckypunch: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name.includes('Chansey') || user.m.fusion?.includes('Chansey')) {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Chansey-Egho"],
	},
	buggem: {inherit: true, isNonstandard: null},
	darkgem: {inherit: true, isNonstandard: null},
	dragongem: {inherit: true, isNonstandard: null},
	electricgem: {inherit: true, isNonstandard: null},
	fairygem: {inherit: true, isNonstandard: null},
	fightinggem: {inherit: true, isNonstandard: null},
	firegem: {inherit: true, isNonstandard: null},
	flyinggem: {inherit: true, isNonstandard: null},
	ghostgem: {inherit: true, isNonstandard: null},
	grassgem: {inherit: true, isNonstandard: null},
	groundgem: {inherit: true, isNonstandard: null},
	icegem: {inherit: true, isNonstandard: null},
	poisongem: {inherit: true, isNonstandard: null},
	psychicgem: {inherit: true, isNonstandard: null},
	rockgem: {inherit: true, isNonstandard: null},
	steelgem: {inherit: true, isNonstandard: null},
	watergem: {inherit: true, isNonstandard: null},

	// Additions
	longclub: {
		name: "Long Club",
		spritenum: -4,
		fling: {
			basePower: 90,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.baseSpecies === 'Terathwack' || user.m.fusion === 'Terathwack') {
				return critRatio + 2;
			}
		},
		itemUser: ["Terathwack"],
		num: 0,
		gen: 6,
		shortDesc: "If held by a Terathwack, its critical hit ratio is raised by 2 stages.",
	},
	typelessplate: {
		name: "Typeless Plate",
		spritenum: 282,
		onPlate: '???',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === '???') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Typeless",
		shortDesc: "Holder's ???-type attacks have 1.2x power. Judgment is ??? type.",
		num: 301,
		gen: 4,
	},
	wok: {
		name: "Wok",
		spritenum: -5,
		megaStone: "Ludicolo-Egho-Mega",
		megaEvolves: "Ludicolo-Egho",
		itemUser: ["Ludicolo-Egho"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		shortDesc: "If held by a Ludicolo-Egho, this item allows it to Mega Evolve in battle.",
		num: 0,
		gen: 6,
	},
	missingnite: {
		name: "Missingnite",
		spritenum: -5,
		megaStone: "MissingNo.-Mega",
		megaEvolves: "MissingNo.",
		itemUser: ["MissingNo."],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		shortDesc: "If held by a MissingNo., this item allows it to Mega Evolve in battle.",
		num: 0,
		gen: 6,
	},
};
