export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Current items that do not exist
	loadeddice: {
		inherit: true,
		isNonstandard: "Future",
	},
	boosterenergy: {
		inherit: true,
		isNonstandard: "Future",
	},
	gripclaw: {
		inherit: true,
		isNonstandard: "Future",
	},
	laggingtail: {
		inherit: true,
		isNonstandard: "Future",
	},
	protectivepads: {
		inherit: true,
		isNonstandard: "Future",
	},
	razorclaw: {
		inherit: true,
		isNonstandard: "Future",
	},
	bindingband: {
		inherit: true,
		isNonstandard: "Future",
	},
	destinyknot: {
		inherit: true,
		isNonstandard: "Future",
	},
	ironball: {
		inherit: true,
		isNonstandard: "Future",
	},
	ringtarget: {
		inherit: true,
		isNonstandard: "Future",
	},
	fairyfeather: {
		inherit: true,
		isNonstandard: "Future",
	},
	dracoplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	dreadplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	earthplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	fistplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	flameplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	icicleplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	insectplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	meadowplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	mindplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	skyplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	splashplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	spookyplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	stoneplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	toxicplate: {
		inherit: true,
		isNonstandard: "Future",
	},
	zapplate: {
		inherit: true,
		isNonstandard: "Future",
	},

	// Past items that are now legal
	fightinggem: {
		inherit: true,
		isNonstandard: null,
	},
	flyinggem: {
		inherit: true,
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		isNonstandard: null,
	},
	watergem: {
		inherit: true,
		isNonstandard: null,
	},
	normalgem: {
		inherit: true,
		isNonstandard: null,
	},
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