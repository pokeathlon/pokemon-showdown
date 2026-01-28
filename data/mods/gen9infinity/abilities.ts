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
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('snowscape');
		},
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
	nightmareheart: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nightmare Heart');
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
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Nightmare Heart",
		shortDesc: "This Pokemon is healed 1/4 by Dark, 1/8 by Snow; is hurt 1.25x by Fairy, 1/8 by Sun.",
		rating: 5,
		num: 0,
	},
	wokhei: {
		onFoeAfterSetStatus(status, target, source, effect) {
			if (effect.effectType != 'Move') return;
			if (target && source === target) return;
			if (status.id === 'brn') this.boost({atk: 2}, source, source, null, false, true);
		},
		flags: {},
		name: "Wok Hei",
		shortDesc: "+2 Atk. when burning a foe.",
		rating: 5,
		num: 0,
	},
	crystalline: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Water') {
				this.debug('Crystalline weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Water') {
				this.debug('Crystalline weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Crystalline",
		shortDesc: "Ground-/Water-type moves against this Pokemon deal damage with a halved offensive stat.",
		rating: 3.5,
		num: 47,
	},
};
