const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Dex.deepClone(require('../gen9insurgence/moves').Moves),
	sheercold: {
		inherit: true,
		ohko: 'Ice',
	},
};