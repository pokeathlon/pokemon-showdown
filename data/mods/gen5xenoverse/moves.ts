const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Dex.deepClone(require('../gen9xenoverse/moves').Moves),
};