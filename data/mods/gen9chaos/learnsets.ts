import { Utils } from '../../../lib';
export const ModLearnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {
	eevee: {
		learnset: {
			roost: ["9M"],
			bravebird: ["9M"],
			uturn: ["9M"],
			bugbuzz: ["9M"],
			dracometeor: ["9M"],
			dragonclaw: ["9M"],
			flashcannon: ["9M"],
			ironhead: ["9M"],
			venomswipe: ["9M"],
			sludgebomb: ["9M"],
			bonemerang: ["9M"],
			earthpower: ["9M"],
			headsmash: ["9M"],
			stealthrock: ["9M"],
			brickbreak: ["9M"],
			aurasphere: ["9M"],
			shadowball: ["9M"],
			shadowsneak: ["9M"],
		},
	},
};

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

export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = Utils.deepClone(ModLearnsets);