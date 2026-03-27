// @ts-nocheck
import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { type ModdedConditionDataTable } from '../../../sim/dex-conditions';

import { treasures } from './abilities';

export const Conditions: ModdedConditionDataTable = {
	frz: Base.frz,
	arceus: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.m.fusion || pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	partiallytrapped: { // modified because of great bind
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.lastMoveUsed?.id === 'greatbind') return source?.hasItem('gripclaw') ? 6 : 5; // always 4 turns, 5 if grip claw
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},

	// POA
	///////////////////////////////////////////////////////////////////

	// Additions
	lunachi: {
		name: 'Lunachi',
		onUpdate(pokemon) {
			const curItem = pokemon.getItem();
			if (curItem.id in treasures) {
				if (pokemon.species.id === 'lunachi' && pokemon.ability === 'sacredtreasures') {
					pokemon.formeChange('lunachibestowed', this.effect, true);
				}
			} else {
				if (pokemon.species.id === 'lunachibestowed') {
					pokemon.formeChange('lunachi', this.effect, true);
					pokemon.ability = 'sacredtreasures' as ID;
					this.add('-ability', pokemon, 'Sacred Treasures');
				}
			}
		},
		onTakeItem(item, pokemon, source, move) {
			if (pokemon.species.id === 'lunachibestowed') {
				pokemon.formeChange('lunachi', this.effect, true);
				pokemon.ability = 'sacredtreasures' as ID;
				this.add('-ability', pokemon, 'Sacred Treasures');
			}
		},
	},
	scatteredcoins: {
		name: 'Scattered Coins',
		noCopy: true,
		onSideStart(target, source, sourceEffect) {
			this.add('-sidestart', target, 'move: Scattered Coins');
		},
	},
	luckycharm: {
		name: 'Lucky Charm',
		noCopy: true,
		onSideStart(target, source, sourceEffect) {
			this.add('-sidestart', target, 'ability: Lucky Charm');
		},
		onModifySecondaries(secondaries) {
			this.debug('Lucky Charm prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onCriticalHit: false,
	},
};

const Manual = Utils.deepClone(Conditions);
const mods = require('./mods.json');
for (const mod in mods) {
	const ModConditions = require('../' + mod + '/conditions').Conditions as ModdedConditionDataTable;

	for (const key in ModConditions) {
		const id = key as keyof typeof ModConditions;

		if (Manual[id] || (mods[mod]["Conditions"]?.includes(id))) continue;

		if (!Conditions[id]) Conditions[id] = Base[id] ? { inherit: true } : {};

		for (const attr in ModConditions[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Conditions[id][attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Conditions[id][attr] = ModConditions[id][attr];
			}
		}
	}
}
