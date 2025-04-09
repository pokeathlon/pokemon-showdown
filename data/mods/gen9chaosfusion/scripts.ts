export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9chaos',
	init() {
			// Nuclears to RU, nuclear move clause in effect
			for (const i in this.data.Pokedex) {
			if (this.data.Pokedex[i].types.includes("Nuclear") && !(i in require('./formats-data').ModFormatsData && !(i in require('../gen9chaos/formats-data').ModFormatsData))) {
				this.modData('Pokedex', i).natDexTier = "RU";
			}
		}
	},
};
