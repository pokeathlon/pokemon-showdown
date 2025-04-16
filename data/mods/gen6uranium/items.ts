import { Utils } from '../../../lib';
import { Items as Base } from '../../items';
import { Items as Parent} from '../gen9uranium/items';

export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Utils.deepClone(Parent);
