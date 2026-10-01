// @ts-nocheck
import { Utils } from '../../../lib';
import { Pokedex as Base } from '../../pokedex';
import { Pokedex as Chaos } from '../gen9chaos/pokedex';
import { Abilities } from '../../abilities';
import { type ModdedSpeciesDataTable } from '../../../sim/dex-species';

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Chaos;

const Manual = Utils.deepClone(Pokedex);
const BaseAbilities = Object.keys(Abilities).map(ability => Abilities[ability].name);
const mods = require('./mods.json');
for (const mod in mods) {
	const ModPokedex = require('../' + mod + '/pokedex').Pokedex as ModdedSpeciesDataTable;

	for (const key in ModPokedex) {
		const id = key as keyof typeof ModPokedex;

		if (mods[mod]["Pokedex"]?.includes(id)) continue;

		if (!Pokedex[id]) Pokedex[id] = Base[id] ? { inherit: true } : {};

		for (const attr in ModPokedex[id]) {
			if (['inherit', 'isNonstandard'].includes(attr) || (Manual[id]?.[attr])) continue;
			if (!['evos', 'abilities', 'tier'].includes(attr) && Pokedex[id][attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				if (attr === 'abilities') {
					if (!Base[id]) Pokedex[id].abilities = ModPokedex[id].abilities;
					else {
						Pokedex[id].abilities = Base[id].abilities;
						Object.keys({ 0: null, 1: null, H: null, S: null }).forEach(
							ability => {
								if (!ModPokedex[id].abilities[ability]) return;
								if (!Pokedex[id].abilities[ability]) {
									Pokedex[id].abilities[ability] = ModPokedex[id].abilities[ability];
								}
								if (!BaseAbilities.includes(ModPokedex[id].abilities[ability])) {
									Pokedex[id].abilities[ability] = ModPokedex[id].abilities[ability];
								}
							}
						);
					}
				} else if (attr === 'evos') {
					if (!Pokedex[id].evos) Pokedex[id] = { ...Pokedex[id], evos: ModPokedex[id].evos };
					else Pokedex[id].evos.push(...ModPokedex[id].evos);
				} else if (attr === 'baseStats') {
					if (!ModPokedex[id].inherit) Pokedex[id][attr] = ModPokedex[id][attr];
				} else {
					Pokedex[id][attr] = ModPokedex[id][attr];
				}
			}
		}
	}
}
