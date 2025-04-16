import { Pokedex as Chaos } from '../gen9chaos/pokedex';

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Chaos;

for (const i in Pokedex) {
	const mon = i as keyof typeof Pokedex;
	if (Pokedex[mon].types?.includes('Nuclear')) {
		Pokedex[mon] = {...Pokedex[mon], natDexTier: "RU"};
	}
}
