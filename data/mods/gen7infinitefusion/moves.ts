import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Moves as Parent } from '../gen9infinitefusion/moves';
import { removeInnates, addActiveInnates, swapInnates } from './ifUtils';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Utils.deepClone(Parent),
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	destinybond: {
		inherit: true,
		onPrepareHit(pokemon) {
			pokemon.removeVolatile('destinybond');
		},
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	photongeyser: {
		inherit: true,
		onPrepareHit(target, source, move) {
			if (source.hasItem('Necrozium')) {
				if (source.species.name === 'Necrozma' || (source.m.fusion && source.m.fusion === 'Necrozma')) {
					const abil = source.getAbility();
					if (source.species.name === 'Necrozma') {
						source.formeChange('Necrozma-Ultra', this.effect, true, '[msg]');
					} else {
						source.fusionChange('Necrozma-Ultra', this.effect);
					}
					if (abil && abil.id !== 'prismarmor') {
						source.ability = abil.id;
						source.baseAbility = abil.id;
						source.battle.add('-displayabilities', source, [source.ability, ...(source.m.activeInnates || [])], [source.baseAbility, ...(source.m.innates || [])]);
					}
				}
			}
		},
	},

	// Double Abilities
	gastroacid: {
		inherit: true,
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityState, pokemon, pokemon, 'gastroacid');
				if (this.format.ruleset?.includes('Double Ability Mod')) removeInnates(pokemon, this);
			},
		},
	},
	worryseed: {
		inherit: true,
		onHit(target, source) {
			const oldAbility = target.setAbility('insomnia');
			if (!oldAbility) return oldAbility as false | null;
			if (target.status === 'slp') target.cureStatus();
			if (this.format.ruleset?.includes('Double Ability Mod')) removeInnates(target, this);
		},
	},
	simplebeam: {
		inherit: true,
		onHit(target, source) {
			const oldAbility = target.setAbility('simple');
			if (!oldAbility) return oldAbility as false | null;
			if (this.format.ruleset?.includes('Double Ability Mod')) removeInnates(target, this);
		},
	},
	entrainment: {
		inherit: true,
		onHit(target, source) {
			const oldAbility = target.setAbility(source.ability, source);
			if (!oldAbility) return oldAbility as false | null;
			if (!target.isAlly(source)) target.volatileStaleness = 'external';
			if (this.format.ruleset?.includes('Double Ability Mod')) {
				removeInnates(target, this);
				addActiveInnates(target, source.m.activeInnates, this, 'move: Entrainment');
			}
		},
	},
	roleplay: {
		inherit: true,
		onHit(target, source) {
			const oldAbility = source.setAbility(target.ability, target);
			if (!oldAbility) return oldAbility as false | null;
			if (this.format.ruleset?.includes('Double Ability Mod')) {
				removeInnates(source, this);
				addActiveInnates(source, target.m.activeInnates, this, 'move: Role Play');
			}
		},
	},
	skillswap: {
		inherit: true,
		onHit(target, source, move) {
			const targetAbility = target.getAbility();
			const sourceAbility = source.getAbility();
			if (target.isAlly(source)) {
				this.add('-activate', source, 'move: Skill Swap', '', '', `[of] ${target}`);
			} else {
				this.add('-activate', source, 'move: Skill Swap', targetAbility, sourceAbility, `[of] ${target}`);
			}
			this.singleEvent('End', sourceAbility, source.abilityState, source);
			this.singleEvent('End', targetAbility, target.abilityState, target);
			source.ability = targetAbility.id;
			target.ability = sourceAbility.id;
			source.abilityState = this.initEffectState({ id: this.toID(source.ability), target: source });
			target.abilityState = this.initEffectState({ id: this.toID(target.ability), target });
			source.volatileStaleness = undefined;
			if (!target.isAlly(source)) target.volatileStaleness = 'external';
			this.singleEvent('Start', targetAbility, source.abilityState, source);
			this.singleEvent('Start', sourceAbility, target.abilityState, target);
			if (this.format.ruleset?.includes('Double Ability Mod')) swapInnates(source, target, this, 'move: Skill Swap');
		},
	},
};
