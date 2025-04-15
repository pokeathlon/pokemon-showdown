const remote = require('../gen9pokeathlon/remote.json');
import { Utils } from '../../../lib';
export let ModPokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {};

for (const i in remote.dex) {
	if (remote.dex[i].gen2 === 1) {
		ModPokedex[i as ID] = {inherit: true, isNonstandard: null};
	}
	else {
		ModPokedex[i as ID] = {inherit: true, isNonstandard: "Unobtainable"};
	}
}

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Utils.deepClone(ModPokedex);