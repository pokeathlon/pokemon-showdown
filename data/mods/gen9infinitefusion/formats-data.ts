const {Dex} = require('../../../sim/dex');
export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	// NatDex retiers
	blissey: {
		inherit: true,
		natDexTier: "Uber",
	},
	chansey: {
		inherit: true,
		natDexTier: "Uber",
	},
	shuckle: {
		inherit: true,
		natDexTier: "Uber",
	},
	smeargle: {
		inherit: true,
		natDexTier: "Uber",
	},
	regigigas: {
		inherit: true,
		natDexTier: "Uber",
	},
	slaking: {
		inherit: true,
		natDexTier: "Uber",
	},
	kartana: {
		inherit: true,
		natDexTier: "Uber",
	},
	xurkitree: {
		inherit: true,
		natDexTier: "Uber",
	},
	volcarona: {
		inherit: true,
		natDexTier: "Uber",
	},
	alakazam: {
		inherit: true,
		natDexTier: "Uber",
	},
	zamazenta: {
		inherit: true,
		natDexTier: "Uber",
	},
	sneasler: {
		inherit: true,
		natDexTier: "Uber",
	},
	tapulele: {
		inherit: true,
		natDexTier: "Uber",
	},
	tapukoko: {
		inherit: true,
		natDexTier: "Uber",
	},
	annihilape: {
		inherit: true,
		natDexTier: "OU",
	},
	kingambit: {
		inherit: true,
		natDexTier: "OU",
	},
	espathra: {
		inherit: true,
		natDexTier: "OU",
	},
	melmetal: {
		inherit: true,
		natDexTier: "OU",
	},
};

const doublesTiers = {
	"DUber": ["regieleki", "urshifurapidstrike", "urshifu", "fluttermane", "xurkitree", "smeargle", "slaking", "blissey", "blacephalon", "darmanitangalar", "landorus", "latios", "latias", "naganadel", "pheromosa", "regigigas", "spectrier", "tapukoko", "tapulele", "kartana"], // Mythical, Restricted Legendary
	"DOU": ["zapdosgalar", "maushold", "thundurustherian", "tapubulu", "tapufini", "amoonguss", "archaludon", "chienpao", "chiyu", "cresselia", "diancie", "dragonite", "excadrill", "farigiraf", "gholdengo", "glimmora", "gougingfire", "grimmsnarl", "incineroar", "indeedeef", "ironhands", "ironjugulis", "ironmoth", "kingambit", "landorustherian", "nihilego", "ogerponhearthflame", "ogerponwellspring", "pelipper", "ragingbolt", "rillaboom", "sinistcha","stakataka", "torkoal", "tornadus", "tyranitar", "ursaluna", "walkingwake", "whimsicott", "porygon2", "dusclops", "sableye", "arcanine", "arcaninehisui", "armarouge", "baxcalibur", "brutebonnet", "ceruledge", "chandelure", "clefairy", "dragapult", "enamorus", "entei", "garganacl", "gastrodon", "hatterene", "hitmontop", "ironboulder", "ironbundle", "ninetalesalola", "palafin", "porygonz", "thundurus", "ursalunabloodmoon", "heatran", "regieleki", "goodrahisui", "ironvaliant", "lilligant", "lilliganthisui"],
	"DUU": ["bastiodon", "dracovish", "dracozolt", "tinkaton", "moltresgalar", "ironcrown", "gothitelle", "tornadustherian", "pecharunt", "volcanion", "abomasnow", "alcremie", "araquanid", "blastoise", "celesteela", "cobalion", "comfey", "conkeldurr", "empoleon", "feraligatr", "flygon", "galvantula", "garchomp", "gliscor", "golurk", "greattusk", "greninja", "guzzlord", "gyarados", "hariyama", "hitmonlee", "hydrapple", "indeedeem", "kleavor", "kingdra", "meowstic", "metagross", "murkrow", "ogerponcornerstone", "oranguru", "politoed", "ninetales", "rampardos", "raikou", "registeel", "reuniclus", "roaringmoon", "samurotthisui", "slowbro", "slowking", "slowkinggalar", "suicune", "sylveon", "zapdos", "ambipom", "arboliva", "barraskweda", "breloom", "bronzong", "tsareena", "cetitan", "cinderace", "clodsire", "coalossal", "corviknight", "daschbun", "dondozo", "dudunsparce", "eiscue", "enamorustherian", "espathra", "espeon", "falinks", "frosmoth", "gallade", "gardevoir", "gengar", "goodra", "haxorus", "heracross", "hydreigon", "klawf", "klefki", "lokix", "lucario", "ludicolo", "luxray", "lycanroc", "magnezone", "noivern", "orthworm", "screamtail", "sneasler", "talonflame", "tinglu", "wochien", "toxapex", "umbreon", "uxie", "vaporeon", "volcarona", "weavile", "weezing", "weezinggalar", "zoroarkhisui"],
};

for (const i of Dex.species.all()) {
	let finalTier: TierTypes.Other | TierTypes.Doubles | undefined = "(DUU)";
	if ((!i.isNonstandard || i.isNonstandard === "Past" || i.isNonstandard === "Unobtainable") && i.natDexTier !== "Illegal") {
		if (doublesTiers["DUber"].includes(i.id) || i.tags?.includes('Mythical') || i.tags?.includes('Restricted Legendary')) {
			finalTier = "DUber";
		} else if (doublesTiers["DOU"].includes(i.id)) {
			finalTier = "DOU";
		} else if (doublesTiers["DUU"].includes(i.id)) {
			finalTier = "DUU";
		} else if (i.nfe && i.prevo) {
			finalTier = "NFE";
		} else if (i.nfe && !i.prevo) {
			finalTier = "LC";
		}
		if (FormatsData[i.id]) {
			FormatsData[i.id].doublesTier = finalTier;
		} else if (!FormatsData[i.id]) {
			FormatsData[i.id] = {
				inherit: true,
				doublesTier: finalTier,
			};
		}
	}
	if (i.id.includes('arceus')) FormatsData[i.id].natDexTier = "Uber";
}
