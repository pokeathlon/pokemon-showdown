import { Utils } from '../../../lib';
import { Pokedex as Chaos } from '../gen9chaos/pokedex';

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Utils.deepClone(Chaos);

for (const i in Pokedex) {
	const mon = i as keyof typeof Pokedex;
	if ('types' in Pokedex[mon] && Pokedex[mon].types?.includes('Nuclear')) {
		Pokedex[mon] = { ...Pokedex[mon], natDexTier: "RU" };
	}
}
