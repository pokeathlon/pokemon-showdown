const {Dex} = require('../../../sim/dex');
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen6',
	init() {
		for (const move in Dex.mod('gen9infinity').data.Moves) {
			if (JSON.stringify(Dex.mod('gen9infinity').data.Moves[move]) !== JSON.stringify(this.data.Moves[move])) {
				Dex.mod('gen6infinity').data.Moves[move] = Dex.deepClone(Dex.mod('gen9infinity').data.Moves[move]);
			}
			delete Dex.mod('gen6infinity').data.Moves.isNonstandard;
			Dex.mod('gen6infinity').data.Moves[move].gen = 6;
		}
	}
};
