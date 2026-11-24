import { Utils } from '../../../lib';
import { Abilities as Champions } from '../champions/abilities';

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Object.fromEntries(
	Object.entries(Champions).map(([id, { isNonstandard, ...entry }]) => [id, Utils.deepClone(entry)])
);
