import { fail } from 'assert';

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
		spritenum: -3,
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
		spritenum: -3,
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
			if (move.recoil) move.recoil[1] = move.recoil[1] * 2;
		},
		num: 0,
		spritenum: -3,
	},
	ejectbandage: {
		name: "Eject Bandage",
		shortDesc: "Holder heals 33% on switch out. Single use.",
		spritenum: -3,
		onSwitchOut(source) {
			source.heal(source.maxhp / 3);
			source.useItem();
		},
		num: 0,
	},
	energydrink: {
		name: "Energy Drink",
		desc: "The holder was very tired and thus downed 17 cans of Red Bull, preventing it from falling asleep for the next 9 days.",
		shortDesc: "This Pokemon cannot fall asleep.",
		spritenum: -3,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'item: Energy Drink');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-activate', target, 'item: Energy Drink');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-activate', target, 'item: Energy Drink');
				return null;
			}
		},
		num: 0,
	},
	managel: { // Can't figure out how to make it not clearBoosts(), so modifying moves instead 
		name: "Mana Gel",
		shortDesc: "The holder cannot have its stat changes cleared or Stolen. Psych Up will fail when used against the holder.",
		spritenum: -3,
		onFoeModifyMove(move, source, target) {
			if (move.stealsBoosts) move.stealsBoosts = false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'psychup') return false;
		},
		num: 0,
	},
	buddylantern: {
		name: "Buddy Lantern",
		shortDesc: "Holder deals x0.125 damage to allies.",
		spritenum: -3,
		onModifyDamage(damage, source, target, move) {
			if (target.isAlly(source)) {
				this.debug('Buddy Lantern neutralize');
				return this.chainModify(0.125);
			}
		},
		num: 0,
	},
};
