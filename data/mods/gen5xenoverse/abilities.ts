const {Dex} = require('../../../sim/dex');
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	...Dex.deepClone(require('../gen9xenoverse/abilities').Abilities),
};
