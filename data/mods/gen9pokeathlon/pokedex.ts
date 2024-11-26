const {Dex} = require('../../../sim/dex');
const remote = require('./remote.json');
import {ModdedSpeciesDataTable, ModdedSpeciesData} from '../../../sim/dex-species';

export const ModPokedex: ModdedSpeciesDataTable = {
	magmortar: {
		inherit: true,
		abilities: {0: "Flame Body", 1: "Cannoneer", H: "Vital Spirit"},
	},
	remoraid: {
		inherit: true,
		abilities: {0: "Hustle", 1: "Sniper", H: "Moody", S: "Cannoneer"},
	},
	octillery: {
		inherit: true,
		abilities: {0: "Suction Cups", 1: "Sniper", H: "Moody", S: "Cannoneer"},
	},
	rhyperior: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Solid Rock", H: "Reckless", S: "Cannoneer"},
	},
	toucannon: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Skill Link", H: "Sheer Force", S: "Cannoneer"},
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

function findSpecies(name: string) {
	for (const mod of ["gen9insurgence", "gen9uranium"]) {
		const result = Dex.mod(mod).species.get(name);
		if (result.exists) return result;
	}
	return {};
}

const additions = Object.keys(remote.dex);
additions.sort();

let ctr = 3001;
for (const mon of additions) {
	const cur = remote.dex[mon];

	let baseSpecies = cur.name.split('-').slice(0, -1).join('-');
	const forme = cur.name.split('-').slice(-1).join('');
	baseSpecies = Dex.toID(baseSpecies) in ModPokedex ? ModPokedex[Dex.toID(baseSpecies)] : findSpecies(baseSpecies);

	const types = [];
	for (const mtype of cur["types"]) if (mtype) types.push(mtype);

	const entry: AnyObject = {
		num: 0,
		name: cur["name"],
		types: types,
		baseStats: cur["baseStats"],
		abilities: cur["abilities"],
		heightm: parseFloat(cur["heightm"]),
		weightkg: parseFloat(cur["weightkg"]),
		tags: ["Pokeathlon"],
		eggGroups: ["Pokeathlon", "POA"],
		tier: cur["tier"],
		natDexTier: cur["natDexTier"],
		doublesTier: cur["doublesTier"],
	};

	if (baseSpecies.name && (!cur.formeinfo || (cur.formeinfo && Dex.toID(cur.formeinfo) !== 'separate'))) {
		entry.num = baseSpecies.num;
		entry.baseSpecies = baseSpecies.name;
		entry.forme = forme;
		if (!Dex.species.get(baseSpecies.name).exists && !(Dex.toID(baseSpecies.name) in ModPokedex)) {
			ModPokedex[Dex.toID(baseSpecies.name)] = {...findSpecies(Dex.toID(baseSpecies.name)), isNonstandard: "Unobtainable"};
		}
	} else {
		entry.num = ctr;
		ctr++;
	}

	if (cur.formeinfo) {
		if (Dex.toID(cur.formeinfo) === 'battleonly') {
			entry.battleOnly = baseSpecies.name;
		} else if (Dex.toID(cur.formeinfo) !== 'separate') {
			entry.requiredItem = cur.formeinfo;
		}
	}

	if (cur.cosmetics) {
		const cosmeticFormes: string[] = [];
		cur.cosmetics.split(',').forEach((item: string) => cosmeticFormes.push(cur.name + '-' + item.trim()));
		entry.cosmeticFormes = cosmeticFormes;
		for (const skin of cosmeticFormes) {
			Dex.data.Aliases[Dex.toID(skin)] = cur.name;
		}
	}

	if (cur.prevo) {
		entry.prevo = cur.prevo;
		const prevo = findSpecies(cur.prevo);
		if (!(Dex.toID(prevo.id) in remote.dex) && !(Dex.toID(cur.prevo) in remote.dex)) {
			ModPokedex[Dex.toID(cur.prevo)] = {
				inherit: true,
				evos: [cur.name],
				natDexTier: prevo.prevo ? "NFE" : "LC",
				doublesTier: prevo.prevo ? "NFE" : "LC",
			};
		}
	}

	const evos = additions.filter((addition) => (remote.dex[addition].prevo && remote.dex[addition].prevo === cur.name));
	if (evos.length) {
		entry.evos = [];
		for (const evo of evos) {
			entry.evos.push(remote.dex[evo].name);
		}
	}

	ModPokedex[Dex.toID(mon)] = entry as ModdedSpeciesData;
}

for (const i of Dex.species.all()) {
	if (!ModPokedex[i.id]) ModPokedex[i.id] = {inherit: true};
	const isPoA = i.id in additions;
	ModPokedex[i.id].isNonstandard = isPoA ? null : "Unobtainable";
	ModPokedex[i.id].gen = isPoA ? 6 : undefined;
}

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Dex.deepClone(ModPokedex);

for (const formatname in remote.banlists) {
	const cur = remote.banlists[formatname];
	const format = Dex.formats.get(formatname);
	if (cur.pokemon) {
		for (const pokeban of cur.pokemon.split(',')) {
			if (Dex.mod('gen9chaos').species.get(pokeban)) {
				format.banlist.push('pokemon:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.abilities) {
		for (const pokeban of cur.abilities.split(',')) {
			if (Dex.mod('gen9chaos').abilities.get(pokeban)) {
				format.banlist.push('ability:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.moves) {
		for (const pokeban of cur.moves.split(',')) {
			if (Dex.mod('gen9chaos').moves.get(pokeban)) {
				format.banlist.push('move:' + Dex.toID(pokeban));
			}
		}
	}
	if (cur.items) {
		for (const pokeban of cur.items.split(',')) {
			if (Dex.mod('gen9chaos').items.get(pokeban)) {
				format.banlist.push('item:' + Dex.toID(pokeban));
			}
		}
	}
}
