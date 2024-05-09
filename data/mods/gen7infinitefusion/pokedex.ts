const {Dex} = require('../../../sim/dex');
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	gengar: {
		inherit: true,
		abilities: {0: "Levitate"},
	},
	delibird: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Hustle", H: "Snow Warning"},
	},
	regigigas: {
		inherit: true,
		abilities: {0: "Slow Start", H: "Mold Breaker"},
	},
	zapdos: {
		inherit: true,
		abilities: {0: "Pressure", H: "Lightning Rod"},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Pressure", H: "Volt Absorb"},
	},
	entei: {
		inherit: true,
		abilities: {0: "Pressure", H: "Flash Fire"},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Pressure", H: "Water Absorb"},
	},
	litwick: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Shadow Tag"},
	},
	lampent: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Shadow Tag"},
	},
	chandelure: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Shadow Tag"},
	},
	wigglytuff: {
		inherit: true,
		abilities: {0: "Cute Charm", H: "Frisk"},
	},
	feebas: {
		inherit: true,
		abilities: {0: "Swift Swim", H: "Adaptability"},
	},
	milotic: {
		inherit: true,
		abilities: {0: "Marvel Scale", H: "Cute Charm"},
	},
	ferrothorn: {
		inherit: true,
		abilities: {0: "Iron Barbs"},
	},
	unown: {
		inherit: true,
		abilities: {0: "Levitate", H: "Mummy"},
	},
	koffing: {
		inherit: true,
		abilities: {0: "Levitate", H: "Stench"},
	},
	weezing: {
		inherit: true,
		abilities: {0: "Levitate", H: "Stench"},
	},
	flygon: {
		inherit: true,
		abilities: {0: "Levitate", H: "Dry Skin"},
	},
	talonflame: {
		inherit: true,
		abilities: {0: "Big Pecks", H: "Gale Wings"},
	},
	mewtwo: {
		inherit: true,
		abilities: {0: "Pressure", H: "Immunity"},
	},
	darkrai: {
		inherit: true,
		abilities: {0: "Bad Dreams", H: "White Smoke"},
	},
	kyurem: {
		inherit: true,
		abilities: {0: "Pressure", H: "Ice Body"},
	},
	zekrom: {
		inherit: true,
		abilities: {0: "Teravolt", H: "Volt Absorb"},
	},
	reshiram: {
		inherit: true,
		abilities: {0: "Turboblaze", H: "Flare Boost"},
	},
	hydreigon: {
		inherit: true,
		abilities: {0: "Levitate", H: "Hustle"},
	},
	genesect: {
		inherit: true,
		abilities: {0: "Download", H: "Motor Drive"},
	},
	meloettapirouette: {
		inherit: true,
		battleOnly: null,
		requiredMove: null,
	},
	...Dex.deepClone(require('../gen9infinitefusion/pokedex').Pokedex)
};
