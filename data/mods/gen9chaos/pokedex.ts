// @ts-nocheck
import { Utils } from '../../../lib';
import { Pokedex as Base } from '../../pokedex';
import { ModdedSpeciesDataTable } from '../../../sim/dex-species';

export const Pokedex: ModdedSpeciesDataTable = {
	darkrai: {
		inherit: true,
		abilities: {0: "Bad Dreams", 1: "White Smoke", H: "Absolution"},
	},
};

const Manual = Utils.deepClone(Pokedex);
for (const mod in require('./mods.json')) {
	const ModPokedex = require('../' + mod + '/pokedex').Pokedex as ModdedSpeciesDataTable;

	for (const key in ModPokedex) {
		const id = key as keyof typeof ModPokedex;

		if (!Pokedex[id]) Pokedex[id] = Base[id] ? {inherit: true} : {};
		
		for (const attr in ModPokedex[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen', 'baseStats'].includes(attr)) continue;
			if (!['evos'].includes(attr) && Pokedex[id][attr] && (!Manual[id] || !Manual[id][attr])) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				if (attr === 'abilities') {
					if (
						!Base[id] ||
						Object.keys(Base[id].abilities).every(
							(ability) => Base[id].abilities[ability] === ModPokedex[id].abilities[ability]
						)
					) Pokedex[id].abilities = ModPokedex[id].abilities;
				} else if (attr === 'evos') {
					if (!Pokedex[id].evos) Pokedex[id] = {...Pokedex[id], evos: ModPokedex[id].evos};
					else Pokedex[id].evos.push(...ModPokedex[id].evos);
				} else {
					Pokedex[id][attr] = ModPokedex[id][attr];
				}
			}
		}
	}
}
