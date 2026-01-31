export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Current items that do not exist

	// Past items that are now legal
	berryjuice: {
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
			if (["Goomba", "Goomba Stack", "Strollin' Stu"].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Goomba", "Goomba Stack", "Strollin' Stu"],
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
			if (["Koopa Troopa", "Paratroopa", "Dry Bones", "Hammer Bro"].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Koopa Troopa", "Paratroopa", "Dry Bones", "Hammer Bro"],
		num: 0,
	},
};
