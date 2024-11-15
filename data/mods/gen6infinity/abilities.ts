const {Dex} = require('../../../sim/dex');
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	...Dex.deepClone(require('../gen9infinity/abilities').ModAbilities),
};

for (const i of Dex.abilities.all()) {
	if (i.isNonstandard) {
		Abilities[i.id] = {inherit: true, isNonstandard: null, gen: 6};
	}
}
