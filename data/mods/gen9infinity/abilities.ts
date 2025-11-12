export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || ['knockoff', 'dinokick'].includes(this.activeMove.id)) {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Sticky Hold",
		rating: 1.5,
		num: 60,
	},

	// Additions
	purefocus: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Pure Focus",
		shortDesc: "Doubles the user's Special Attack stat.",
		rating: 5,
		num: 0,
	},
	nightmareking: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nightmare King');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(1.25);
			}
		},
		flags: { breakable: 1 },
		name: "Nightmare King",
		shortDesc: "This Pokemon is healed 1/4 by Dark; is hurt 1.25x by Fairy.",
		rating: 5,
		num: 0,
	},
};
