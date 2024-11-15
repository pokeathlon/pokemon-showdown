const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Dex.deepClone(require('../gen9infinity/moves').ModMoves),
};

for (const i of Dex.moves.all()) {
	if (i.isNonstandard) {
		Moves[i.id] = {inherit: true, isNonstandard: null, gen: 6};
	}
}
