import { Utils } from '../../../lib';
import { Pokedex as Base } from '../../pokedex';
import { Pokedex as Chaos } from '../gen9chaos/pokedex';
import { Abilities } from '../../abilities';
import { type SpeciesData } from '../../../sim/dex-species';

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Utils.deepClone(Chaos);

const Manual: AnyObject = Utils.deepClone(Pokedex);
const BaseAbilities = Object.values(Abilities).map(ability => ability.name);
const mods = require('./mods.json');
for (const mod in mods) {
	const ModPokedex: AnyObject = require('../' + mod + '/pokedex').Pokedex;

	for (const key in ModPokedex) {
		const id = key as IDEntry;

		if (mods[mod]["Pokedex"]?.includes(id)) continue;

		if (!Pokedex[id]) Pokedex[id] = Base[id] ? { inherit: true } : {} as SpeciesData;

		for (const attr in ModPokedex[id]) {
			const species: AnyObject = Pokedex[id];
			if (['inherit', 'isNonstandard'].includes(attr) || (Manual[id]?.[attr])) continue;
			if (!['evos', 'abilities', 'tier'].includes(attr) && species[attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				if (attr === 'abilities') {
					if (!Base[id]) species.abilities = ModPokedex[id].abilities;
					else {
						species.abilities ||= Utils.deepClone((Base[id] as SpeciesData).abilities);
						Object.keys({ 0: null, 1: null, H: null, S: null }).forEach(
							ability => {
								if (!ModPokedex[id].abilities[ability]) return;
								if (!species.abilities[ability]) {
									species.abilities[ability] = ModPokedex[id].abilities[ability];
								}
								if (!BaseAbilities.includes(ModPokedex[id].abilities[ability])) {
									species.abilities[ability] = ModPokedex[id].abilities[ability];
								}
							}
						);
					}
				} else if (attr === 'evos') {
					if (!species.evos) Pokedex[id] = { ...Pokedex[id], evos: ModPokedex[id].evos };
					else species.evos.push(...ModPokedex[id].evos);
				} else if (attr === 'baseStats') {
					if (!ModPokedex[id].inherit) species[attr] = ModPokedex[id][attr];
				} else {
					species[attr] = ModPokedex[id][attr];
				}
			}
		}
	}
}
