import { Utils } from '../../../lib';
import { Conditions as Champions } from '../champions/conditions';

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	...Utils.deepClone(Champions),
};
