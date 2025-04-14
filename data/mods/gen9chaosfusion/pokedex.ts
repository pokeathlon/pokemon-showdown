export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = require('../gen9chaos/pokedex').ModPokedex;

for (const i in Pokedex) {
	const mon = i as keyof typeof Pokedex;
	if (Pokedex[mon].types?.includes('Nuclear')) {
		Pokedex[mon] = {...Pokedex[mon], natDexTier: "RU"};
	}
}
