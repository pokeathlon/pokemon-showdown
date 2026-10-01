// @ts-nocheck
import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { type ModdedAbilityDataTable } from '../../../sim/dex-abilities';
import { toID } from '../../../sim/dex';

import { Abilities as Chaos } from '../gen9chaos/abilities';

export const newAbilities: { [k: string]: string} = {};
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Chaos;

const modNaming: { [k: string]: string } = {
	"gen9insurgence": "Ins",
	"gen9uranium": "Ura",
	"gen9mariomon": "Mario",
	"gen9infinity": "Inf",
	"gen9infinitefusion": "IF",
	"gen9soulstones": "SS2",
};
const Manual = Utils.deepClone(Abilities);
const mods = require('./mods.json');

for (const id in Base) { //makes all vanilla abils exist so it can catch modded versions later
	Abilities[id] = {
		...Utils.deepClone(Base[id]),
		...Utils.deepClone(Abilities[id]),
	};
}
for (const mod in mods) {
	newAbilities[mod] = {};

	const ModAbilities = require('../' + mod + '/abilities').Abilities as ModdedAbilityDataTable;

	for (const key in ModAbilities) {
		const id = key as keyof typeof ModAbilities;

		if (Manual[id] || (mods[mod]["Abilities"]?.includes(id))) continue;

		if (!Abilities[id]) Abilities[id] = {};

		for (const attr in ModAbilities[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Abilities[id][attr] && Base[id] && ModAbilities[id]["shortDesc"]) { //same method as moves
				const newid = toID(`${id}${modNaming[mod]}`) 
				Abilities[newid] = {
					...Utils.deepClone(Base[id]),
					...Utils.deepClone(ModAbilities[id]),
					num: 0,
					gen: 9,
				};
				Abilities[newid].name = `${Abilities[newid].name}-${modNaming[mod]}`,
				delete Abilities[newid].inherit
				newAbilities[mod][id] = newid;
				break;
			}
			else {
				Abilities[id][attr] = ModAbilities[id][attr];
			}
		}
	}
}
//console.log(newAbilities);
