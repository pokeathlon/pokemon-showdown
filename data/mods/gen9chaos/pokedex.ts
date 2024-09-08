export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	// IF
	magnemite: {
		inherit: true,
		types: ["Steel", "Electric"],
	},
	magneton: {
		inherit: true,
		types: ["Steel", "Electric"],
	},
	magnezone: {
		inherit: true,
		types: ["Steel", "Electric"],
	},
	trevenant: {
		inherit: true,
		types: ["Grass", "Ghost"],
	},

	// Insurgence
	delibird: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Hustle", H: "Winter Joy"},
	},
	whismur: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Amplifier", H: "Rattled"},
	},
	exploud: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Amplifier", H: "Scrappy"},
	},
	lunatone: {
		inherit: true,
		abilities: {0: "Levitate", H: "Noctem"},
		evoLevel: 45,
		evos: ["Penumbralith"],
	},
	solrock: {
		inherit: true,
		abilities: {0: "Levitate", H: "Drought"},
		evoLevel: 45,
		evos: ["Penumbralith"],
	},
	spiritomb: {
		inherit: true,
		types: ["Dark", "Ghost"],
		abilities: {0: "Pressure", H: "Noctem"},
	},
	darkrai: {
		inherit: true,
		abilities: {0: "Bad Dreams", H: "Absolution"},
	},
	arceus: {
		inherit: true,
		abilities: {0: "Multitype", H: "Protean"},
	},
	zygarde: {
		inherit: true,
		abilities: {0: "Aura Break", 1: "Power Construct"},
	},
	vaporeon: {
		inherit: true,
		prevo: undefined,
	},
	jolteon: {
		inherit: true,
		prevo: undefined,
	},
	flareon: {
		inherit: true,
		prevo: undefined,
	},
	leafeon: {
		inherit: true,
		prevo: undefined,
	},
	glaceon: {
		inherit: true,
		prevo: undefined,
	},
	espeon: {
		inherit: true,
		prevo: undefined,
	},
	umbreon: {
		inherit: true,
		prevo: undefined,
	},
	sylveon: {
		inherit: true,
		prevo: undefined,
	},

	// PoA
	// eviolite
	starmie: {
		inherit: true,
		evoLevel: 45,
		evos: ["Staruhz"],
	},
	spinda: {
		inherit: true,
		evoLevel: 45,
		evos: ["Pandiz"],
	},
	purugly: {
		inherit: true,
		evoLevel: 45,
		evos: ["Growlsome"],
	},
	kecleon: {
		inherit: true,
		evoLevel: 45,
		evos: ["Kaleidleon"],
	},
	parasect: {
		inherit: true,
		evoLevel: 45,
		evos: ["Parashukado"],
	},
	sandslash: {
		inherit: true,
		evoLevel: 45,
		evos: ["Scaleslash"],
	},
	// other PoA changes
	magmortar: {
		inherit: true,
		abilities: {0: "Flame Body", 1:"Cannoneer", H: "Vital Spirit"},
	},
	remoraid: {
		inherit: true,
		abilities: {0: "Hustle", 1: "Sniper", H: "Moody", S:"Cannoneer"},
	},
	octillery: {
		inherit: true,
		abilities: {0: "Suction Cups", 1: "Sniper", H: "Moody", S:"Cannoneer"},
	},
	rhyperior: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Solid Rock", H: "Reckless", S:"Cannoneer"},
	},
	toucannon: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Skill Link", H: "Sheer Force", S:"Cannoneer"},
	},
	raichualola: {
		inherit: true,
		abilities: {0: "Surge Surfer", 1: "Psycho Slider"},
	},
	veluza: {
		inherit: true,
		abilities: {0: "Mold Breaker", 1: "Psycho Slider", H: "Sharpness"},
	},
};