import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { type ModdedConditionDataTable } from '../../../sim/dex-conditions';
import { Manual as Chaos } from '../gen9chaos/conditions';

export const Conditions: ModdedConditionDataTable = {
	...Utils.deepClone(Chaos),
	frb: {
		name: 'frb',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frb', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frb');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function (scripts)
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
};

const Manual = Utils.deepClone(Conditions);
const mods = require('./mods.json');
for (const mod in mods) {
	const ModConditions: AnyObject = require('../' + mod + '/conditions').Conditions;

	for (const key in ModConditions) {
		const id = key as IDEntry;

		if (Manual[id] || (mods[mod]["Conditions"]?.includes(id))) continue;

		if (!Conditions[id]) Conditions[id] = Base[id] ? { inherit: true } : {};
		const condition: AnyObject = Conditions[id];

		for (const attr in ModConditions[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (condition[attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				condition[attr] = ModConditions[id][attr];
			}
		}
	}
}
