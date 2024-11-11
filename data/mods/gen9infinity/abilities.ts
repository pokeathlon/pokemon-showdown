const {Dex} = require('../../../sim/dex');
export const ModAbilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	purefocus: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Pure Focus",
		shortDesc: "Doubles the user's Special Attack stat.",
		rating: 5,
		num: 0,
	},
};
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Dex.deepClone(ModAbilities);
