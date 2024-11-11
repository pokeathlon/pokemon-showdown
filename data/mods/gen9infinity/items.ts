const {Dex} = require('../../../sim/dex');
export const ModItems: import('../../../sim/dex-items').ModdedItemDataTable = {
	longclub: {
		name: "Long Club",
		spritenum: -4,
		fling: {
			basePower: 90,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.baseSpecies === 'Terathwak') {
				return critRatio + 2;
			}
		},
		itemUser: ["Terathwak"],
		num: 0,
		gen: 6,
		shortDesc: "If held by a Terathwak, its critical hit ratio is raised by 2 stages.",
	},
};
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Dex.deepClone(ModItems);
