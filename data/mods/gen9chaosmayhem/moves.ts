import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Learnsets } from './learnsets';
import { type MoveData } from '../../../sim/dex-moves';
import { toID } from '../../../sim/dex';
import { Moves as Chaos } from '../gen9chaos/moves';

export const newMoves: { [k: string]: { [k: string]: string } } = {};
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

for (const key in Base) { //makes all vanilla moves exist so it can catch modded versions later
	const id = key as IDEntry;
	Moves[id] = {
		...Utils.deepClone(Base[id]),
		...Utils.deepClone(Manual[id]),
	};
}
for (const mod in mods) {
	newMoves[mod] = {};

	const ModMoves: AnyObject = require('../' + mod + '/moves').Moves;

	for (const key in ModMoves) {
		const id = key as IDEntry;

		if (Manual[id] || (mods[mod]["Moves"]?.includes(id))) continue;

		if (!Moves[id]) Moves[id] = {} as MoveData;
		const move: AnyObject = Moves[id];

		for (const attr in ModMoves[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			// create and change move to mod-move before collision
			if (move[attr] && (ModMoves[id]["shortDesc"] || ModMoves[id]["basePower"] || ModMoves[id]["type"])) {
				const newid = toID(`${id}${modNaming[mod]}`) 
				Moves[newid] = {
					...Utils.deepClone(Base[id]),
					...Utils.deepClone(ModMoves[id]),
					num: 0,
					gen: 9,
				};
				const newMove: AnyObject = Moves[newid];
				newMove.name = `${newMove.name}-${modNaming[mod]}`;
				delete newMove.inherit;
				newMoves[mod][id] = newid;
				break;
			}
			else {
				move[attr] = ModMoves[id][attr];
			}
		}
	}
}
//console.log(newMoves);