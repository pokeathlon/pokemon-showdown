import { Learnsets as Base } from '../../learnsets';
import { ModdedLearnsetDataTable } from '../../../sim/dex-species';
import { Learnsets as Chaos } from '../gen9chaos/learnsets';

export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = Chaos;

const mods = require('./mods.json');
for (const mod in mods) {
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
				...ModLearnsets[id].learnset[moveid].filter((method) => !Learnsets[id].learnset![moveid].includes(method))
			);
		}
	}
}
