import { Utils } from '../../../lib';
import { Items as Base } from '../../items';
import { type ItemData } from '../../../sim/dex-items';
import { toID } from '../../../sim/dex';

import { Items as Chaos } from '../gen9chaos/items';

export const newItems: { [k: string]: { [k: string]: string } } = {};
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Utils.deepClone(Chaos);

const modNaming: { [k: string]: string } = {
	"gen9insurgence": "Ins",
	"gen9uranium": "Ura",
	"gen9mariomon": "Mario",
	"gen9infinity": "Inf",
	"gen9infinitefusion": "IF",
	"gen9soulstones": "SS2",
};

const Manual = Utils.deepClone(Items);
const mods = require('./mods.json');

for (const key in Base) { //makes all vanilla items exist so it can catch modded versions later
	const id = key as IDEntry;
	Items[id] = {
		...Utils.deepClone(Base[id]),
		...Utils.deepClone(Manual[id]),
	};
}

for (const mod in mods) {
	newItems[mod] = {};

	const ModItems: AnyObject = require('../' + mod + '/items').Items;

	for (const key in ModItems) {
		const id = key as IDEntry;

		if (Manual[id] || (mods[mod]["Items"]?.includes(id))) continue;

		if (!Items[id]) Items[id] = {} as ItemData;
		const item: AnyObject = Items[id];

		for (const attr in ModItems[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			// create and change move to mod-move before collision
			if (item[attr] && Base[id] && ModItems[id]["shortDesc"]) {
				const newid = toID(`${id}${modNaming[mod]}`) 
				Items[newid] = {
					...Utils.deepClone(Base[id]),
					...Utils.deepClone(ModItems[id]),
					num: 0,
					gen: 9,
				};
				const newItem: AnyObject = Items[newid];
				newItem.name = `${newItem.name}-${modNaming[mod]}`;
				delete newItem.inherit;
				newItems[mod][id] = newid;
				break;
			}
			else {
				item[attr] = ModItems[id][attr];
			}
		}
	}
}
//console.log(newItems);
