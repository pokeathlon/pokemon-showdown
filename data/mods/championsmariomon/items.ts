import { Utils } from '../../../lib';
import { Items as Champions } from '../champions/items';

export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Object.fromEntries(
	Object.entries(Champions).map(([id, { isNonstandard, ...entry }]) => [id, Utils.deepClone(entry)])
);
