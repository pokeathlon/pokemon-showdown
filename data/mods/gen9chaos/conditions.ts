// @ts-nocheck
import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { ModdedConditionDataTable } from '../../../sim/dex-conditions';

export const Conditions: ModdedConditionDataTable = {};

const Manual = Utils.deepClone(Conditions);
for (const mod in require('./mods.json')) {
	const ModConditions = require('../' + mod + '/conditions').Conditions as ModdedConditionDataTable;

	for (const key in ModConditions) {
		const id = key as keyof typeof ModConditions;

		if (!Conditions[id]) Conditions[id] = Base[id] ? {inherit: true} : {};
					
		for (const attr in ModConditions[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Conditions[id][attr] && (!Manual[id] || !Manual[id][attr])) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Conditions[id][attr] = ModConditions[id][attr];
			}
		}
	}
}
