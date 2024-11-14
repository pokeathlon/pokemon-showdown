const {Dex} = require('../../../sim/dex');
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	...Dex.deepClone(require('../gen9infinity/items').ModItems),
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

for (var i of Dex.items.all()) {
	if (i.megaStone) {
		Items[i.id] = {inherit: true, isNonstandard: "Unobtainable"};
	}
}
