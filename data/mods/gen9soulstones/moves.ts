import { Moves as Base } from '../../moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded

	// Additions
	
};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	if (Base[id].isNonstandard && ["Past", "Unobtainable"].includes(Base[id].isNonstandard)) {
		Moves[id] = { inherit: true, isNonstandard: null };
	}
}
