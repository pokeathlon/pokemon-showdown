import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { Abilities as Parent} from '../gen9infinity/abilities';

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Utils.deepClone(Parent);

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Base[id].isNonstandard || (Base[id].gen && Base[id].gen > 6)) {
		Abilities[id] = {inherit: true, isNonstandard: null, gen: 6};
	}
}
