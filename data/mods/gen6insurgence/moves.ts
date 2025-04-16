import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Moves as Parent} from '../gen9insurgence/moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Utils.deepClone(Parent),
	sheercold: {
		inherit: true,
		ohko: 'Ice',
	},
};
