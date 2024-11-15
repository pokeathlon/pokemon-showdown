const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Dex.deepClone(require('../gen9insurgence/moves').ModMoves),
	sheercold: {
		inherit: true,
		ohko: 'Ice',
	},
};
