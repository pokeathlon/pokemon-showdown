export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	luckypunch: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name.includes('Chansey') || user.fusion?.includes('Chansey')) {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Chansey-Egho"],
	},

	// Additions
	longclub: {
		name: "Long Club",
		spritenum: -4,
		fling: {
			basePower: 90,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.baseSpecies === 'Terathwak' || user.fusion === 'Terathwak') {
				return critRatio + 2;
			}
		},
		itemUser: ["Terathwak"],
		num: 0,
		gen: 6,
		shortDesc: "If held by a Terathwak, its critical hit ratio is raised by 2 stages.",
	},
};
