import { Learnsets as Base } from '../../learnsets';
import { Learnsets as Child } from '../gen6uranium/learnsets';

const Additions = require('./learnset-additions.json');

export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {};

for (const key in Child) {
	const id = key as keyof typeof Child;
	if (Learnsets[id] || !Child[id].learnset) continue;

	Learnsets[id] = Base[id] ? {inherit: true, learnset: {...Base[id].learnset}} : {inherit: true, learnset: {}};
	if (!Learnsets[id].learnset) continue;

	for (const movekey in Child[id].learnset) {
		const moveid = movekey as IDEntry;

		if (!Learnsets[id].learnset[moveid]) Learnsets[id].learnset[moveid] = [];
		// @ts-ignore splicing new gen onto a move
		// if M, T or L copy as respective, else as 9M
		Learnsets[id].learnset[moveid].push(...Child[id].learnset[moveid].map(method => ['M', 'T', 'L'].includes(method[1]) ? "9" + method.slice(1) : "9M"));
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
