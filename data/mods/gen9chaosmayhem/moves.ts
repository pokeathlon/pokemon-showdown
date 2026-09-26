// @ts-nocheck
import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Learnsets } from './learnsets';
import { type ModdedMoveDataTable } from '../../../sim/dex-moves';
import {Dex} from '../../sim/dex';
import { toID } from '../../../sim/dex';

export const newMoves: { [k: string]: string} = {};import { Moves as Chaos } from '../gen9chaos/moves';
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = Chaos;

const modNaming: { [k: string]: string } = {
	"gen9insurgence": "Ins",
	"gen9uranium": "Ura",
	"gen9mariomon": "Mario",
	"gen9infinity": "Inf",
	"gen9infinitefusion": "IF",
	"gen9soulstones": "SS2",
};

const Manual = Utils.deepClone(Moves);
const mods = require('./mods.json');

for (const id in Base) { //makes all vanilla moves exist so it can catch modded versions later
	Moves[id] = {
		...Utils.deepClone(Base[id]),
		...Utils.deepClone(Manual[id]),
	};
}
for (const mod in mods) {
	newMoves[mod] = {};

	const ModMoves = require('../' + mod + '/moves').Moves as ModdedMoveDataTable;

	for (const key in ModMoves) {
		const id = key as keyof typeof ModMoves;

		if (Manual[id] || (mods[mod]["Moves"]?.includes(id))) continue;

		if (!Moves[id]) Moves[id] = {};

		for (const attr in ModMoves[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			// create and change move to mod-move before collision
			if (Moves[id][attr] && (ModMoves[id]["shortDesc"] || ModMoves[id]["basePower"] || ModMoves[id]["type"])) {
				const newid = toID(`${id}${modNaming[mod]}`) 
				Moves[newid] = {
					...Utils.deepClone(Base[id]),
					...Utils.deepClone(ModMoves[id]),
					num: 0,
					gen: 9,
				};
				Moves[newid].name = `${Moves[newid].name}-${modNaming[mod]}`,
				delete Moves[newid].inherit
				newMoves[mod][id] = newid;
				break;
			}
			else {
				Moves[id][attr] = ModMoves[id][attr];
			}
		}
	}
}
//console.log(newMoves);