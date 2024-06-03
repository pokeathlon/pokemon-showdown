export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9chaos',
	init() {
		for (var i in this.data.Pokedex) {
			if (this.data.Pokedex[i].types.includes('Nuclear')) {
				this.data.FormatsData[i].natDexTier = "Uber";
			}
		}
	}
};