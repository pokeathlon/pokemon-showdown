export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {

	// Modded
	// Gems
	buggem: {
		inherit: true,
		isNonstandard: null,
	},
	darkgem: {
		inherit: true,
		isNonstandard: null,
		gen: undefined,
	},
	dragongem: {
		inherit: true,
		isNonstandard: null,
	},
	electricgem: {
		inherit: true,
		isNonstandard: null,
	},
	fairygem: {
		inherit: true,
		isNonstandard: null,
	},
	fightinggem: {
		inherit: true,
		isNonstandard: null,
	},
	firegem: {
		inherit: true,
		isNonstandard: null,
	},
	flyinggem: {
		inherit: true,
		isNonstandard: null,
	},
	ghostgem: {
		inherit: true,
		isNonstandard: null,
	},
	grassgem: {
		inherit: true,
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		isNonstandard: null,
	},
	icegem: {
		inherit: true,
		isNonstandard: null,
	},
	poisongem: {
		inherit: true,
		isNonstandard: null,
	},
	psychicgem: {
		inherit: true,
		isNonstandard: null,
	},
	rockgem: {
		inherit: true,
		isNonstandard: null,
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	watergem: {
		inherit: true,
		isNonstandard: null,
	},
	goombaboots: {
		name: "Goomba Boots",
		shortDesc: "If held by a Goomba/Goomba Stack, its Speed is doubled.",
		spritenum: -5,
		fling: {
			basePower: 10,
		},
		onModifySpe(spe, pokemon) {
			if (["Goomba", "Goomba Stack"].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Goomba", "Goomba Stack"],
		num: 0,
	},
	sturdyshell: {
		name: "Sturdy Shell",
		shortDesc: "If held by a Koopa Troopa/Paratroopa/Dry Bones, its Defense is doubled.",
		spritenum: -5,
		fling: {
			basePower: 10,
		},
		onModifyDef(def, pokemon) {
			if (["Koopa Troopa", "Paratroopa", "Dry Bones"].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Koopa Troopa", "Paratroopa", "Dry Bones"],
		num: 0,
	},
};