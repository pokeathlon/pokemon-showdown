const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Dex.deepClone(require('../gen9infinity/moves').ModMoves),
	psychicfangs: {
		inherit: true,
		gen: 6,
	},
};
