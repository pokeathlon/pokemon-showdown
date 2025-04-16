import { ModdedLearnsetDataTable } from '../../../sim/dex-species';

export const Learnsets: ModdedLearnsetDataTable = {
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

for (const mod in require('./mods.json')) {
	const ModLearnsets = require('../' + mod + '/learnsets').Learnsets as ModdedLearnsetDataTable;
	for (const key in ModLearnsets) {
		const id = key as keyof typeof ModLearnsets;
		if (!ModLearnsets[id].learnset) continue;

		if (!Learnsets[id]) Learnsets[id] = {inherit: true, learnset: {}};
		if (!Learnsets[id].learnset) continue;

		for (const movekey in ModLearnsets[id].learnset) {
			const moveid = movekey as IDEntry;

			if (!Learnsets[id].learnset[moveid]) Learnsets[id].learnset[moveid] = [];
			Learnsets[id].learnset[moveid].push(
				...ModLearnsets[id].learnset[moveid].filter(
					// @ts-ignore learnset is possibly undefined.
					(method) => !Learnsets[id].learnset[moveid].includes(method)
				)
			);
		}

	}
}
