import { Items as Base } from '../../items';
import { Items as Parent} from '../gen9infinity/items';

export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	...Parent,
	loadeddice: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	roomservice: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	covertcloak: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	punchingglove: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	throatspray: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	adrenalineorb: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	clearamulet: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
	blunderpolicy: {
		inherit: true,
		gen: 6,
		isNonstandard: null,
	},
};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Base[id].megaStone) {
		Items[id] = {inherit: true, isNonstandard: "Unobtainable"};
	}
}
