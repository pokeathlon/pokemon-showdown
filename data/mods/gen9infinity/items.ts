export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	luckypunch: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name.includes('Chansey') || user.m.fusion?.includes('Chansey')) {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Chansey-Egho"],
	},
	buggem: {inherit: true, isNonstandard: null},
	darkgem: {inherit: true, isNonstandard: null},
	dragongem: {inherit: true, isNonstandard: null},
	electricgem: {inherit: true, isNonstandard: null},
	fairygem: {inherit: true, isNonstandard: null},
	fightinggem: {inherit: true, isNonstandard: null},
	firegem: {inherit: true, isNonstandard: null},
	flyinggem: {inherit: true, isNonstandard: null},
	ghostgem: {inherit: true, isNonstandard: null},
	grassgem: {inherit: true, isNonstandard: null},
	groundgem: {inherit: true, isNonstandard: null},
	icegem: {inherit: true, isNonstandard: null},
	poisongem: {inherit: true, isNonstandard: null},
	psychicgem: {inherit: true, isNonstandard: null},
	rockgem: {inherit: true, isNonstandard: null},
	steelgem: {inherit: true, isNonstandard: null},
	watergem: {inherit: true, isNonstandard: null},

	// Additions
	longclub: {
		name: "Long Club",
		spritenum: -4,
		fling: {
			basePower: 90,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.baseSpecies === 'Terathwack' || user.m.fusion === 'Terathwack') {
				return critRatio + 2;
			}
		},
		itemUser: ["Terathwack"],
		num: 0,
		gen: 6,
		shortDesc: "If held by a Terathwack, its critical hit ratio is raised by 2 stages.",
	},
};
