const {Dex} = require('../../../sim/dex');
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen6',
	init() {
		for (const move in Dex.mod('gen9infinity').data.Moves) {
			if (JSON.stringify(Dex.mod('gen9infinity').data.Moves[move]) !== JSON.stringify(this.data.Moves[move])) {
				this.data.Moves[move] = Dex.deepClone(Dex.mod('gen9infinity').data.Moves[move]);
			}
		}
	}
};
