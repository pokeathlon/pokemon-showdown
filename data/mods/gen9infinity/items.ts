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
			if (user.baseSpecies.baseSpecies === 'Terathwack' || user.fusion === 'Terathwack') {
				return critRatio + 2;
			}
		},
		itemUser: ["Terathwack"],
		num: 0,
		gen: 6,
		shortDesc: "If held by a Terathwack, its critical hit ratio is raised by 2 stages.",
	},
};
