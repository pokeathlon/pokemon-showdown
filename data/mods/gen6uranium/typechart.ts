const {Dex} = require('../../../sim/dex');
export const TypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = {
	...Dex.deepClone(require('../gen9uranium/typechart').ModTypeChart),
};
