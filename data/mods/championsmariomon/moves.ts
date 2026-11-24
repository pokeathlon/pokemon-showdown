import { Utils } from '../../../lib';
import { Moves as Champions } from '../champions/moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = Object.fromEntries(
	Object.entries(Champions).map(([id, { isNonstandard, ...entry }]) => [id, Utils.deepClone(entry)])
);
