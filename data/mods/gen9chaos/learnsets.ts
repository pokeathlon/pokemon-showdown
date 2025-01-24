const {Dex} = require('../../../sim/dex');

export const ModLearnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {};

for (const mod of ['pokeathlon', 'insurgence', 'uranium', 'infinity']) {
	const changes = require('../gen9' + mod + '/learnsets').ModLearnsets;
	for (const pokemon in changes) {
		if (!changes[pokemon].inherit || !changes[pokemon].learnset) continue;
		if (!(pokemon in ModLearnsets)) ModLearnsets[pokemon as IDEntry] = {inherit: true, learnset: {}}; 
		for (const move in changes[pokemon].learnset) {
			// @ts-ignore
			if (!(move in ModLearnsets[pokemon as IDEntry].learnset)) ModLearnsets[pokemon as IDEntry].learnset[move as IDEntry] = changes[pokemon].learnset[move];
			else {
				for (const method of changes[pokemon].learnset[move]) {
					// @ts-ignore
					if (!ModLearnsets[pokemon as IDEntry].learnset[move as IDEntry].includes(method)) {
						// @ts-ignore
						ModLearnsets[pokemon as IDEntry].learnset[move as IDEntry].push(method);
					}
				}
			}
		}
	}
}

export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = Dex.deepClone(ModLearnsets);