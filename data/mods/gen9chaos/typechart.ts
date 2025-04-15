import { Utils } from '../../../lib';
export const ModTypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = {
	cosmic: {
		inherit: true,
		isNonstandard: null,
	},
	crystal: {
		inherit: true,
		isNonstandard: null,
	},
	nuclear: {
		inherit: true,
		isNonstandard: null,
	},
};

export const TypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = Utils.deepClone(ModTypeChart);
