import { Learnsets as Base } from '../../learnsets';
import { Learnsets as Child } from '../gen6uranium/learnsets';

const Additions = require('./learnset-additions.json');

export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {};

for (const key in Child) {
	const id = key as keyof typeof Child;
	if (Learnsets[id] || !Child[id].learnset) continue;

	if (!Base[id]) { Learnsets[id] = Child[id]; continue; }

	Learnsets[id] = {inherit: true, learnset: {...Base[id].learnset}};
	if (!Learnsets[id].learnset) continue;

	for (const movekey in Child[id].learnset) {
		const moveid = movekey as IDEntry;

		if (!Learnsets[id].learnset[moveid]) Learnsets[id].learnset[moveid] = [];
		Learnsets[id].learnset[moveid].push(...Child[id].learnset[moveid]);
	}
}

for (const key in Additions) {
	const id = key as keyof typeof Learnsets;
	if (!Learnsets[id] || !Learnsets[id].learnset) continue;

	for (const movekey of Additions[id]) {
		const moveid = movekey as IDEntry;
		
		if (!Learnsets[id].learnset[moveid]) Learnsets[id].learnset[moveid] = [];
		Learnsets[id].learnset[moveid].push('9M');
	}
}
