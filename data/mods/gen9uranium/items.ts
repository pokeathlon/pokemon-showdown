export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
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
	hafliberry: {
		name: "Hafli Berry",
		shortDesc: "Halves damage taken from a supereffective Nuclear-type attack. Single use.",
		spritenum: -2,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Nuclear",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Nuclear' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 0,
	},

	stick: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'barand' || this.toID(user.baseSpecies.baseSpecies) === 'barandnuclear') {
				return critRatio + 2;
			}
		},
		itemUser: ["Barand", "Barand-Nuclear"],
		shortDesc: "If held by a Farfetch’d or Barand, its critical hit ratio is raised by 2 stages.",
	},
	
	prettyribbon: {
		name: "Pretty Ribbon",
		shortDesc: "Holder's Fairy-type attacks have 1.2x power.",
		spritenum: -2,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fairy') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 0,
	},
	
	// Current items that do not exist
	dracoplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	dreadplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	earthplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	fistplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	flameplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	icicleplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	insectplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	ironplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	meadowplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	mindplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	pixieplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	skyplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	splashplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	spookyplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	stoneplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	toxicplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	zapplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	// Some berries are unavailable
	yacheberry: {
		inherit: true,
		isNonstandard: "Future",
	},
	// Normal Gem is not available
	normalgem: {
		inherit: true,
		isNonstandard: "Future",
	},

	// Past items that are now legal
	flyinggem: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Holder's first successful Flying-type attack will have 1.5x power. Single use.",
	},
	psychicgem: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Holder's first successful Psychic-type attack will have 1.5x power. Single use.",
	},
};
