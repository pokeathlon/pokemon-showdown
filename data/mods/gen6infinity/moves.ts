import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Moves as Parent } from '../gen9infinity/moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = Utils.deepClone(Parent);

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	Moves[id] = {...Base[id], gen: 6, isNonstandard: null};
}
