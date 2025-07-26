// @ts-nocheck
import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { ModdedConditionDataTable } from '../../../sim/dex-conditions';

import { treasures } from './abilities';

export const Conditions: ModdedConditionDataTable = {
	frz: Base.frz,
	arceus: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.fusion || pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
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

		if (Manual[id] || (mods[mod]["Conditions"] && mods[mod]["Conditions"].includes(id))) continue;

		if (!Conditions[id]) Conditions[id] = Base[id] ? {inherit: true} : {};
					
		for (const attr in ModConditions[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Conditions[id][attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Conditions[id][attr] = ModConditions[id][attr];
			}
		}
	}
}
