const {Dex} = require('../../../sim/dex');
export const ModTypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = {
	shadow: {
		inherit: true,
		isNonstandard: null,
	},
};
export const TypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = Dex.deepClone(ModTypeChart);
