const {Dex} = require('../../../sim/dex');
const remote = require('./remote.json');
import {ModdedSpeciesDataTable, ModdedSpeciesData} from '../../../sim/dex-species';

export const Pokedex: ModdedSpeciesDataTable = {
	// Modded
	starmie: {
		inherit: true,
		evoLevel: 45,
		evos: ["Staruhz"],
		tier: "NFE",
		natDexTier: "NFE",
		doublesTier: "NFE",
	},
	spinda: {
		inherit: true,
		evoLevel: 45,
		evos: ["Pandiz"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	purugly: {
		inherit: true,
		evoLevel: 45,
		evos: ["Growlsome"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	solrock: {
		inherit: true,
		evoLevel: 45,
		evos: ["Penumbralith"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	lunatone: {
		inherit: true,
		evoLevel: 45,
		evos: ["Penumbralith"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	kecleon: {
		inherit: true,
		evoLevel: 45,
		evos: ["Kaleidleon"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	parasect: {
		inherit: true,
		evoLevel: 45,
		evos: ["Parashukado"],
		tier: "NFE",
		natDexTier: "NFE",
		doublesTier: "NFE",
	},
	sandslash: {
		inherit: true,
		evoLevel: 45,
		evos: ["Scaleslash"],
		tier: "NFE",
		natDexTier: "NFE",
		doublesTier: "NFE",
	},
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

const additions = Object.keys(remote.dex);
additions.sort();

var ctr = 3001;
for (var mon of additions) {
	console.log(mon);
	const cur = remote.dex[mon];

	const baseSpecies = Dex.toID(cur.name.split('-').slice(0, -1).join('-')) in Pokedex ? Pokedex[Dex.toID(cur.name.split('-').slice(0, -1).join('-'))] : Dex.mod('gen9chaos').species.get(cur.name.split('-').slice(0, -1).join('-'));
	const forme = cur.name.split('-').slice(-1).join('');

	var types = [];
	for (var mtype of cur["types"]) if (mtype) types.push(mtype);

	var entry: AnyObject = {
		num: 0,
		name: cur["name"],
		types: types,
		baseStats: cur["baseStats"],
		abilities: cur["abilities"],
		heightm: parseFloat(cur["heightm"]),
		weightkg: parseFloat(cur["weightkg"]),
		tags: ["Pokeathlon"],
		eggGroups: ["Undiscovered"],
		tier: cur["tier"],
		natDexTier: cur["natDexTier"],
		doublesTier: cur["doublesTier"],
	};

	if (baseSpecies.name && forme !== 'Delta') {
		entry.num = baseSpecies.num;
		entry.baseSpecies = baseSpecies.name;
		entry.forme = forme;
		if (!Dex.species.get(baseSpecies.name).exists && !(Dex.toID(baseSpecies.name) in Pokedex)) {
			Pokedex[Dex.toID(baseSpecies.name)] = Dex.mod('gen9chaos').data.Pokedex[Dex.toID(baseSpecies.name)];
		}
	} else {
		entry.num = ctr;
		ctr++;
	}

	if (cur.megastone) entry.requiredItem = cur.megastone;

	Pokedex[Dex.toID(mon)] = entry as ModdedSpeciesData;
}

for (var formatname in remote.banlists) {
	const cur = remote.banlists[formatname];
	const format = Dex.formats.get(formatname);
	if (cur.pokemon) {
		for (var pokeban of cur.pokemon.split(',')) {
			if (Dex.mod('gen9chaos').species.get(pokeban)) {
				format.banlist.push('pokemon:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.abilities) {
		for (var pokeban of cur.abilities.split(',')) {
			if (Dex.mod('gen9chaos').abilities.get(pokeban)) {
				format.banlist.push('ability:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.moves) {
		for (var pokeban of cur.moves.split(',')) {
			if (Dex.mod('gen9chaos').moves.get(pokeban)) {
				format.banlist.push('move:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.items) {
		for (var pokeban of cur.items.split(',')) {
			if (Dex.mod('gen9chaos').items.get(pokeban)) {
				format.banlist.push('item:' + Dex.toID(pokeban));
			}
		}
	}
}

// Regional Dex Data
const PoADex: {[k: string]: number} = {
	"soulply": 3001,
	"imitotion": 3002,
	"aviotion": 3003,
	"dracotion": 3004,
	"bunnor": 3005,
	"rabbicicle": 3006,
	"enchantobra": 3007,
	"eyespy": 3008,
	"icyall": 3009,
	"ironeverlasting": 3010,
	"squice": 3011,
	"toxice": 3012,
	"golisopodshogun": 768,
	"tinkatonrhinian": 959,
	"regimyo": 3013,
	"jovianshk": 3014,
	"lunachi": 3015,
	"ockthane": 3016,
	"porygon2rhinian": 3017,
	"porygonzrhinian": 3018,
	"incineroarolul": 727,
	"raikousupra": 243,
	"enteisupra": 244,
	"suicunesupra": 245,
	"heatransupra": 485,
	"mosster": 3019,
	"barrimander": 3020,
	"staruhz": 3021,
	"wrighvern": 3022,
	"meditao": 3023,
	"electrodemega": 101,
	"florgesmega": 671,
	"pandiz": 3024,
	"bewitwing": 3025,
	"eidolburgh": 3026,
	"snorlaxfrost": 143,
	"snorlaxfrostmega": 143,
	"heracrosssubarctic": 214,
	"premotee": 3027,
	"sirentom": 3028,
	"braskeptic": 3029,
	"maggony": 3030,
	"sweepdol": 3031,
	"paldemaria": 3032,
	"monetoad": 3033,
	"drifloonkitakami": 425,
	"drifbozu": 3034,
	"voliable": 3035,
	"nestitan": 3036,
	"loxicant": 3037,
	"manacra": 3038,
	"manacraplated": 3038,
	"feidan": 3039,
	"niandertroll": 3040,
	"scorchingkiln": 3041,
	"berserkergene": 3042,
	"scalyterror": 3043,
	"pestri": 3044,
	"sinistersickle": 3045,
	"larvitardelta": 246,
	"pupitardelta": 247,
	"tyranitardelta": 248,
	"blazikendeltamega": 257,
	"sceptiledeltamega": 254,
	"felapstan": 3046,
	"tinkastab": 3047,
	"tinkaslice": 3048,
	"tinkashank": 3049,
	"grandmirage": 3050,
	"magnegauss": 3051,
	"dangonna": 3052,
	"mochimechi": 3053,
	"carcharus": 3054,
	"rotomhisui": 3055,
	"rotomhisuiarmored": 3055,
	"harportia": 3056,
	"cetitanhisui": 3057,
	"suenami": 3058,
	"sekrilon": 3059,
	"sekrilonmega": 3059,
	"penumbralith": 3060,
	"growlsome": 3061,
	"primarinaolul": 3062,
	"decidueyeolul": 3063,
	"kaleidleon": 3064,
	"parashukado": 3065,
	"scaleslash": 3066,
	"dracat": 3067,
	"catzelwyrm": 3068,
	"hydroupa": 3069,
	"chronobour": 3070,
	"gilotherma": 3071,
	"tyranisacer": 3072,
	"mephistoxin": 3073,
	"mjochiin": 3074,
	"gelazura": 3075,
	"slowpokerhinian": 3076,
	"slowbrorhinian": 3077,
	"slowkingrhinian": 3078,
	"trickin": 3079,
	"treatern": 3080,
	"kleavordelta": 3081,
	"miasmiss": 3082,
	"guarig": 3083,
	"tofagrif": 3084,
	"crayzigater": 3085
};

for (var i of Dex.species.all()) {
	if (!Pokedex[i.id]) Pokedex[i.id] = {inherit: true};
	const isPoA = i.id in PoADex;
	Pokedex[i.id].isNonstandard = isPoA ? null : "Unobtainable";
	Pokedex[i.id].num = isPoA ? PoADex[i.id] : 0;
	Pokedex[i.id].gen = isPoA ? 6 : undefined;
}
