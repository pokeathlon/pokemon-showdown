import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { type AbilityData } from '../../../sim/dex-abilities';
import { toID } from '../../../sim/dex';

import { Abilities as Chaos } from '../gen9chaos/abilities';

export const newAbilities: { [k: string]: { [k: string]: string } } = {};
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Utils.deepClone(Chaos);

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

for (const key in Base) { // makes all vanilla abils exist so it can catch modded versions later
	const id = key as IDEntry;
	Abilities[id] = {
		...Utils.deepClone(Base[id]),
		...Utils.deepClone(Abilities[id]),
	};
}
for (const mod in mods) {
	newAbilities[mod] = {};

	const ModAbilities: AnyObject = require('../' + mod + '/abilities').Abilities;

	for (const key in ModAbilities) {
		const id = key as IDEntry;

		if (Manual[id] || (mods[mod]["Abilities"]?.includes(id))) continue;

		if (!Abilities[id]) Abilities[id] = {} as AbilityData;
		const ability: AnyObject = Abilities[id];

		for (const attr in ModAbilities[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (ability[attr] && Base[id] && ModAbilities[id]["shortDesc"]) { // same method as moves
				const newid = toID(`${id}${modNaming[mod]}`);
				Abilities[newid] = {
					...Utils.deepClone(Base[id]),
					...Utils.deepClone(ModAbilities[id]),
					num: 0,
					gen: 9,
				};
				const newAbility: AnyObject = Abilities[newid];
				newAbility.name = `${newAbility.name}-${modNaming[mod]}`;
				delete newAbility.inherit;
				newAbilities[mod][id] = newid;
				break;
			} else {
				ability[attr] = ModAbilities[id][attr];
			}
		}
	}
}
// console.log(newAbilities);
