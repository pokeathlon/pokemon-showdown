export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	fullincense: {
		inherit: true,
		isNonstandard: null,
		gen: 9,
	},

	// Additions
	electrodite: {
		name: "Electrodite",
		desc: "If held by a Electrode, this item allows it to Mega Evolve in battle.",
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
		desc: "If held by a Florges, this item allows it to Mega Evolve in battle.",
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
		desc: "If held by a Snorlax-Frost, this item allows it to Mega Evolve in battle.",
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
		desc: "If held by a Blaziken-Delta, this item allows it to Mega Evolve in battle.",
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
		desc: "If held by a Sceptile-Delta, this item allows it to Mega Evolve in battle.",
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
	sekrilite: {
		name: "Sekrilite",
		desc: "If held by a Sekrilon, this item allows it to Mega Evolve in battle.",
		spritenum: 623,
		megaStone: "Sekrilon-Mega",
		megaEvolves: "Sekrilon",
		itemUser: ["Sekrilon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	boomerang: {
		name: "Boomerang",
		desc: "Fling hits twice. Cannot be lost.",
		spritenum: -3,
		onTakeItem(item, pokemon, source) {
			if ((source && source !== pokemon) || (this.activeMove && this.activeMove.id === 'knockoff')) {
				return false;
			}
		},
		fling: {
			basePower: 55,
		},
		num: 0,
	},
	vigorherb: {
		name: "Vigor Herb",
		desc: "Holder's recharge turn is skipped. Single use.",
		onUpdate(pokemon) {	
			if (pokemon.volatiles["mustrecharge"] && pokemon.useItem()) {
				pokemon.removeVolatile("mustrecharge");
				this.add("cant", pokemon, "recharge");
				return;
			}
		},
		spritenum: -3,
		num: 0,
	},
	paddedhelmet: {
		name: "Padded Helmet",
		desc: "Holder takes half the recoil damage.",
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.recoil) move.recoil[1] = move.recoil[1]*2;
		},
		num: 0,
		spritenum: -3
	},
	ejectbandage: {
		name: "Eject Bandage",
		shortDesc: "If holder survives a hit, it immediately switches out to a chosen ally and heals 33%. Single use.",
		spritenum: -3,
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && target.hp && move && move.category !== 'Status' && !move.flags['futuremove']) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.beingCalledBack || target.isSkyDropped()) return;
				if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
				}
				target.heal(target.baseMaxhp / 3);
				target.switchFlag = true;
				if (target.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
			}
		},
		num: 0,
	},
};
