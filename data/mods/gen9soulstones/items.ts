export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Current items that do not exist

	// Past items that are now legal
	
	// New items 
		gengarites: {
    		name: "Gengarite-S",
    		spritenum: -3,
    		megaStone: { "Gengar-Soulstones": "Gengar-Soulstones-Mega" },
    		itemUser: ["Gengar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	dodrinite: {
    		name: "Dodrinite",
    		spritenum: -3,
    		megaStone: { "Dodrio-Soulstones": "Dodrio-Soulstones-Mega" },
    		itemUser: ["Dodrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	arbokinite: {
    		name: "Arbokinite",
    		spritenum: -3,
    		megaStone: { "Arbok-Soulstones": "Arbok-Soulstones-Mega" },
    		itemUser: ["Arbok-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	starmite: {
    		name: "Starmite",
    		spritenum: -3,
    		megaStone: { "Starmie-Soulstones": "Starmie-Soulstones-Mega" },
    		itemUser: ["Starmie-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	steelixites: {
    		name: "Steelixite-S",
    		spritenum: -3,
    		megaStone: { "Steelix-Soulstones": "Steelix-Soulstones-Mega" },
    		itemUser: ["Steelix-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	xatunite: {
    		name: "Xatunite",
    		spritenum: -3,
    		megaStone: { "Xatu-Soulstones": "Xatu-Soulstones-Mega" },
    		itemUser: ["Xatu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	seismitoadite: {
    		name: "Seismitoadite",
    		spritenum: -3,
    		megaStone: { "Seismitoad-Soulstones": "Seismitoad-Soulstones-Mega" },
    		itemUser: ["Seismitoad-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	golite: {
    		name: "Golite",
    		spritenum: -3,
    		megaStone: { "Golurk-Soulstones": "Golurk-Soulstones-Mega" },
    		itemUser: ["Golurk-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	gyaradosites: {
    		name: "Gyaradosite-S",
    		spritenum: -3,
    		megaStone: { "Gyarados-Soulstones": "Gyarados-Soulstones-Mega" },
    		itemUser: ["Gyarados-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	avaluggite: {
    		name: "Avaluggite",
    		spritenum: -3,
    		megaStone: { "Avalugg-Soulstones": "Avalugg-Soulstones-Mega" },
    		itemUser: ["Avalugg-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	rapidashinite: {
    		name: "Rapidashinite",
    		spritenum: -3,
    		megaStone: { "Rapidash-Soulstones": "Rapidash-Soulstones-Mega" },
    		itemUser: ["Rapidash-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	aerodactylites: {
    		name: "Aerodactylite-S",
    		spritenum: -3,
    		megaStone: { "Aerodactyl-Soulstones": "Aerodactyl-Soulstones-Mega" },
    		itemUser: ["Aerodactyl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	giganite: {
    		name: "Giganite",
    		spritenum: -3,
    		megaStone: { "Gigalith-Soulstones": "Gigalith-Soulstones-Mega" },
    		itemUser: ["Gigalith-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	gliscite: {
    		name: "Gliscite",
    		spritenum: -3,
    		megaStone: { "Gliscor-Soulstones": "Gliscor-Soulstones-Mega" },
    		itemUser: ["Gliscor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sudowoodites: {
    		name: "Sudowoodite-S",
    		spritenum: -3,
    		megaStone: { "Sudowoodo-Soulstones": "Sudowoodo-Soulstones-Mega" },
    		itemUser: ["Sudowoodo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	noctowlite: {
    		name: "Noctowlite",
    		spritenum: -3,
    		megaStone: { "Noctowl-Soulstones": "Noctowl-Soulstones-Mega" },
    		itemUser: ["Noctowl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	electronite: {
    		name: "Electronite",
    		spritenum: -3,
    		megaStone: { "Electrode-Soulstones": "Electrode-Soulstones-Mega" },
    		itemUser: ["Electrode-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	beedrillites: {
    		name: "Beedrillite-S",
    		spritenum: -3,
    		megaStone: { "Beedrill-Soulstones": "Beedrill-Soulstones-Mega" },
    		itemUser: ["Beedrill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	machampite: {
    		name: "Machampite",
    		spritenum: -3,
    		megaStone: { "Machamp-Soulstones": "Machamp-Soulstones-Mega" },
    		itemUser: ["Machamp-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	venusaurites: {
    		name: "Venusaurite-S",
    		spritenum: -3,
    		megaStone: { "Venusaur-Soulstones": "Venusaur-Soulstones-Mega" },
    		itemUser: ["Venusaur-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sharpedonites: {
    		name: "Sharpedonite-S",
    		spritenum: -3,
    		megaStone: { "Sharpedo-Soulstones": "Sharpedo-Soulstones-Mega" },
    		itemUser: ["Sharpedo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	chandelite: {
    		name: "Chandelite",
    		spritenum: -3,
    		megaStone: { "Chandelure-Soulstones": "Chandelure-Soulstones-Mega" },
    		itemUser: ["Chandelure-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	glalitites: {
    		name: "Glalitite-S",
    		spritenum: -3,
    		megaStone: { "Glalie-Soulstones": "Glalie-Soulstones-Mega" },
    		itemUser: ["Glalie-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	froslassites: {
    		name: "Froslassite-S",
    		spritenum: -3,
    		megaStone: { "Froslass-Soulstones": "Froslass-Soulstones-Mega" },
    		itemUser: ["Froslass-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	infernapinite: {
    		name: "Infernapinite",
    		spritenum: -3,
    		megaStone: { "Infernape-Soulstones": "Infernape-Soulstones-Mega" },
    		itemUser: ["Infernape-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sablenites: {
    		name: "Sablenite-S",
    		spritenum: -3,
    		megaStone: { "Sableye-Soulstones": "Sableye-Soulstones-Mega" },
    		itemUser: ["Sableye-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	bearticite: {
    		name: "Bearticite",
    		spritenum: -3,
    		megaStone: { "Beartic-Soulstones": "Beartic-Soulstones-Mega" },
    		itemUser: ["Beartic-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sceptilites: {
    		name: "Sceptilite-S",
    		spritenum: -3,
    		megaStone: { "Sceptile-Soulstones": "Sceptile-Soulstones-Mega" },
    		itemUser: ["Sceptile-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tyranitarites: {
    		name: "Tyranitarite-S",
    		spritenum: -3,
    		megaStone: { "Tyranitar-Soulstones": "Tyranitar-Soulstones-Mega" },
    		itemUser: ["Tyranitar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	hippowdonite: {
    		name: "Hippowdonite",
    		spritenum: -3,
    		megaStone: { "Hippowdon-Soulstones": "Hippowdon-Soulstones-Mega" },
    		itemUser: ["Hippowdon-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	ampharosites: {
    		name: "Ampharosite-S",
    		spritenum: -3,
    		megaStone: { "Ampharos-Soulstones": "Ampharos-Soulstones-Mega" },
    		itemUser: ["Ampharos-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	altarianites: {
    		name: "Altarianite-S",
    		spritenum: -3,
    		megaStone: { "Altaria-Soulstones": "Altaria-Soulstones-Mega" },
    		itemUser: ["Altaria-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	heracronites: {
    		name: "Heracronite-S",
    		spritenum: -3,
    		megaStone: { "Heracross-Soulstones": "Heracross-Soulstones-Mega" },
    		itemUser: ["Heracross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sawsbuckite: {
    		name: "Sawsbuckite",
    		spritenum: -3,
    		megaStone: { "Sawsbuck-Soulstones": "Sawsbuck-Soulstones-Mega" },
    		itemUser: ["Sawsbuck-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	aggronites: {
    		name: "Aggronite-S",
    		spritenum: -3,
    		megaStone: { "Aggron-Soulstones": "Aggron-Soulstones-Mega" },
    		itemUser: ["Aggron-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	slowkingite: {
    		name: "Slowkingite",
    		spritenum: -3,
    		megaStone: { "Slowking-Soulstones": "Slowking-Soulstones-Mega" },
    		itemUser: ["Slowking-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	corvinite: {
    		name: "Corvinite",
    		spritenum: -3,
    		megaStone: { "Corviknight-Soulstones": "Corviknight-Soulstones-Mega" },
    		itemUser: ["Corviknight-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	kingdranite: {
    		name: "Kingdranite",
    		spritenum: -3,
    		megaStone: { "Kingdra-Soulstones": "Kingdra-Soulstones-Mega" },
    		itemUser: ["Kingdra-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	butterfrite: {
    		name: "Butterfrite",
    		spritenum: -3,
    		megaStone: { "Butterfree-Soulstones": "Butterfree-Soulstones-Mega" },
    		itemUser: ["Butterfree-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	furretite: {
    		name: "Furretite",
    		spritenum: -3,
    		megaStone: { "Furret-Soulstones": "Furret-Soulstones-Mega" },
    		itemUser: ["Furret-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	gardevoirites: {
    		name: "Gardevoirite-S",
    		spritenum: -3,
    		megaStone: { "Gardevoir-Soulstones": "Gardevoir-Soulstones-Mega" },
    		itemUser: ["Gardevoir-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	galladites: {
    		name: "Galladite-S",
    		spritenum: -3,
    		megaStone: { "Gallade-Soulstones": "Gallade-Soulstones-Mega" },
    		itemUser: ["Gallade-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	dugtrioite: {
    		name: "Dugtrioite",
    		spritenum: -3,
    		megaStone: { "Dugtrio-Soulstones": "Dugtrio-Soulstones-Mega" },
    		itemUser: ["Dugtrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	azumarillite: {
    		name: "Azumarillite",
    		spritenum: -3,
    		megaStone: { "Azumarill-Soulstones": "Azumarill-Soulstones-Mega" },
    		itemUser: ["Azumarill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	meloettite: {
    		name: "Meloettite",
    		spritenum: -3,
    		megaStone: { "Meloetta-Soulstones": "Meloetta-Soulstones-Mega" },
    		itemUser: ["Meloetta-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	absolites: {
    		name: "Absolite-S",
    		spritenum: -3,
    		megaStone: { "Absol-Soulstones": "Absol-Soulstones-Mega" },
    		itemUser: ["Absol-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	metagrossites: {
    		name: "Metagrossite-S",
    		spritenum: -3,
    		megaStone: { "Metagross-Soulstones": "Metagross-Soulstones-Mega" },
    		itemUser: ["Metagross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	medichamites: {
    		name: "Medichamite-S",
    		spritenum: -3,
    		megaStone: { "Medicham-Soulstones": "Medicham-Soulstones-Mega" },
    		itemUser: ["Medicham-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	pidgeotites: {
    		name: "Pidgeotite-S",
    		spritenum: -3,
    		megaStone: { "Pidgeot-Soulstones": "Pidgeot-Soulstones-Mega" },
    		itemUser: ["Pidgeot-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	blissite: {
    		name: "Blissite",
    		spritenum: -3,
    		megaStone: { "Blissey-Soulstones": "Blissey-Soulstones-Mega" },
    		itemUser: ["Blissey-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tentacruelite: {
    		name: "Tentacruelite",
    		spritenum: -3,
    		megaStone: { "Tentacruel-Soulstones": "Tentacruel-Soulstones-Mega" },
    		itemUser: ["Tentacruel-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tsareenitex: {
    		name: "Tsareenite-X",
    		spritenum: -3,
    		megaStone: { "Tsareena-Soulstones": "Tsareena-Soulstones-Mega-X" },
    		itemUser: ["Tsareena-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tsareenitey: {
    		name: "Tsareenite-Y",
    		spritenum: -3,
    		megaStone: { "Tsareena-Soulstones": "Tsareena-Soulstones-Mega-Y" },
    		itemUser: ["Tsareena-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	beheeyemite: {
    		name: "Beheeyemite",
    		spritenum: -3,
    		megaStone: { "Beheeyem-Soulstones": "Beheeyem-Soulstones-Mega" },
    		itemUser: ["Beheeyem-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	sandaconite: {
    		name: "Sandaconite",
    		spritenum: -3,
    		megaStone: { "Sandaconda-Soulstones": "Sandaconda-Soulstones-Mega" },
    		itemUser: ["Sandaconda-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	raichunites: {
    		name: "Raichunite-S",
    		spritenum: -3,
    		megaStone: { "Raichu-Soulstones": "Raichu-Soulstones-Mega" },
    		itemUser: ["Raichu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	cofagrinite: {
    		name: "Cofagrinite",
    		spritenum: -3,
    		megaStone: { "Cofagrigus-Soulstones": "Cofagrigus-Soulstones-Mega" },
    		itemUser: ["Cofagrigus-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	swampertites: {
    		name: "Swampertite-S",
    		spritenum: -3,
    		megaStone: { "Swampert-Soulstones": "Swampert-Soulstones-Mega" },
    		itemUser: ["Swampert-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	gothitellite: {
    		name: "Gothitellite",
    		spritenum: -3,
    		megaStone: { "Gothitelle-Soulstones": "Gothitelle-Soulstones-Mega" },
    		itemUser: ["Gothitelle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	charizardites: {
    		name: "Charizardite-S",
    		spritenum: -3,
    		megaStone: { "Charizard-Soulstones": "Charizard-Soulstones-Mega" },
    		itemUser: ["Charizard-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	wiggnite: {
    		name: "Wiggnite",
    		spritenum: -3,
    		megaStone: { "Wigglytuff-Soulstones": "Wigglytuff-Soulstones-Mega" },
    		itemUser: ["Wigglytuff-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	manectites: {
    		name: "Manectite-S",
    		spritenum: -3,
    		megaStone: { "Manectric-Soulstones": "Manectric-Soulstones-Mega" },
    		itemUser: ["Manectric-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	mamoswinite: {
    		name: "Mamoswinite",
    		spritenum: -3,
    		megaStone: { "Mamoswine-Soulstones": "Mamoswine-Soulstones-Mega" },
    		itemUser: ["Mamoswine-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	torterranite: {
    		name: "Torterranite",
    		spritenum: -3,
    		megaStone: { "Torterra-Soulstones": "Torterra-Soulstones-Mega" },
    		itemUser: ["Torterra-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	lopunnites: {
    		name: "Lopunnite-S",
    		spritenum: -3,
    		megaStone: { "Lopunny-Soulstones": "Lopunny-Soulstones-Mega" },
    		itemUser: ["Lopunny-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tgothitellite: {
    		name: "T.Gothitellite",
    		spritenum: -3,
    		megaStone: { "T.Gothitelle": "T.Gothitelle-Mega" },
    		itemUser: ["T.Gothitelle"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	donphanites: {
    		name: "Donphanite-S",
    		spritenum: -3,
    		megaStone: { "Donphan-Soulstones": "Donphan-Soulstones-Mega" },
    		itemUser: ["Donphan-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	garchompites: {
    		name: "Garchompite-S",
    		spritenum: -3,
    		megaStone: { "Garchomp-Soulstones": "Garchomp-Soulstones-Mega" },
    		itemUser: ["Garchomp-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	ninetalite: {
    		name: "Ninetalite",
    		spritenum: -3,
    		megaStone: { "Ninetales-Soulstones": "Ninetales-Soulstones-Mega" },
    		itemUser: ["Ninetales-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	toxtricite: {
    		name: "Toxtricite",
    		spritenum: -3,
    		megaStone: { "Toxtricity-Soulstones": "Toxtricity-Soulstones-Mega" },
    		itemUser: ["Toxtricity-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tdugtrioite: {
    		name: "T.Dugtrioite",
    		spritenum: -3,
    		megaStone: { "T.Dugtrio": "T.Dugtrio-Mega" },
    		itemUser: ["T.Dugtrio"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	luvdiscite: {
    		name: "Luvdiscite",
    		spritenum: -3,
    		megaStone: { "Luvdisc-Soulstones": "Luvdisc-Soulstones-Mega" },
    		itemUser: ["Luvdisc-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tabsolite: {
    		name: "T.Absolite",
    		spritenum: -3,
    		megaStone: { "T.Absol": "T.Absol-Mega" },
    		itemUser: ["T.Absol"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	abomasites: {
    		name: "Abomasite-S",
    		spritenum: -3,
    		megaStone: { "Abomasnow-Soulstones": "Abomasnow-Soulstones-Mega" },
    		itemUser: ["Abomasnow-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tsablenite: {
    		name: "T.Sablenite",
    		spritenum: -3,
    		megaStone: { "T.Sableye": "T.Sableye-Mega" },
    		itemUser: ["T.Sableye"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	garbodinite: {
    		name: "Garbodinite",
    		spritenum: -3,
    		megaStone: { "Garbodor-Soulstones": "Garbodor-Soulstones-Mega" },
    		itemUser: ["Garbodor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	taltarianite: {
    		name: "T.Altarianite",
    		spritenum: -3,
    		megaStone: { "T.Altaria": "T.Altaria-Mega" },
    		itemUser: ["T.Altaria"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tswampertite: {
    		name: "T.Swampertite",
    		spritenum: -3,
    		megaStone: { "T.Swampert": "T.Swampert-Mega" },
    		itemUser: ["T.Swampert"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tmasquerite: {
    		name: "T.Masquerite",
    		spritenum: -3,
    		megaStone: { "T.Masquerain": "T.Masquerain-Mega" },
    		itemUser: ["T.Masquerain"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	barbaraclite: {
    		name: "Barbaraclite",
    		spritenum: -3,
    		megaStone: { "Barbaracle-Soulstones": "Barbaracle-Soulstones-Mega" },
    		itemUser: ["Barbaracle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	falinkite: {
    		name: "Falinkite",
    		spritenum: -3,
    		megaStone: { "Falinks-Soulstones": "Falinks-Soulstones-Mega" },
    		itemUser: ["Falinks-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	mismagite: {
    		name: "Mismagite",
    		spritenum: -3,
    		megaStone: { "Mismagius-Soulstones": "Mismagius-Soulstones-Mega" },
    		itemUser: ["Mismagius-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	scizorites: {
    		name: "Scizorite-S",
    		spritenum: -3,
    		megaStone: { "Scizor-Soulstones": "Scizor-Soulstones-Mega" },
    		itemUser: ["Scizor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	coalossalite: {
    		name: "Coalossalite",
    		spritenum: -3,
    		megaStone: { "Coalossal-Soulstones": "Coalossal-Soulstones-Mega" },
    		itemUser: ["Coalossal-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tgiganite: {
    		name: "T.Giganite",
    		spritenum: -3,
    		megaStone: { "T.Gigalith": "T.Gigalith-Mega" },
    		itemUser: ["T.Gigalith"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	dragite: {
    		name: "Dragite",
    		spritenum: -3,
    		megaStone: { "Dragonite-Soulstones": "Dragonite-Soulstones-Mega" },
    		itemUser: ["Dragonite-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	dragapultite: {
    		name: "Dragapultite",
    		spritenum: -3,
    		megaStone: { "Dragapult-Soulstones": "Dragapult-Soulstones-Mega" },
    		itemUser: ["Dragapult-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	banettites: {
    		name: "Banettite-S",
    		spritenum: -3,
    		megaStone: { "Banette-Soulstones": "Banette-Soulstones-Mega" },
    		itemUser: ["Banette-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	houndoominites: {
    		name: "Houndoominite-S",
    		spritenum: -3,
    		megaStone: { "Houndoom-Soulstones": "Houndoom-Soulstones-Mega" },
    		itemUser: ["Houndoom-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	empoleonite: {
    		name: "Empoleonite",
    		spritenum: -3,
    		megaStone: { "Empoleon-Soulstones": "Empoleon-Soulstones-Mega" },
    		itemUser: ["Empoleon-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tjumpinite: {
    		name: "T.Jumpinite",
    		spritenum: -3,
    		megaStone: { "T.Jumpluff": "T.Jumpluff-Mega" },
    		itemUser: ["T.Jumpluff"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	exploudinite: {
    		name: "Exploudinite",
    		spritenum: -3,
    		megaStone: { "Exploud-Soulstones": "Exploud-Soulstones-Mega" },
    		itemUser: ["Exploud-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	centiskorite: {
    		name: "Centiskorite",
    		spritenum: -3,
    		megaStone: { "Centiskorch-Soulstones": "Centiskorch-Soulstones-Mega" },
    		itemUser: ["Centiskorch-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	salamencites: {
    		name: "Salamencite-S",
    		spritenum: -3,
    		megaStone: { "Salamence-Soulstones": "Salamence-Soulstones-Mega" },
    		itemUser: ["Salamence-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	grapploctite: {
    		name: "Grapploctite",
    		spritenum: -3,
    		megaStone: { "Grapploct-Soulstones": "Grapploct-Soulstones-Mega" },
    		itemUser: ["Grapploct-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	hatterenite: {
    		name: "Hatterenite",
    		spritenum: -3,
    		megaStone: { "Hatterene-Soulstones": "Hatterene-Soulstones-Mega" },
    		itemUser: ["Hatterene-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	chimechites: {
    		name: "Chimechite-S",
    		spritenum: -3,
    		megaStone: { "Chimecho-Soulstones": "Chimecho-Soulstones-Mega" },
    		itemUser: ["Chimecho-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tgrimmsnarlite: {
    		name: "T.Grimmsnarlite",
    		spritenum: -3,
    		megaStone: { "T.Grimmsnarl": "T.Grimmsnarl-Mega" },
    		itemUser: ["T.Grimmsnarl"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	twyrdeerite: {
    		name: "T.Wyrdeerite",
    		spritenum: -3,
    		megaStone: { "T.Wyrdeer": "T.Wyrdeer-Mega" },
    		itemUser: ["T.Wyrdeer"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	ursalunite: {
    		name: "Ursalunite",
    		spritenum: -3,
    		megaStone: { "Ursaluna-Soulstones": "Ursaluna-Soulstones-Mega" },
    		itemUser: ["Ursaluna-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	emolgite: {
    		name: "Emolgite",
    		spritenum: -3,
    		megaStone: { "Emolga-Soulstones": "Emolga-Soulstones-Mega" },
    		itemUser: ["Emolga-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	vespiquenite: {
    		name: "Vespiquenite",
    		spritenum: -3,
    		megaStone: { "Vespiquen-Soulstones": "Vespiquen-Soulstones-Mega" },
    		itemUser: ["Vespiquen-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	blazikenites: {
    		name: "Blazikenite-S",
    		spritenum: -3,
    		megaStone: { "Blaziken-Soulstones": "Blaziken-Soulstones-Mega" },
    		itemUser: ["Blaziken-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	garganaclite: {
    		name: "Garganaclite",
    		spritenum: -3,
    		megaStone: { "Garganacl-Soulstones": "Garganacl-Soulstones-Mega" },
    		itemUser: ["Garganacl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	wobbnite: {
    		name: "Wobbnite",
    		spritenum: -3,
    		megaStone: { "Wobbuffet-Soulstones": "Wobbuffet-Soulstones-Mega" },
    		itemUser: ["Wobbuffet-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	plusite: {
    		name: "Plusite",
    		spritenum: -3,
    		megaStone: { "Plusle-Soulstones": "Plusle-Soulstones-Mega" },
    		itemUser: ["Plusle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	minunite: {
    		name: "Minunite",
    		spritenum: -3,
    		megaStone: { "Minun-Soulstones": "Minun-Soulstones-Mega" },
    		itemUser: ["Minun-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	blastoisinites: {
    		name: "Blastoisinite-S",
    		spritenum: -3,
    		megaStone: { "Blastoise-Soulstones": "Blastoise-Soulstones-Mega" },
    		itemUser: ["Blastoise-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tcacturnite: {
    		name: "T.Cacturnite",
    		spritenum: -3,
    		megaStone: { "T.Cacturne": "T.Cacturne-Mega" },
    		itemUser: ["T.Cacturne"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tursalunite: {
    		name: "T.Ursalunite",
    		spritenum: -3,
    		megaStone: { "T.Ursaluna": "T.Ursaluna-Mega" },
    		itemUser: ["T.Ursaluna"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	drednite: {
    		name: "Drednite",
    		spritenum: -3,
    		megaStone: { "Drednaw-Soulstones": "Drednaw-Soulstones-Mega" },
    		itemUser: ["Drednaw-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	melmetalite: {
    		name: "Melmetalite",
    		spritenum: -3,
    		megaStone: { "Melmetal-Soulstones": "Melmetal-Soulstones-Mega" },
    		itemUser: ["Melmetal-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	twhimsicottite: {
    		name: "T.Whimsicottite",
    		spritenum: -3,
    		megaStone: { "T.Whimsicott": "T.Whimsicott-Mega" },
    		itemUser: ["T.Whimsicott"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},

	tcharizardite: {
    		name: "T.Charizardite",
    		spritenum: -3,
    		megaStone: { "T.Charizard": "T.Charizard-Mega" },
    		itemUser: ["T.Charizard"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
    	},
};
