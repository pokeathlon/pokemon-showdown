import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { Conditions as Parent} from '../gen9insurgence/conditions';

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = Utils.deepClone(Parent);
