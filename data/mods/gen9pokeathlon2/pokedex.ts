const {Dex} = require('../../../sim/dex');
const remote = require('../gen9pokeathlon/remote.json');
export let ModPokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {};

for (const i in remote.dex) {
	if (remote.dex[i].gen2 === 1) {
		ModPokedex[i as ID] = {inherit: true, isNonstandard: null};
	}
	else {
		ModPokedex[i as ID] = {inherit: true, isNonstandard: "Past"};
	}
}

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Dex.deepClone(ModPokedex);