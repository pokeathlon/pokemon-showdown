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

	if (cur.cosmetics) {
		var cosmeticFormes: string[] = [];
		cur.cosmetics.split(',').forEach((item: string) => (cur.name + '-' + item.trim()));
		entry.cosmeticFormes = cosmeticFormes;
		for (var skin of cosmeticFormes) {
			Dex.data.Aliases[Dex.toID(skin)] = cur.name;
		}
	}

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

for (var i of Dex.species.all()) {
	if (!Pokedex[i.id]) Pokedex[i.id] = {inherit: true};
	const isPoA = i.id in additions;
	Pokedex[i.id].isNonstandard = isPoA ? null : "Unobtainable";
	Pokedex[i.id].num = isPoA ? Pokedex[i.id].num : 0;
	Pokedex[i.id].gen = isPoA ? 6 : undefined;
}
