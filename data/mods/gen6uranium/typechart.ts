import { Utils } from '../../../lib';
import { TypeChart as Base } from '../../typechart';
import { TypeChart as Parent} from '../gen9uranium/typechart';

export const TypeChart: import('../../../sim/dex-data').ModdedTypeDataTable = Utils.deepClone(Parent);
