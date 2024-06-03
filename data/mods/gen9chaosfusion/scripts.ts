export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9chaos',
	init() {
		for (var i in this.data.Pokedex) {
			if (this.data.Pokedex[i].types.includes('Nuclear')) {
				if (this.data.FormatsData[i]) this.data.FormatsData[i].natDexTier = "Uber";
				else this.data.FormatsData[i] = {tier: "Uber", natDexTier: "Uber"};
			}
		}
	}
};